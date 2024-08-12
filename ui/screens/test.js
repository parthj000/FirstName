import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-big-calendar';
import dayjs from 'dayjs';

const { width, height } = Dimensions.get('window');

const MyCalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());

  const onSwipeLeft = () => {
    console.log('Swiped Left');
    setCurrentDate(dayjs(currentDate).add(1, 'month').toDate());
  };

  const onSwipeRight = () => {
    console.log('Swiped Right');
    setCurrentDate(dayjs(currentDate).subtract(1, 'month').toDate());
  };

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { translationX } = nativeEvent;
      if (translationX < 0) {
        onSwipeLeft();
      } else if (translationX > 0) {
        onSwipeRight();
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Calendar
          events={[]} // Add your events here
          height={height}
          width={width}
          mode="month"
          date={currentDate}
        />
        <View style={styles.overlayContainer}>
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <View style={styles.leftHalf}></View>
          </PanGestureHandler>
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <View style={styles.rightHalf}></View>
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  leftHalf: {
    width: width / 2,
    height: '100%',
    backgroundColor: 'transparent',
  },
  rightHalf: {
    width: width / 2,
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default MyCalendarComponent;
