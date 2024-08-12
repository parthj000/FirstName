import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const UpcomingPage = () => {
  return (
    <View style={styles.container}>
      <Icon name="calendar" size={100} color="#333" />
      <Text style={styles.header}>Coming soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
});

export default UpcomingPage;
