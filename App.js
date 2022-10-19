import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SinglePlayerMode from "./src/SinglePlayerMode";
import { createBoard, createBoardItems } from "./src/helpers/boardItems";
export default function App() {
  let board = createBoard();
  let boardItems = createBoardItems();

  return (
    <View style={styles.container}>
      <SinglePlayerMode board={board} boardItems={boardItems} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
