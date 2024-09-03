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

  // useEffect for creating new Learning items
  useEffect(() => {
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

        setChapters(updatedChapters);

        const updatedModules = modules.map((mod, index) =>
          index === moduleIndex ? { ...mod, chapters: updatedChapters } : mod
        );
        setModules(updatedModules);

        // Reset the newLearningItem parameter
        navigation.setParams({ newLearningItem: undefined });
      }
    }
  }, [newLearningItem, chapterIndex, moduleIndex]);

  // useEffect for editing currenct learning items
  useEffect(() => {
    const { updatedLearningItem, learningItemIndex } = route.params || {};

    if (
      updatedLearningItem !== undefined &&
      learningItemIndex >= 0 &&
      chapterIndex >= 0
    ) {
      const updatedChapters = [...chapters];

      if (chapterIndex < updatedChapters.length) {
        const learningItems = [...updatedChapters[chapterIndex].learningItems];
        learningItems[learningItemIndex] = updatedLearningItem;

        updatedChapters[chapterIndex] = {
          ...updatedChapters[chapterIndex],
          learningItems,
        };

        setChapters(updatedChapters);

        const updatedModules = modules.map((mod, index) =>
          index === moduleIndex ? { ...mod, chapters: updatedChapters } : mod
        );

        setModules(updatedModules);

        // Reset the updatedLearningItem parameter
        navigation.setParams({
          updatedLearningItem: undefined,
          learningItemIndex: undefined,
        });
      }
    }
  }, [
    route.params?.updatedLearningItem,
    route.params?.learningItemIndex,
    chapterIndex,
    moduleIndex,
  ]);

  const addChapter = () => {
    const newChapter = {
      title: `Chapter ${chapters.length + 1}`,
      learningItems: [],
    };
    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);

    const updatedModules = modules.map((mod, index) =>
      index === moduleIndex ? { ...mod, chapters: updatedChapters } : mod
    );

    setModules(updatedModules);
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
            modules={modules}
            setModules={setModules}
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
