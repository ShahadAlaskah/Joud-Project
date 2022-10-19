import { StyleSheet, Text, FlatList, Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  adjacentRoom,
  Tape,
  Pessimist,
  Foggy,
  Den,
} from "./helpers/boardItems";
import { db } from "../firebase/fierbase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import Item from "./component/Item";
import QuestionModal from "./component/QuestionModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SinglePlayerMode = ({ board, boardItems }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentRoomNumber, setCurrentRoomNumber] = useState(0);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState(null);
  const [numberOfTape, setNumberOfTape] = useState(3);
  const [question, setQuestion] = useState({
    question: "",
    type: "",
    point: 0,
    choices: ["", ""],
    level: 0,
    correctAnswer: null,
  });
  const [endGameState, setEndGameState] = useState({
    isEnd: false,
    type: null,
  });

  const getQuestion = async () => {
    const QuestionCol = collection(db, "question1");
    const QuestionSnapshot = await getDocs(QuestionCol);
    const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
    let qac = QuestionList[Math.floor(Math.random() * QuestionList.length)];

    return {
      question: qac.q[4],
      type: qac.q[5],
      point: 5,
      choices: qac.q[1].Choices,
      level: 2,
      correctAnswer: qac.q[0],
    };
  };

  const displayQuestion = async (selectedRoomNumber) => {
    //Get random question from database
    let randomQuestion = await getQuestion();
    setQuestion(randomQuestion);
    //Set selected room number
    setSelectedId(selectedRoomNumber);
    if (adjacentRoom(currentRoomNumber, selectedRoomNumber)) {
      //Clear selected choices
      setSelectedChoices(null);
      //Show question modal
      setQuestionModalVisible(true);
    }
  };

  const roomAction = (roomType) => {
    switch (roomType) {
      case Tape:
        //Inc number of tape
        setNumberOfTape((currentNumberOfTape) => currentNumberOfTape + 1);
        //Remove tape from board
        setTimeout(() => {
          boardItems[selectedId].roomItem = "";
          board[selectedId].roomItem = "";
        }, 1000);

        break;

      case Pessimist:
        //End game loss pessimist
        setEndGameState({ isEnd: true, type: "lossPessimist" });

        break;

      case Foggy:
        alert("Foggy");

        break;
      case Den:
        //End game win
        setEndGameState({ isEnd: true, type: "win" });
        break;
    }
  };

  const move = () => {
    if (selectedChoices === question.correctAnswer) {
      //Move JOUD to the next room
      setCurrentRoomNumber(selectedId);
      //Open room
      board[selectedId].roomItem = boardItems[selectedId].roomItem;
      //Active room action
      roomAction(boardItems[selectedId].roomItem);
    } else {
      if (numberOfTape === 1) {
        //End game loss tape
        setEndGameState({ isEnd: true, type: "lossTape" });
      } else {
        //Deduct number of tape
        setNumberOfTape((currentNumberOfTape) => currentNumberOfTape - 1);
      }
    }
  };

  const endGame = () => {
    alert("end game");
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

  useEffect(() => {
    if (endGameState.type !== null && endGameState.isEnd !== false) {
      endGame();
    }
  }, [endGameState]);

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
          question={question}
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
