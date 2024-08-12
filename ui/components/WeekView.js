import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";
import CustomWeeklyCalendar from "../screens/week";
import TaskComponent from "./TaskComponent";

const WeekView = () => {
  const { view } = useContext(CalendarContext);

  if (view !== "week") return null;

  return (
    <View style={styles.weekView}>
      <CustomWeeklyCalendar />
    </View>
  );
};

const styles = StyleSheet.create({
  weekView: {
    flex: 1,
  },
});

export default WeekView;
