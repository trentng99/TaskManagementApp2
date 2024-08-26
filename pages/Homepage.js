import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { globalStyles } from "../common/style";
import { Text } from "react-native-paper";
import TaskItem from "../components/TaskItem";
import { formatDate } from "../common/formatDate";

let id = 1;

export default function Homepage({
  todos,
  setTodos,
  selectedDate,
  setSelectedDate,
}) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [editInput, setEditInput] = useState({});
  const [dateVisible, setDateVisible] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [editTaskVisible, setEditTaskVisible] = useState(false);
  const [mode, setMode] = useState("date");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [addTaskStartDate, setAddTaskStartDate] = useState(new Date());
  const [addTaskEndDate, setAddTaskEndDate] = useState(new Date());
  const [editTaskStartDate, setEditTaskStartDate] = useState(new Date());
  const [editTaskEndDate, setEditTaskEndDate] = useState(new Date());

  // Add Task
  const onChangeAddTaskStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setAddTaskStartDate(selectedDate || addTaskStartDate);
  };

  const onChangeAddTaskEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setAddTaskEndDate(selectedDate || addTaskEndDate);
  };

  // Edit Task
  const onChangeEditTaskStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setEditTaskStartDate(selectedDate || editTaskStartDate);
  };

  const onChangeEditTaskEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setEditTaskEndDate(selectedDate || editTaskEndDate);
  };

  const showDialog = (type, id) => {
    switch (type) {
      case "addTask":
        setAddTaskVisible(!addTaskVisible);
        break;
      case "calendar":
        setDateVisible(!dateVisible);
        break;
      case "editTask":
        setEditTaskVisible(!editTaskVisible);
        const selectedTodo = todos.find((todo) => todo.id === id);
        if (selectedTodo) {
          setEditInput(selectedTodo);
          setEditTaskStartDate(new Date(selectedTodo.startDate));
          setEditTaskEndDate(new Date(selectedTodo.endDate));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const newTask = {
      id: id++,
      value: input,
      description: description,
      startDate: formatDate(addTaskStartDate),
      endDate: formatDate(addTaskEndDate),
      complete: false,
    };

    const updatedTasks = [...todos, newTask];

    setTodos(updatedTasks);

    setInput("");
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleEdit = () => {
    const editedTask = {
      ...editInput,
      startDate: formatDate(editTaskStartDate),
      endDate: formatDate(editTaskEndDate),
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === editInput.id ? editedTask : todo
    );

    setTodos(updatedTodos);
    setEditInput({});
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
  };

  const sortedTodos = todos
    .filter(
      (task) => task.startDate <= selectedDate && task.endDate >= selectedDate
    )
    .sort((a, b) => {
      const dateA = new Date(a.endDate).getTime();
      const dateB = new Date(b.endDate).getTime();

      if (dateA === dateB) {
        if (a.complete === b.complete) {
          return 0;
        } else if (a.complete) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return dateA - dateB;
      }
    });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Hi, here's this week's task</Text>

      <FlatList
        data={sortedTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <TaskItem
              item={item}
              handleComplete={handleComplete}
              showDialog={showDialog}
              handleDelete={handleDelete}
            />
          </>
        )}
        shouldComponentUpdate={(props, nextProps) => {
          // Compare item properties for changes
          return (
            props.item.value !== nextProps.item.value ||
            props.item.complete !== nextProps.item.complete ||
            props.item.startDate !== nextProps.item.startDate ||
            props.item.endDate !== nextProps.item.endDate
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 16,
    fontSize: 36,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dateButton: {
    flex: 0,
    paddingHorizontal: 6,
  },
  divider: {
    marginVertical: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
    height: 60,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  todoItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  dialogContent: {
    flexDirection: "column",
  },
  inputContainer: {
    marginBottom: 10,
  },
});
