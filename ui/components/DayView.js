import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert } from "react-native";

import { Calendar } from "react-native-big-calendar";
import { CalendarContext } from "./CalendarContext";
import dayjs from "dayjs";
import { doEventsStructuring, fetchMonthEvents } from "./MonthView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventModal from "./EventModal";


const { width, height } = Dimensions.get("window");

const MyCalendarComponent = () => {
  const { view, month  } = useContext(CalendarContext);
  
  const [newEvents, setEvents] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

 
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchDayEvents();
  }, [month]);

  const fetchDayEvents = async () => {
    try {
      const start = dayjs(month).startOf("day").valueOf() / 1000;
      const end = dayjs(month).endOf("day").valueOf() / 1000;
      console.log(start, end);
      const token = await AsyncStorage.getItem("token");

      console.log(token);
      const res = await fetch(
        `${process.env.BACKEND_URI}/api/events?startDate=${start}&endDate=${end}&mode=D`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      const events = doEventsStructuring(data.events);
      setEvents(events);

      setLoading(false);
      console.log("fetch day is runned");
      return;
    } catch (err) {
      console.log(err);
    }
  };

  if (view !== "day") return null;

  //

  return (
    <>
      {/* {fetchDayEvents()} */}
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={styles.container}>
          {console.log(month)}
          <Calendar
            dayHeaderStyle={{ backgroundColor: "white" }}
            weekDayHeaderHighlightColor="black"
            dayHeaderHighlightColor="black"
            onPressEvent={(e) => {
              // Alert.alert(e.title, e.des);
              setModalData(e);
              setModalVisible(true);
              
            }}
            events={newEvents} // Add your events here
            height={height}
            width={width}
            mode="day"
            date={month}
            swipeEnabled={false}
          />

          <EventModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            data={modalData}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  leftHalf: {
    width: width / 2,
    height: "100%",
    backgroundColor: "transparent",
  },
  rightHalf: {
    width: width / 2,
    height: "100%",
    backgroundColor: "transparent",
  },
});

function getDayTimestamps(dateString) {
  // Create a dayjs object from the provided date string
  const date = dayjs(dateString);

  // Get the start of the day
  const startOfDay = date.startOf("day").unix(); // Unix timestamp in seconds

  // Get the end of the day
  const endOfDay = date.endOf("day").unix(); // Unix timestamp in seconds

  return { startOfDay, endOfDay };
}

export default MyCalendarComponent;
