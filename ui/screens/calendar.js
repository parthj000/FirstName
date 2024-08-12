import React from "react";
import { View, StyleSheet } from "react-native";
import { CalendarProvider } from "../components/CalendarContext";
import Header from "../components/Header";

import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
import Header1 from "./TopHeader";
import FloatButton from "../components/AddButton";
import AddEvent from "../components/AddEvent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const MyCalendar = () => {
  return (
    <>
      <CalendarProvider>
        <View style={{ position: "relative", zIndex: 5 }}>
          <Toast />
        </View>
        <View style={styles.container}>
          {/* <Header1 title="Calendar" /> */}
          <Header />
          <DayView />
          <WeekView />
          <MonthView />
          {/* <AddEvent /> */}

          <FloatButton />
        </View>
      </CalendarProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyCalendar;
