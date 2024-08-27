import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function ModuleItem({ item, index }) {
  const getColorBasedOnDifficulty = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "#4CAF50"; // Green
      case "medium":
        return "#FFC107"; // Amber
      case "difficult":
        return "#F44336"; // Red
      default:
        return "#9E9E9E"; // Grey (default if difficulty is unknown)
    }
  };

  return (
    <View style={styles.moduleItem}>
      <View style={styles.textContainer}>
        <View
          style={[
            styles.difficultyIndicator,
            {
              backgroundColor: getColorBasedOnDifficulty(item.difficulty),
              marginRight: 16,
            },
          ]}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    marginVertical: 8,
    elevation: 0,
    shadowColor: "transparent",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  difficultyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4, // Half of the width/height to make it fully round
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
});
