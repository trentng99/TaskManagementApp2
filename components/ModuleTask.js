import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { formatDate } from "../common/formatDate";
import { useTheme } from "react-native-paper";

const ModuleTask = ({ item, handleComplete }) => {
  const [isChecked, setIsChecked] = useState(item.complete);

  const theme = useTheme();

  const toggleCheckbox = (id) => {
    setIsChecked(!isChecked);
    handleComplete(id);
  };

  return (
    <View style={styles.todoItem}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, item.complete && styles.crossedOut]}>
          {item.value} (Math 101)
        </Text>{" "}
        <Text style={styles.details}>
          <span style={{ color: theme.colors.primary }}>
            MODULE {item.module}
          </span>{" "}
          •{" "}
          <span style={{ color: theme.colors.lightGreen }}>
            CHAPTER {item.chapter}
          </span>{" "}
          • <span>{formatDate(item.endDate)}</span>
        </Text>
      </View>
      <Checkbox
        style={styles.circularCheckbox}
        status={item.complete ? "checked" : "unchecked"}
        onPress={() => toggleCheckbox(item.id)}
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
    flex: 1, // Ensure text container takes up all space except for the checkbox
    marginRight: 12, // Margin right to give space before the checkbox
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16, // Margin between title and details
  },
  details: {
    fontSize: 12,
    color: "#6D6D6D",
  },
  circularCheckbox: {
    padding: 4, // Ensure touchable area is large enough
    backgroundColor: "#FFFFFF", // Set background to white
    borderColor: "#fff",
  },
  crossedOut: {
    textDecorationLine: "line-through", // Cross out the text
  },
});

export default TaskItem;
