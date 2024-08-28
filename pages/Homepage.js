import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { globalStyles } from "../common/style";
import { Text } from "react-native-paper";
import TaskItem from "../components/TaskItem";

let id = 1;

export default function Homepage({ modules, setModules }) {
  const [dateVisible, setDateVisible] = useState(false);
  console.log({ modules });

  // Flatten learning items from all modules with additional context
  const allLearningItems = modules.flatMap((module, moduleIndex) =>
    module?.chapters?.flatMap((chapter, chapterIndex) =>
      chapter.learningItems.map((item) => ({
        ...item,
        moduleTitle: module.title,
        chapterTitle: chapter.title,
        chapterIndex: chapterIndex + 1, // Add chapter index for sorting/display
      }))
    )
  );

  // // Filter and sort learning items based on the selected date
  // const filteredItems = allLearningItems
  //   .filter((item) => {
  //     const dueDate = new Date(item.dueDate);
  //     return dueDate.getTime() >= selectedDate.getTime();
  //   })
  //   .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  console.log({ allLearningItems });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Hi, here's this week's tasks</Text>
      {allLearningItems.length > 0 ? (
        <FlatList
          data={allLearningItems}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              moduleTitle={item?.moduleTitle}
              handleComplete={() => {}}
              showDialog={() => {}}
              handleDelete={() => {}}
            />
          )}
        />
      ) : (
        <View>hello</View>
      )}
    </View>
  );
}
