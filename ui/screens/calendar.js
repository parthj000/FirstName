import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CalendarProvider } from "../components/CalendarContext";
import Header from "../components/Header";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
import FloatButton from "../components/AddButton";
import Toast from "react-native-toast-message";

const MyCalendar = ({ route }) => {
  const [key,setKey] = useState(0)

  useEffect(() => {
    if (route.params?.refresh) {
       console.log("will refresh")
      setKey(pre=>pre+1);
    }
  }, [route.params]);

  return (
    <CalendarProvider>
      <View style={{ position: "relative", zIndex: 5 }}>
        <Toast />
      </View>

      <View key={key} style={styles.container}>
        <Header />
        <DayView  />
        <WeekView  />
        <MonthView  />
        <FloatButton />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyCalendar;
