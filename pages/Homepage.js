import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { globalStyles } from "../common/style";
import { Text } from "react-native-paper";
import TaskItem from "../components/TaskItem";

export default function Homepage({ modules, setModules }) {
  // Flatten learning items from all modules with additional context
  const allLearningItems = modules?.flatMap((module, moduleIndex) =>
    module?.chapters?.flatMap((chapter, chapterIndex) =>
      chapter.learningItems.map((item) => ({
        ...item,
        moduleIndex,
        chapterIndex,
        itemIndex: chapter.learningItems.indexOf(item),
        moduleTitle: module.title,
        chapterTitle: chapter.title,
      }))
    )
  );

  // Sort the items by dueDate (assuming dueDate is in a format that can be compared)
  const sortedLearningItems = allLearningItems?.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  const handleComplete = (moduleIndex, chapterIndex, itemIndex) => {
    // Create a deep copy of the modules array to avoid direct state mutation
    const updatedModules = [...modules];

    // Access the specific item and toggle the 'complete' status
    updatedModules[moduleIndex].chapters[chapterIndex].learningItems[
      itemIndex
    ].complete =
      !updatedModules[moduleIndex].chapters[chapterIndex].learningItems[
        itemIndex
      ].complete;

    // Update the state with the modified modules array
    setModules(updatedModules);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Hi, here's this week's tasks</Text>
      {sortedLearningItems?.length > 0 ? (
        <FlatList
          data={sortedLearningItems}
          renderItem={({ item, index }) => (
            <TaskItem
              item={item}
              itemIndex={index}
              handleComplete={handleComplete}
            />
          )}
        />
      ) : (
        <Text style={{ marginTop: 24 }}>
          No tasks available, try going to the task page to add some tasks
        </Text>
      )}
    </View>
  );
}
