import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Divider, ProgressBar, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ModuleItem({ item, moduleIndex }) {
  const navigation = useNavigation();

  const getColorBasedOnDifficulty = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "difficult":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const handlePress = () => {
    navigation.navigate("Module", { moduleIndex });
  };

  // Calculate counts with conditional checks
  const chapterCount = item.chapters ? item.chapters.length : 0;
  const completedChapterCount = item.chapters
    ? item.chapters.filter((chapter) =>
        chapter.learningItems.every((item) => item.complete)
      ).length
    : 0;

  const totalLearningItems = item.chapters
    ? item.chapters.reduce(
        (count, chapter) =>
          count + (chapter.learningItems ? chapter.learningItems.length : 0),
        0
      )
    : 0;

  const completedLearningItems = item.chapters
    ? item.chapters.reduce(
        (count, chapter) =>
          count +
          (chapter.learningItems
            ? chapter.learningItems.filter((item) => item.complete).length
            : 0),
        0
      )
    : 0;

  const tutorialCount = item.chapters
    ? item.chapters.reduce(
        (count, chapter) =>
          count +
          (chapter.learningItems
            ? chapter.learningItems.filter((item) => item.type === "tutorial")
                .length
            : 0),
        0
      )
    : 0;

  const completedTutorialCount = item.chapters
    ? item.chapters.reduce(
        (count, chapter) =>
          count +
          (chapter.learningItems
            ? chapter.learningItems.filter(
                (item) => item.type === "tutorial" && item.complete
              ).length
            : 0),
        0
      )
    : 0;

  const quizCount = item.chapters
    ? item.chapters.reduce(
        (count, chapter) =>
          count +
          (chapter.learningItems
            ? chapter.learningItems.filter((item) => item.type === "quiz")
                .length
            : 0),
        0
      )
    : 0;

  const completedQuizCount = item.chapters
    ? item.chapters.reduce(
        (count, chapter) =>
          count +
          (chapter.learningItems
            ? chapter.learningItems.filter(
                (item) => item.type === "quiz" && item.complete
              ).length
            : 0),
        0
      )
    : 0;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.moduleItem}>
      <View style={styles.header}>
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
        <Icon name="chevron-right" size={24} color="#000" />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.countContainer}>
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Chapters: {completedChapterCount}/{chapterCount}
          </Text>
          <ProgressBar
            style={styles.progressBar}
            progress={
              chapterCount > 0 ? completedChapterCount / chapterCount : 0
            }
            color="#006E6D"
          />
        </View>
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Tutorials: {completedTutorialCount}/{tutorialCount}
          </Text>
          <ProgressBar
            style={styles.progressBar}
            progress={
              tutorialCount > 0 ? completedTutorialCount / tutorialCount : 0
            }
            color="#006E6D"
          />
        </View>
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Quizzes: {completedQuizCount}/{quizCount}
          </Text>
          <ProgressBar
            style={styles.progressBar}
            progress={quizCount > 0 ? completedQuizCount / quizCount : 0}
            color="#006E6D"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  moduleItem: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    marginVertical: 8,
    elevation: 0,
    shadowColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficultyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
  divider: {
    marginVertical: 8,
  },
  countContainer: {
    marginTop: 8,
  },
  countRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
    width: "100%",
  },
  progressBar: {
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: "auto",
    marginLeft: 8, // Space between the text and progress bar
  },
  countText: {
    marginRight: 16,
    width: 140,
  },
});
