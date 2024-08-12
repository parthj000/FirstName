import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarContext } from "./CalendarContext";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import dayjs from "dayjs";

const Header = () => {
  const {
    view,
    setView,
    currentDate,
    setCurrentDate,
    month,
    setMonth,
    selectedValue,
    setSelectedValue,
  } = useContext(CalendarContext);

  const data = [
    { label: "Daily", value: "day" },
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
  ];

  return (
    <>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          {view === "month" ? (
            <Text style={styles.dateText}>
              {`${dayjs(month).toDate().toDateString().split(" ")[1]}  ${
                dayjs(month).toDate().toDateString().split(" ")[3]
              }`}
            </Text>
          ) : null}
          {view === "week" ? (
            <Text style={styles.dateText}>
              {`${dayjs(currentDate).toDate().toDateString().split(" ")[1]}  ${
                dayjs(currentDate).toDate().toDateString().split(" ")[3]
              }`}
            </Text>
          ) : null}
          {view === "day" ? (
            <Text style={styles.dateText}>
              {`${dayjs(month).toDate().toDateString().split(" ")[1]}  ${
                dayjs(month).toDate().toDateString().split(" ")[3]
              }`}
            </Text>
          ) : null}

          <Dropdown
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            value={selectedValue}
            selectedTextStyle={{ fontWeight: "bold" }}
            iconColor="black"
            onChange={(item) => {
              setSelectedValue(item.value);
              setView(item.value); // Update the view based on the selected value
            }}
          />
        </View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: "#92A0AD",
  },
  dateText: {
    fontSize: 22,
    fontFamily:"glacial-r"
    // fontWeight:'300'
  },
  dropdown: {
    width: "30%",
    marginLeft: 10,
  },
});

export default Header;
