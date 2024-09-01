import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Checkbox, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ChapterItem({
  item,
  moduleIndex,
  chapterIndex,
  modules,
  setModules,
}) {
  const navigation = useNavigation();
  console.log({ moduleIndex, chapterIndex });

  const handleAddLearningItem = () => {
    navigation.navigate("CreateQuiz", {
      moduleIndex,
      chapterIndex,
    });
  };

  const handleDeleteLearningItem = (learningItemIndex) => {
    const updatedModules = modules.map((module, modIndex) => {
      if (modIndex === moduleIndex) {
        return {
          ...module,
          chapters: module.chapters.map((chapter, chapIndex) => {
            if (chapIndex === chapterIndex) {
              return {
                ...chapter,
                learningItems: chapter.learningItems.filter(
                  (_, index) => index !== learningItemIndex
                ),
              };
            }
            return chapter;
          }),
        };
      }
      return module;
    });

    setModules(updatedModules);
  };

  const toggleCheckbox = (learningItemIndex) => {
    const updatedModules = modules.map((module, modIndex) => {
      if (modIndex === moduleIndex) {
        return {
          ...module,
          chapters: module.chapters.map((chapter, chapIndex) => {
            if (chapIndex === chapterIndex) {
              return {
                ...chapter,
                learningItems: chapter.learningItems.map(
                  (learningItem, index) =>
                    index === learningItemIndex
                      ? { ...learningItem, complete: !learningItem.complete }
                      : learningItem
                ),
              };
            }
            return chapter;
          }),
        };
      }
      return module;
    });

    setModules(updatedModules);
  };

  // Check if all learning items are completed
  const allItemsCompleted =
    item.learningItems.length > 0 &&
    item.learningItems.every((learningItem) => learningItem.complete);

  return (
    <View style={styles.chapterItem}>
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, allItemsCompleted && styles.completedTitle]}>
          {item.title} ({item.learningItems.length})
        </Text>
      </View>

      {/* Render the learningItems below the title */}
      <View style={styles.learningItemsContainer}>
        {item.learningItems.map((learningItem, idx) => (
          <View style={styles.learningItem} key={idx}>
            <View style={styles.learningItemTextContainer}>
              <Text
                style={[
                  styles.learningItemText,
                  learningItem.complete && styles.completedText,
                ]}>
                {learningItem.title}
              </Text>
              <Text style={styles.learningItemDetails}>
                {learningItem.type} - {learningItem.dueDate}
              </Text>
            </View>
            <Checkbox
              status={learningItem.complete ? "checked" : "unchecked"}
              onPress={() => toggleCheckbox(idx)}
            />
            <IconButton
              icon="delete"
              color="red"
              onPress={() => handleDeleteLearningItem(idx)}
            />
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
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#888", // Optional: make the color lighter when completed
  },
  addButton: {
    marginTop: 8,
  },
  learningItemsContainer: {
    marginTop: 16,
    display: "flex",
  },
  learningItem: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Space between text and checkbox
    backgroundColor: "#D4D4D4",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  learningItemTextContainer: {
    flex: 1, // Take up remaining space
  },
  learningItemText: {
    fontSize: 16,
    color: "#000",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888", // Optional: make the color lighter when completed
  },
  learningItemDetails: {
    fontSize: 14,
    color: "#666",
  },
});
