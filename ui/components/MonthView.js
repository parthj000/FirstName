import React, { useContext, useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { CalendarContext } from "./CalendarContext";
import dayjs from "dayjs";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventModal from "./EventModal";

const { width, height } = Dimensions.get("window");

const MonthView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    view,
    setView,
    month,
    setMonth,

    setSelectedValue,
  } = useContext(CalendarContext);
  const [newEvents, setEvents] = useState([]);
  const [previous, setPrevious] = useState({});
  const [next, setNext] = useState({});
  const [loading, setLoading] = useState(false);
  const[modalData,setModalData] = useState({});

  useEffect(() => {
    setMonth(dayjs());
    fetchMonthEvents(setNext, setPrevious, {}, "M", setEvents, setLoading);
  }, []);

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      const swipeThreshold = 50; // Adjust this value to change swipe sensitivity

      // Check if the swipe is mostly horizontal
      if (
        Math.abs(translationX) > Math.abs(translationY) &&
        Math.abs(translationX) > swipeThreshold
      ) {
        if (translationX < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      }
    }
  };

  const handleCell = (date) => {
   
    setSelectedValue("day");
    setMonth(date);
    setView("day");
  };

  const onSwipeLeft = () => {
    setMonth(dayjs(month).add(1, "month"));
    fetchMonthEvents(setNext, setPrevious, next, "M", setEvents, setLoading);
  };

  const onSwipeRight = () => {
    setMonth(dayjs(month).subtract(1, "month"));

    fetchMonthEvents(
      setNext,
      setPrevious,
      previous,
      "M",
      setEvents,
      setLoading
    );
  };

  if (view !== "month") return null;

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <GestureHandlerRootView style={styles.container}>
          <PanGestureHandler
            onGestureEvent={handleSwipe}
            onHandlerStateChange={handleSwipe}
            activeOffsetX={[-10, 10]} // Adjust horizontal swipe sensitivity
            activeOffsetY={[-200, 200]} // Allow more vertical movement to pass through
          >
            <View style={styles.calendarWrapper}>
              <Calendar
                headerContainerStyle={{ backgroundColor: "white" }}
                calendarCellStyle={{ backgroundColor: "white" }}
                
               
                eventCellStyle={{
                  borderColor: "black",
                  borderWidth: 0.5,
                  backgroundColor: "grey",
                }}
                dayHeaderStyle={{ colo: "red" }}
                events={newEvents}
                onPressCell={handleCell}
                height={height}
                showAdjacentMonths={false}
                onPressEvent={(event) => {
                  setModalData(event);

                  setModalVisible(true);
                }}
                width={width}
                mode="month"
                swipeEnabled={false}
                date={month}
              />

              <EventModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                data={modalData}
              />
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarWrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});



export const fetchMonthEvents = async (
  setNext,
  setPrevious,
  obj,
  mode,
  setEvents,
  setLoading
) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const baseurl = `${process.env.BACKEND_URI}/api/events`;

    let request = `${baseurl}?mode=${mode}`;
    if (JSON.stringify(obj) !== "{}") {
      const { startDate, endDate } = obj;
      request = `${baseurl}?startDate=${startDate}&endDate=${endDate}&mode=${mode}`;
    }

    // Generate a cache key based on the request parameters
    const cacheKey = `events_${JSON.stringify(obj)}_${mode}`;

    // Check the cache first
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { next, previous, events } = JSON.parse(cachedData);
      setNext(next);
      setPrevious(previous);
      setEvents(doEventsStructuring(events));
    }

    // Fetch fresh data from the API
    const res = await fetch(request, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    const nextData = {
      startDate: data.next.startDate,
      endDate: data.next.endDate,
    };
    const prevData = {
      startDate: data.prev.startDate,
      endDate: data.prev.endDate,
    };
    const eventsData = doEventsStructuring(data.events);

    setNext(nextData);
    setPrevious(prevData);
    setEvents(eventsData);

    // Update the cache with fresh data
    await AsyncStorage.setItem(
      cacheKey,
      JSON.stringify({
        next: nextData,
        previous: prevData,
        events: data.events,
      })
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export function doEventsStructuring(events) {
  if (!events) return [];
  return events.map((key) => ({
    title: key.title,
    start: new Date(key.startDate * 1000),
    end: new Date(key.endDate * 1000),
    color: "grey",
    des: key.description,
  }));
}

export default MonthView;
