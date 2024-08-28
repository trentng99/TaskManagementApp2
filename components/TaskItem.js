import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { formatDate } from "../common/formatDate";
import { useTheme } from "react-native-paper";

const TaskItem = ({ item, handleComplete }) => {
  const [isChecked, setIsChecked] = useState(item?.complete);
  const theme = useTheme();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    handleComplete(item.id);
  };
  console.log({ item });
  if (!item) {
    return <View>nothing</View>;
  }

  return (
    <View style={styles.todoItem}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, item.complete && styles.crossedOut]}>
          {item.title} ({item.type})
        </Text>
        <Text style={styles.details}>
          <Text style={{ color: theme.colors.primary }}>
            MODULE: {item.moduleTitle}
          </Text>{" "}
          •{" "}
          <Text style={{ color: theme.colors.lightGreen }}>
            CHAPTER {item.chapterIndex}
          </Text>{" "}
          • <Text>{formatDate(item.dueDate)}</Text>
        </Text>
      </View>
      <Checkbox
        style={styles.circularCheckbox}
        status={isChecked ? "checked" : "unchecked"}
        onPress={toggleCheckbox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    marginBottom: 4,
    elevation: 0,
    shadowColor: "transparent",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  details: {
    fontSize: 12,
    color: "#6D6D6D",
  },
  circularCheckbox: {
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderColor: "#fff",
  },
  crossedOut: {
    textDecorationLine: "line-through",
  },
});

export default TaskItem;
