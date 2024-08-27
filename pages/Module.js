import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FAB, Text } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { globalStyles } from "../common/style";
import ChapterItem from "../components/ChapterItem";

const Module = ({ modules, setModules }) => {
  const [chapters, setChapters] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const { chapterIndex, newLearningItem, moduleIndex } = route.params;

  useEffect(() => {
    console.log("Module Index:", moduleIndex);
    console.log("Modules:", modules);
    const selectedModule = modules[moduleIndex] || { chapters: [] };
    console.log("Selected Module:", selectedModule);
    setChapters(selectedModule.chapters);
  }, [moduleIndex, modules]);

  useEffect(() => {
    console.log("New Learning Item:", newLearningItem);
    console.log("Chapter Index:", chapterIndex);
    console.log("Chapters Before Update:", chapters);

    if (newLearningItem !== undefined && chapterIndex >= 0) {
      const updatedChapters = [...chapters];

      if (chapterIndex < updatedChapters.length) {
        updatedChapters[chapterIndex] = {
          ...updatedChapters[chapterIndex],
          learningItems: [
            ...updatedChapters[chapterIndex].learningItems,
            newLearningItem,
          ],
        };

        console.log("Updated Chapters After Learning Item:", updatedChapters);
        setChapters(updatedChapters);

        const updatedModules = modules.map((mod, index) =>
          index === moduleIndex ? { ...mod, chapters: updatedChapters } : mod
        );
        console.log("Updated Modules After Learning Item:", updatedModules);
        setModules(updatedModules);

        navigation.setParams({ ...route.params, newLearningItem: undefined });
      }
    }
  }, [
    newLearningItem,
    chapterIndex,
    moduleIndex,
    chapters,
    modules,
    navigation,
    route.params,
  ]);

  const addChapter = () => {
    if (chapters?.length) {
      const newChapter = {
        title: `Chapter ${chapters?.length + 1}`,
        learningItems: [],
      };
      const updatedChapters = [...chapters, newChapter];
      setChapters(updatedChapters);
      const updatedModules = modules.map((mod, index) =>
        index === moduleIndex ? { ...mod, chapters: updatedChapters } : mod
      );

      setModules(updatedModules);
    } else {
      const newChapter = {
        title: `Chapter 1`,
        learningItems: [],
      };
      const updatedChapters = [newChapter];
      setChapters(updatedChapters);
      const updatedModules = modules.map((mod, index) =>
        index === moduleIndex ? { ...mod, chapters: updatedChapters } : mod
      );

      setModules(updatedModules);
    }
  };

  const selectedModule = modules[moduleIndex] || { chapters: [] };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>{selectedModule?.title}</Text>
      <FlatList
        data={selectedModule?.chapters}
        renderItem={({ item, index }) => (
          <ChapterItem
            item={item}
            moduleIndex={moduleIndex}
            chapterIndex={index}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Chapter"
        onPress={addChapter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
  },
  heading: {
    marginBottom: 16,
    fontSize: 36,
  },
});

export default Module;
