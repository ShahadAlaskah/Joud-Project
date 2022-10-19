import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { adjacentRoom } from "./helpers/boardItems";
import { db } from "../firebase/fierbase-config";
import Item from "./component/Item";
import QuestionModal from "./component/QuestionModal";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const questionList = [
  {
    question:
      "أي مما يلي يُعد من العوامل المساعدة في الحصول على الاعتمادات للجامعة؟ ",
    type: "إختيار من متعدد",
    point: 5,
    choices: [
      "جميع ما سبق ",
      "برامج تعليمية مواكبة لسوق العمل ",
      "كفاءة أعضاء هيئة التدريس ",
      "جودة المخرجات التعليمية ",
    ],
    level: 2,
    correctAnswer: 3,
  },
];

const SinglePlayerMode = ({ board, boardItems }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentRoomNumber, setCurrentRoomNumber] = useState(0);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState(null);
  const [numberOfTape, setNumberOfTape] = useState(3);

  const displayQuestion = (selectedRoomNumber) => {
    //Set selected room number
    setSelectedId(selectedRoomNumber);
    if (adjacentRoom(currentRoomNumber, selectedRoomNumber)) {
      //Clear selected choices
      setSelectedChoices(null);
      //Show question modal
      setQuestionModalVisible(true);
    }
  };

  const move = () => {
    if (selectedChoices === questionList[0].correctAnswer) {
      //Move JOUD to the next room
      setCurrentRoomNumber(selectedId);
      //Open room
      board[selectedId].roomItem = boardItems[selectedId].roomItem;
    } else {
      //Deduct number of tape
      setNumberOfTape((currentNumberOfTape) => currentNumberOfTape - 1);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.roomNumber === currentRoomNumber ? "#6e3b6e" : "#f9c2ff";
    const color = item.roomNumber === currentRoomNumber ? "white" : "black";
    const roomItem =
      item.roomNumber === currentRoomNumber
        ? `JOUD ${board[item.roomNumber].roomItem}`
        : board[item.roomNumber].roomItem;

    return (
      <Item
        item={{ roomNumber: item.roomNumber, roomItem: roomItem }}
        onPress={() => displayQuestion(item.roomNumber)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        disabled={!adjacentRoom(currentRoomNumber, item.roomNumber)}
      />
    );
  };

  useEffect(() => {
    if (selectedChoices !== null) {
      move();
    }
  }, [selectedChoices]);

  return (
    <>
      <Text style={{ position: "absolute", top: 80 }}>{numberOfTape}</Text>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListContainer}
          data={board}
          renderItem={renderItem}
          keyExtractor={(item) => item.roomNumber}
          extraData={selectedId}
          horizontal={false}
          numColumns={6}
        />
        <QuestionModal
          questionModalVisible={questionModalVisible}
          setQuestionModalVisible={setQuestionModalVisible}
          question={questionList[0]}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    flex: 1,
    marginTop: "50%",
  },
});

export default SinglePlayerMode;
