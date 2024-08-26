import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

export default function CreateModule({ modules, setModules }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("difficult");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create module</Text>
      <TextInput
        mode="outlined"
        label="Title"
        placeholder="Enter module title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        style={styles.input}
      />
      <RNPickerSelect
        value={difficulty}
        onValueChange={(value) => setDifficulty(value)}
        items={[
          { label: "Difficult", value: "difficult" },
          { label: "Medium", value: "medium" },
          { label: "Easy", value: "easy" },
        ]}
        placeholder={{ label: "Select difficulty level...", value: null }}
        style={{
          ...pickerSelectStyles,
          placeholder: {
            color: "#6d6d6d", // Placeholder color to match Paper's placeholder style
          },
          viewContainer: styles.pickerViewContainer,
          iconContainer: styles.iconContainer,
        }}
      />
      <View style={{ marginTop: 24 }}>
        <Button
          onPress={() => {
            if (title.trim() === "") {
              alert("Title cannot be empty!");
              return;
            }
            const newModule = { title, difficulty };
            setModules([...modules, newModule]);
            setTitle(""); // Reset the title input
            setDifficulty("difficult"); // Reset the difficulty picker
          }}
          title="Submit"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
