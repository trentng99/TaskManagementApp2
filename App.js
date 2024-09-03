import React, { useEffect, useState } from "react";
import {
  BottomNavigation,
  PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskPage from "./pages/TaskPage";
import Homepage from "./pages/Homepage";
import Calendarpage from "./pages/Calendarpage";

import CreateModule from "./pages/CreateModule";
import Module from "./pages/Module";
import CreateQuiz from "./pages/CreateQuiz";
import EditLearningItem from "./pages/EditLearningItem";

const defaultModules = [
  {
    title: "Date strucutres and Algorithm",
    difficulty: "difficult",
    chapters: [
      {
        title: "Understanding Algorithms",
        learningItems: [
          {
            type: "tutorial",
            title: "Introduction to Sorting Algorithms",
            dueDate: "2024-09-02", //
            complete: false,
          },
        ],
      },
      {
        title: "Data Structures Deep Dive",
        learningItems: [
          {
            type: "quiz",
            title: "Data Structures Fundamentals",
            dueDate: "2024-09-04",
            complete: false,
          },
          {
            type: "tutorial",
            title: "Advanced Tree Structures",
            dueDate: "2024-09-06",
            complete: false,
          },
        ],
      },
    ],
  },
  {
    title: "Intro to Web Development",
    difficulty: "easy",
    chapters: [
      {
        title: "Basics of HTML & CSS",
        learningItems: [
          {
            type: "tutorial",
            title: "Getting Started with HTML",
            dueDate: "2024-09-03",
            complete: false,
          },
        ],
      },
      {
        title: "JavaScript Essentials",
        learningItems: [
          {
            type: "quiz",
            title: "JavaScript Basics",
            dueDate: "2024-09-05",
            complete: false,
          },
          {
            type: "quiz",
            title: "JavaScript DOM Manipulation",
            dueDate: "2024-09-07",
            complete: false,
          },
        ],
      },
    ],
  },
];

const Stack = createStackNavigator();

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: "#006E6D",
      primaryContainer: "#FFC42C",
      onPrimaryContainer: "rgb(49, 19, 0)",
      secondary: "#006E6D1A",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "#006E6D1A",
      elevation: {
        level0: "transparent",
        level2: "#4FAAA81A",
      },
      lightGreen: "#3E933E",
      red: "#ED000C",
      yellow: "#FFC42C",
      darkGrey: "#D1D1D1",
      lightGrey: "#ECECEC",
    },
  };

  const [todos, setTodos] = useState([]);
  const [modules, setModules] = useState(defaultModules);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem("tasks");
        setTodos(
          jsonTasks.length > 0 && Array.isArray(jsonTasks)
            ? JSON.parse(jsonTasks)
            : [
                {
                  id: 0,
                  value: "test 1",
                  complete: false,
                  description: "some description",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                },
              ]
        );
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasksFromStorage();
  }, []);

  const saveTasksToStorage = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonTasks);
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    saveTasksToStorage(todos);
  }, [todos]);

  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home-outline",
    },
    {
      key: "tasks",
      title: "Tasks",
      focusedIcon: "school-outline",
    },
    {
      key: "calendar",
      title: "Calendar",
      focusedIcon: "calendar-blank-outline",
    },
  ]);

  const HomeRoute = () => (
    <Homepage
      modules={modules}
      setModules={setModules}
      saveTasksToStorage={saveTasksToStorage}
    />
  );

  const TasksRoute = () => (
    <Stack.Navigator initialRouteName="TaskPage">
      <Stack.Screen name="TaskPage" options={{ headerShown: false }}>
        {(props) => (
          <TaskPage {...props} modules={modules} setModules={setModules} />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateModule" options={{ headerShown: false }}>
        {(props) => (
          <CreateModule {...props} modules={modules} setModules={setModules} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Module" options={{ headerShown: true }}>
        {(props) => (
          <Module {...props} setModules={setModules} modules={modules} />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateQuiz" options={{ headerShown: true }}>
        {(props) => <CreateQuiz {...props} />}
      </Stack.Screen>
      <Stack.Screen name="EditLearningItem" options={{ headerShown: true }}>
        {(props) => <EditLearningItem {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  const CalendarRoute = () => <Calendarpage modules={modules} />;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    tasks: TasksRoute,
    calendar: CalendarRoute,
  });

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
