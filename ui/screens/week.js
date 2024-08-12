import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Calendar } from "react-native-big-calendar";
import dayjs from "dayjs";
import { fetchMonthEvents } from "../components/MonthView";
import { CalendarContext } from "../components/CalendarContext";

const { width, height } = Dimensions.get("window");

const CustomWeeklyComponent = () => {
  const {
    setCurrentDate,
    currentDate,
    previousweek,
    setPreviousweek,
    nextweek,
    setNextweek,
    weekEvents,
    setWeekEvents,
  } = useContext(CalendarContext);
  // const [currentDate, setCurrentDate] = useState(dayjs().toDate());

  // const [previousweek, setPreviousweek] = useState({});
  // const [nextweek, setNextweek] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (JSON.stringify(nextweek) === "{}") {
      fetchMonthEvents(
        setNextweek,
        setPreviousweek,
        {},
        "W",
        setWeekEvents,
        setLoading
      );
    }

    console.log("hiiiii this is week");
  }, []);

  const onSwipeLeft = (nextweek) => {
    console.log("Swiped Left");
    fetchMonthEvents(
      setNextweek,
      setPreviousweek,
      nextweek,
      "W",
      setWeekEvents,
      setLoading
    );
    setCurrentDate(dayjs(currentDate).add(1, "week").toDate());
  };

  const onSwipeRight = (previousweek) => {
    console.log("Swiped Right");
    fetchMonthEvents(
      setNextweek,
      setPreviousweek,
      previousweek,
      "W",
      setWeekEvents,
      setLoading
    );

    setCurrentDate(dayjs(currentDate).subtract(1, "week").toDate());
  };

  const handleGesture = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        const { translationX, translationY } = nativeEvent;
        if (
          Math.abs(translationX) > Math.abs(translationY) &&
          Math.abs(translationX) > 30
        ) {
          if (translationX < 0) {
            onSwipeLeft(nextweek);
          } else if (translationX > 0) {
            onSwipeRight(previousweek);
          }
        }
      }
    },
    [currentDate, previousweek, nextweek]
  );

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          {console.log({ nextweek })}
          {console.log({ previousweek })}
          {console.log(weekEvents)}
          <View style={styles.container}>
            <PanGestureHandler
              onGestureEvent={handleGesture}
              onHandlerStateChange={handleGesture}
              activeOffsetX={[-10, 10]} // Recognize horizontal swipes
              activeOffsetY={[-20, 20]} // Allow vertical scrolling to pass through
            >
              <View style={{ flex: 1 }}>
                <Calendar
                  events={weekEvents}
                  weekDayHeaderHighlightColor="#92A0AD"
                  dayHeaderStyle={{ backgroundColor: "white" }}
                  dayHeaderHighlightColor="#92A0AD"
                  height={height}
                  width={width}
                  mode="week"
                  swipeEnabled={true}
                  date={currentDate}
                />
              </View>
            </PanGestureHandler>
          </View>
        </GestureHandlerRootView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomWeeklyComponent;

const getWeekNumberInMonth = (date) => {
  // Start of the month
  const startOfMonth = dayjs(date).startOf("month");
  // Current date
  const currentDate = dayjs(date);

  // Calculate the week number
  const weekNumber = Math.ceil((currentDate.date() + startOfMonth.day()) / 7);

  return weekNumber;
};
