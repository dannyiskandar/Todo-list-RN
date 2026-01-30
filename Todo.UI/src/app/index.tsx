import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import TodoScreen from "../features/todo-plan/ui/screens/TodoScreen";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 0 : undefined,
      }}
    >
      <TodoScreen />
    </SafeAreaView>
  );
}
