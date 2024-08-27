import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { globalStyles } from "../common/style";
import { FAB, Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModuleItem from "../components/ModuleItem";

const TaskPage = ({ modules }) => {
  const [state, setState] = useState({ open: false });
  const route = useRoute(); // Get the current route

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Module management</Text>
      <FlatList
        data={modules}
        renderItem={({ item, index }) => (
          <ModuleItem item={item} moduleIndex={index} />
        )}
      />
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
    bottom: 0,
  },
});

export default TaskPage;
