import {Control, FieldValues, Path, RegisterOptions} from 'react-hook-form';

export interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  placeholder: string;
  secureTextEntry?: boolean;
}
