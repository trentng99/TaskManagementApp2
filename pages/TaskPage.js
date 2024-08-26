import React, { useState } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { globalStyles } from "../common/style";
import { FAB, Portal, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TaskPage = ({ modules, setModules }) => {
  const [state, setState] = useState({ open: false });
  const [textState, setTextState] = useState("");

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const navigation = useNavigation();
  return (
    <View>
      <Text style={globalStyles.heading}>Task management</Text>
      {JSON.stringify(modules)}
      <Portal>
        <FAB.Group
          backdropColor="transparent"
          color={"#fff"}
          style={styles.fab}
          open={open}
          icon="plus"
          actions={[
            {
              icon: "checkbox-marked-circle-outline",
              label: "Add task",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "grid",
              label: "Add module",
              onPress: () => navigation.navigate("CreateModule"),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 16,
    fontSize: 36,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 72,
  },
});

export default TaskPage;
