import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

export default function ModuleItem({ item, moduleIndex }) {
  const navigation = useNavigation(); // Initialize navigation

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

  // Function to handle the click and navigate to the new route
  const handlePress = () => {
    navigation.navigate("Module", { moduleIndex });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.moduleItem}>
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
    </TouchableOpacity>
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
