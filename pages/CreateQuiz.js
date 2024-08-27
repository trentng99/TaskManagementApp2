import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { TextInput, Text, SegmentedButtons } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function CreateQuiz({ route }) {
  const { chapterIndex, moduleIndex } = route.params;
  const navigation = useNavigation();
  console.log(chapterIndex, moduleIndex);

  const [type, setType] = useState("quiz");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = React.useState("2023-04-12");
  const [error, setError] = React.useState("");

  const handleSave = () => {
    const newLearningItem = {
      type,
      title,
      dueDate,
    };
    if (moment(dueDate, "YYYY-MM-DD", true).isValid()) {
      navigation.navigate("Module", {
        newLearningItem,
        chapterIndex,
        moduleIndex,
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
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
  },
});
