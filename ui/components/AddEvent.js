import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Divder from "./Divder";
import { Dropdown } from "react-native-element-dropdown";



const AddEvent = () => {
  const data = [
    { label: "No Repeat", value: "no_repeat" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const [date, setDate] = useState(new Date());

  const dateString = date.toDateString();
  const formattedDate = dateString.split(" ").slice(1).join(" ");
  const [selectedValue, setSelectedValue] = useState("no_repeat");
  console.log(date);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Add Event </Text>
        </View>

        <View style={styles.second}>
          <TextInput placeholder="Add title" style={styles.title} />
          <TextInput
            placeholder="Add Description"
            style={styles.description}
            multiline={true}
          />
        </View>

        <View style={styles.second}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.input}>Select Date:</Text>
            {/* DAte start Here */}
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              style={styles.date}
            >
              <Text>{formattedDate} </Text>
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                setShowStartDatePicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          <Divder height={0.5} color={"grey"} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.input}>Select Time:</Text>

            {/* StartTime StartHere */}

            <TouchableOpacity
              onPress={() => setShowStartTimePicker(true)}
              style={styles.date}
            >
              <Text>{formattedDate} </Text>
            </TouchableOpacity>

            {showStartTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="spinner"
                onChange={(event, date) => {
                  setShowStartTimePicker(false);
                  if (date) setStartDate(date);
                }}
              />
            )}

            {/* EndTime StartHere */}
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.date}
            >
              <Text>{formattedDate} </Text>
            </TouchableOpacity>
          </View>
          {showEndTimePicker && (
            <DateTimePicker value={date} mode="time" display="spinner" />
          )}
        </View>

        <View style={styles.second}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Repeat</Text>
            <Dropdown
              style={styles.dropdown}
              data={data}
              labelField="label"
              valueField="value"
              value={selectedValue}
              onChange={(item) => {
                setSelectedValue(item.value);
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "#EEEE", padding: 8, borderRadius: 5 }}
          >
            <Text style={{ fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "#EEEE", padding: 8, borderRadius: 5 }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  lastButton: {
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    color: "black",
  },
  container: {
    paddingHorizontal: "5%",
    backgroundColor: "#92A0AD",
    height: "100%",
    width: "100%",
    flex: 1,
    rowGap: 25,
  },
  header: {
    marginTop: "5%",
    fontSize: 20,
    color: "black",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    padding: 2,
  },

  description: {
    borderBottomColor: "grey",
    // borderBottomWidth:0.5,
    padding: 2,
  },
  second: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "white",
    gap: 7,
    borderRadius: 5,
  },

  date: {
    backgroundColor: "#EEEEEE",
    marginLeft: 25,
    padding: 4,
    borderRadius: 3,
    alignSelf: "flex-end",
  },
  dropdown: {
    width: "35%",
    justifyContent: "space-around",
    alignSelf: "flex-end",
  },
});
