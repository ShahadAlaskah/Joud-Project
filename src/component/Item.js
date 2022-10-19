import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Item = ({ item, onPress, backgroundColor, textColor, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.item, backgroundColor]}
    >
      <Text style={[styles.title, textColor]}>{item.roomItem}</Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    marginVertical: 1,
    marginHorizontal: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 10,
  },
});
