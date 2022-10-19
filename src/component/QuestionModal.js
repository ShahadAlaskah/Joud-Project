import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Choices from "./Choices";

const QuestionModal = ({
  question,
  questionModalVisible,
  setQuestionModalVisible,
  selectedChoices,
  setSelectedChoices,
}) => {
  const renderChoices = (choiceTitle, choiceIndex) => {
    let backgroundColor;
    let color;
    if (
      choiceIndex === selectedChoices &&
      choiceIndex === question.correctAnswer
    ) {
      backgroundColor = "#008000";
    } else if (
      choiceIndex === selectedChoices &&
      choiceIndex !== question.correctAnswer
    ) {
      backgroundColor = "#dc143c";
    } else if (
      selectedChoices &&
      choiceIndex !== selectedChoices &&
      choiceIndex === question.correctAnswer
    ) {
      backgroundColor = "#008000";
    }
    color = choiceIndex === selectedChoices ? "white" : "black";

    return (
      <Choices
        key={choiceIndex}
        choice={choiceTitle}
        onPress={() => {
          setSelectedChoices(choiceIndex);
          setTimeout(() => setQuestionModalVisible(false), 1000);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={questionModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setQuestionModalVisible(!questionModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{question.question}</Text>
            {question.choices.map((choice, index) => {
              return renderChoices(choice, index);
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuestionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
