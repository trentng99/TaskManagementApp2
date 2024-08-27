import React from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ChapterItem({ item, moduleIndex, chapterIndex }) {
  const navigation = useNavigation();
  console.log({ moduleIndex, chapterIndex });

  const handleAddLearningItem = () => {
    navigation.navigate("CreateQuiz", {
      moduleIndex,
      chapterIndex,
    });
  };

  return (
    <View style={styles.chapterItem}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {/* Render the learningItems below the title */}
      <View style={styles.learningItemsContainer}>
        {item.learningItems.map((learningItem, idx) => (
          <View key={idx} style={styles.learningItem}>
            <Text style={styles.learningItemText}>{learningItem.title}</Text>
            <Text style={styles.learningItemDetails}>
              {learningItem.type} - {learningItem.dueDate}
            </Text>
          </View>
        ))}
      </View>
      <Button
        onPress={handleAddLearningItem}
        style={styles.addButton}
        title="Add Tutorial/Quiz"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterItem: {
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
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
  addButton: {
    marginTop: 8,
  },
  learningItemsContainer: {
    marginTop: 16,
  },
  learningItem: {
    backgroundColor: "#D4D4D4", // Slightly darker background color
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  learningItemText: {
    fontSize: 16,
    color: "#000",
  },
  learningItemDetails: {
    fontSize: 14,
    color: "#666",
  },
});
