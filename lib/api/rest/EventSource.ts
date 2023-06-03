export interface ErrorEvent {
  type: 'error';
  message: string;
  xhrState: number;
  xhrStatus: number;
}

export interface MessageEvent {
  type: 'message';
  data: string | null;
  lastEventId: string | null;
  url: string;
}

export interface OpenEvent {
  type: 'open';
}

export interface CloseEvent {
  type: 'close';
}

export interface TimeoutEvent {
  type: 'timeout';
}

export interface ExceptionEvent {
  type: 'exception';
  message: string;
  error: Error;
}

export interface EventSourceOptions {
  method?: string;
  timeout?: number;
  headers?: Record<string, any>;
  body?: any;
  debug?: boolean;
  pollingInterval?: number;
}

export type EventType = 'open' | 'message' | 'error' | 'close';

export type EventSourceEvent =
  | MessageEvent
  | OpenEvent
  | CloseEvent
  | TimeoutEvent
  | ErrorEvent
  | ExceptionEvent;

export type EventSourceListener<E extends string = never> = (
  event: EventSourceEvent,
) => void;

class EventSource {
  ERROR = -1;
  CONNECTING = 0;
  OPEN = 1;
  CLOSED = 2;

  private interval: number;
  private lastEventId: null | string = null;
  private lastIndexProcessed = 0;
  private eventType: EventType | undefined = undefined;
  private status = this.CONNECTING;
  private eventHandlers: Record<string, any[]> = {
    open: [],
    message: [],
    error: [],
    close: [],
  };

  private _xhr: XMLHttpRequest | null = null;
  private _pollTimer: any | null = null;
  private readonly url: string;
  method: string;
  timeout: number;
  headers: Record<string, any>;
  body: any;
  debug: boolean;
  pollingInterval?: number;

  constructor(url: URL | string, options: EventSourceOptions = {}) {
    this.interval = options.pollingInterval || 5000;

    this.method = options.method || 'GET';
    this.timeout = options.timeout || 0;
    this.headers = options.headers || {};
    this.body = options.body || undefined;
    this.debug = options.debug || false;

    if (
      !url ||
      (typeof url !== 'string' && typeof url.toString !== 'function')
    ) {
      throw new SyntaxError('[EventSource] Invalid URL argument.');
    }

    if (typeof url === 'string') {
      this.url = url;
    } else {
      this.url = url.toString();
    }

    this._pollAgain(500);
  }

  _pollAgain(time: number) {
    this._pollTimer = setTimeout(() => {
      this.open();
    }, time);
  }

  open() {
    try {
      this.lastIndexProcessed = 0;
      this.status = this.CONNECTING;

      this._xhr = new XMLHttpRequest();
      this._xhr.onprogress = () => {
        //Get new part of response
        var responseText = this._xhr?.response;
        console.log('text _>>>>>>>>>>>>>>>>>', responseText);
      };
      this._xhr.open(this.method, this.url, true);

      if (this.headers) {
        for (const [key, value] of Object.entries(this.headers)) {
          this._xhr.setRequestHeader(key, value);
        }
      }

      this._xhr.setRequestHeader('Accept', 'text/event-stream');
      this._xhr.setRequestHeader('Cache-Control', 'no-cache');
      this._xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      if (this.lastEventId !== null) {
        this._xhr.setRequestHeader('Last-Event-ID', this.lastEventId);
      }

      this._xhr.timeout = this.timeout;

      this._xhr.onreadystatechange = () => {
        const xhr = this._xhr;
        if (!xhr) {
          console.log('XHR is null');
          return;
        }
        if (this.debug) {
          console.debug(
            `[EventSource][onreadystatechange] ReadyState: ${xhr.readyState}, status: ${xhr.status}`,
          );
        }

        if (
          ![XMLHttpRequest.DONE, XMLHttpRequest.LOADING].includes(
            xhr.readyState,
          )
        ) {
          return;
        }

        if (xhr.status >= 200 && xhr.status < 400) {
          if (this.status === this.CONNECTING) {
            this.status = this.OPEN;
            this.dispatch('open', {type: 'open'});
          }
          console.log('xhr.responseText', xhr.responseText);
          this._handleEvent(xhr.responseText || '');

          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (this.debug) {
              console.debug(
                '[EventSource][onreadystatechange][DONE] Operation done. Reconnecting...',
              );
            }
            // this._pollAgain(this.interval);
          }
        } else if (this.status !== this.CLOSED) {
          if (!this._xhr) {
            console.log('XHR is null');
            return;
          }
          if (this._xhr.status !== 0) {
            this.dispatch('error', {
              type: 'error',
              message: xhr.responseText,
              xhrStatus: xhr.status,
              xhrState: xhr.readyState,
            });
          }

          if ([XMLHttpRequest.UNSENT].includes(xhr.readyState)) {
            if (this.debug) {
              console.debug(
                '[EventSource][onreadystatechange][ERROR] Response status error. Reconnecting...',
              );
            }

            this._pollAgain(this.interval);
          }
        }
      };

      this._xhr.onerror = e => {
        this.status === this.ERROR;
        if (!this._xhr) {
          console.log('XHR is null');
          return;
        }
        this.dispatch('error', {
          type: 'error',
          message: this._xhr.responseText,
          xhrStatus: this._xhr.status,
          xhrState: this._xhr.readyState,
        });
      };

      if (this.body) {
        this._xhr.send(this.body);
      } else {
        this._xhr.send();
      }

      if (this.timeout > 0) {
        setTimeout(() => {
          if (!this._xhr) {
            console.log('XHR is null');
            return;
          }
          if (this._xhr.readyState === XMLHttpRequest.LOADING) {
            this.dispatch('error', {
              type: 'timeout',
            });

            this.close();
          }
        }, this.timeout);
      }
    } catch (e) {
      this.status = this.ERROR;
      this.dispatch('error', {
        type: 'exception',
        message: (e as Error).message,
        error: e as Error,
      });
    }
  }

  _handleEvent(response: string) {
    const parts = response.substr(this.lastIndexProcessed).split('\n');
    this.lastIndexProcessed = response.lastIndexOf('\n\n') + 2;
    let data = [];
    let retry = 0;
    let line = '';

    for (let i = 0; i < parts.length; i++) {
      line = parts[i].replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
      if (line.indexOf('event') === 0) {
        this.eventType = line.replace(/event:?\s*/, '') as EventType;
      } else if (line.indexOf('retry') === 0) {
        retry = parseInt(line.replace(/retry:?\s*/, ''), 10);
        if (!isNaN(retry)) {
          this.interval = retry;
        }
      } else if (line.indexOf('data') === 0) {
        data.push(line.replace(/data:?\s*/, ''));
      } else if (line.indexOf('id:') === 0) {
        this.lastEventId = line.replace(/id:?\s*/, '');
      } else if (line.indexOf('id') === 0) {
        this.lastEventId = null;
      } else if (line === '') {
        if (data.length > 0) {
          const eventType = this.eventType || 'message';

          const event = {
            type: eventType,
            data: data.join('\n'),
            url: this.url,
            lastEventId: this.lastEventId,
          };
          // @ts-ignore
          this.dispatch(eventType, event);

          data = [];
          this.eventType = undefined;
        }
      }
    }
  }

  addEventListener(type: EventType, listener: EventSourceListener) {
    if (this.eventHandlers[type] === undefined) {
      this.eventHandlers[type] = [];
    }

    this.eventHandlers[type].push(listener);
  }

  removeEventListener(type: EventType, listener: EventSourceListener) {
    if (this.eventHandlers[type] !== undefined) {
      this.eventHandlers[type] = this.eventHandlers[type].filter(
        handler => handler !== listener,
      );
    }
  }

  removeAllEventListeners(type?: EventType) {
    const availableTypes = Object.keys(this.eventHandlers);

    if (type === undefined) {
      for (const eventType of availableTypes) {
        this.eventHandlers[eventType] = [];
      }
    } else {
      if (!availableTypes.includes(type)) {
        throw Error(
          `[EventSource] '${type}' type is not supported event type.`,
        );
      }

      this.eventHandlers[type] = [];
    }
  }

  dispatch(type: EventType, data: EventSourceEvent) {
    const availableTypes = Object.keys(this.eventHandlers);

    if (!availableTypes.includes(type)) {
      return;
    }

    for (const handler of Object.values(this.eventHandlers[type])) {
      handler(data);
    }
  }

  close() {
    this.status = this.CLOSED;
    clearTimeout(this._pollTimer);
    if (this._xhr) {
      this._xhr.abort();
    }

    this.dispatch('close', {type: 'close'});
  }
}

export default EventSource;
