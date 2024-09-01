import React from "react";
import { View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { useTheme } from "react-native-paper";

export default function Calendarpage({ modules }) {
  const transformModulesToAgendaFormat = (modules) => {
    const agendaItems = {};

    const theme = useTheme();

    modules?.forEach((module) => {
      module.chapters.forEach((chapter) => {
        chapter.learningItems.forEach((item) => {
          const dueDate = item.dueDate;

          if (!agendaItems[dueDate]) {
            agendaItems[dueDate] = [];
          }

          agendaItems[dueDate].push({
            title: item.title,
            type: item.type,
            moduleTitle: module.title,
            chapterTitle: chapter.title,
            complete: item.complete,
            difficulty: module.difficulty,
          });
        });
      });
    });

    return agendaItems;
  };

  const agendaData = transformModulesToAgendaFormat(modules);

  const theme = useTheme(); // Use theme here

  return (
    <Agenda
      items={agendaData}
      refreshControl={null}
      showClosingKnob={true}
      refreshing={false}
      renderEmptyData={() => {
        return (
          <View style={{ margin: "auto" }}>
            You have nothing on for the day
          </View>
        );
      }}
      renderItem={(item, firstItemInDay) => (
        <View style={{ margin: 10, padding: 10, backgroundColor: "#f9f9f9" }}>
          <Text>
            {item.moduleTitle} - {item.chapterTitle}
          </Text>
          <Text>
            {item.type}: {item.title}
          </Text>
          <Text>Difficulty: {item.difficulty}</Text>
          <Text
            style={{
              color: item.complete ? theme.colors.lightGreen : theme.colors.red,
            }}>
            {item.complete ? "Completed" : "Incomplete"}
          </Text>
        </View>
      )}
      theme={{
        ...theme, // This applies your existing Paper theme
        todayTextColor: theme.colors.primary,
        dotColor: theme.colors.primary,
        selectedDayBackgroundColor: theme.colors.primary,
        agendaTodayColor: theme.colors.primary,
        agendaKnobColor: theme.colors.primary,
      }}
    />
  );
}
