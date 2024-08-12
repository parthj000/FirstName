import React, { useState } from "react";
import { View, StyleSheet, Alert, Modal, ImageBackground } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "@react-navigation/native";

const FloatButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const actions = [
    {
      text: "Add Event",
      textBackground: "#E1E1E1",
      icon: require("../assets/calendar-check.png"),
      name: "add_event",
      position: 1,
      color: "#92A0AD",
    },
    {
      text: "Add Task",
      textBackground: "#E1E1E1",
      icon: require("../assets/clipboard.png"),
      name: "add_task",
      position: 2,
      color: "#92A0AD",
    },
  ];

  const [events, setEvents] = useState([]);

  const handlePress = (name) => {
    if (name === "add_event") {
      navigation.push("AddEvent");
      // router.push("add");
    } else if (name === "add_task") {
      navigation.push("AddTask");
      // Handle add task action
      // Alert.alert('Add Task', 'Task button pressed');
      // router.push("addtask");
    }
  };

  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <View style={styles.container}>
      <FloatingAction
        actions={actions}
        color="#92A0AD"
        onPressItem={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FloatButton;
