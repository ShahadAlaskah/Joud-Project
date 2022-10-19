import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const Choices = ({ choice, onPress, backgroundColor, textColor }) => {
  return (
    <Pressable
      style={{
        backgroundColor: backgroundColor,
      }}
      onPress={onPress}
    >
      <Text style={{ color: textColor }}>{choice}</Text>
    </Pressable>
  );
};

export default Choices;

const styles = StyleSheet.create({});
