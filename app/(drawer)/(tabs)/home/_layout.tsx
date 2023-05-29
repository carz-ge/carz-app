import {Stack} from "expo-router";


export default function Layout() {
  return <Stack >
    <Stack.Screen name={"index"} options={{headerTitle: "მთავარი", headerShown: false}} />
  </Stack>
}
