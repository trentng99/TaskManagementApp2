import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { TextInput, Text, SegmentedButtons } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function EditLearningItem({ route }) {
  const { chapterIndex, moduleIndex, learningItemIndex, learningItem } =
    route.params;
  const navigation = useNavigation();

  const [type, setType] = useState(learningItem.type || "quiz");
  const [title, setTitle] = useState(learningItem.title || "");
  const [dueDate, setDueDate] = useState(learningItem.dueDate || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    const updatedLearningItem = {
      ...learningItem,
      type,
      title,
      dueDate,
    };

    if (moment(dueDate, "YYYY-MM-DD", true).isValid()) {
      navigation.navigate("Module", {
        updatedLearningItem,
        chapterIndex,
        moduleIndex,
        learningItemIndex,
      });
    } else {
      setError("Invalid date format");
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[
          {
            value: "quiz",
            label: "Quiz",
          },
          {
            value: "tutorial",
            label: "Tutorial",
          },
        ]}
      />
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Due Date</Text>
      <TextInputMask
        type={"datetime"}
        options={{
          format: "YYYY-MM-DD",
        }}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="YYYY-MM-DD"
        style={{ marginBottom: 24 }}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSave} title="Save" />
    </View>
  );
}

const styles = StyleSheet.create({
  // Your existing styles here...
});
