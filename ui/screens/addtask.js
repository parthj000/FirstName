import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Divider from "../components/Divder";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddTask = () => {
  const navigation = useNavigation();



  const data = [
    { label: "Don't repeat", value: "N" },
    { label: "Daily", value: "D" },
    { label: "Weekly", value: "W" },
    { label: "Monthly", value: "M" },
  ];

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 30 * 60 * 1000));
  const [selectedValue, setSelectedValue] = useState("N");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [loading, setLoading] = useState(false);

  const hadleRespone = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const request = await fetch(`${process.env.BACKEND_URI}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
          startDate: startTime.valueOf(),
          endDate: endTime.valueOf(),
          title: firstInput,
          description: secondInput,
          recurrence: selectedValue,
          category: "T",
        }),
      });
      const res = await request.json();
      if (request.status === 201) {
        Toast.show({
          type: "success",
          text1: "Event created succesfully!",
        });
        setTimeout(() => {
         
         navigation.navigate({
           name: "Calendar",
           params: { refresh: true },
           merge: true,
         });

        }, 1000);

        return;
      }

      Toast.show({
        type: "error",
        text1: res.message,
      });
      setLoading(false);
      return;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Event not created!",
      });
      setLoading(false);
    }
  };

  const onChange = () => {
    setShowStartDatePicker(Platform.OS === "ios");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
      <View style={{ position: "relative", zIndex: 5 }}>
        <Toast />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View>{/* <Text style={styles.header}>Add Event</Text> */}</View>

          <View style={styles.second}>
            <TextInput
              placeholder="Add Title"
              style={styles.title}
              value={firstInput}
              onChangeText={setFirstInput}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <TextInput
              placeholder="Add Description"
              style={styles.description}
              multiline={true}
              value={secondInput}
              onChangeText={setSecondInput}
            />
          </View>

          {/* thia ua imoi */}

          <View style={styles.second}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.input}>Select Date:</Text>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  if (Platform.OS === "ios") {
                    setShowStartTimePicker(false);
                    setShowEndTimePicker(false);
                  }

                  showStartDatePicker
                    ? setShowStartDatePicker(false)
                    : setShowStartDatePicker(true);
                }}
                style={styles.date}
              >
                <Text style={showStartDatePicker ? { color: "red" } : null}>
                  {date.toDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            {showStartDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(event, val) => {
                  if (Platform.OS === "android") {
                    setShowStartDatePicker(false);
                  }
                  console.log(val, "thuasbdhsb");
                  setStartTime(val);
                  setEndTime(val);
                  setDate(val);
                  console.log("sdjnsjd");
                  console.log(endTime + "sdkj" + startTime);
                }}
              />
            )}

            <Divider height={0.5} color={"grey"} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.input}>Select Time:</Text>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    gap: 25,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      if (Platform.OS === "ios") {
                        if (showEndTimePicker) {
                          setShowEndTimePicker(!showEndTimePicker);
                        }

                        setShowStartDatePicker(false);
                      }

                      showStartTimePicker
                        ? setShowStartTimePicker(false)
                        : setShowStartTimePicker(true);
                    }}
                    style={styles.date}
                  >
                    <Text style={showStartTimePicker ? { color: "red" } : null}>
                      {Platform.OS === "ios"
                        ? startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      if (Platform.OS === "ios") {
                        if (showStartTimePicker) {
                          setShowStartTimePicker(!showStartTimePicker);
                        }
                        setShowStartDatePicker(false);
                      }

                      showEndTimePicker
                        ? setShowEndTimePicker(false)
                        : setShowEndTimePicker(true);
                    }}
                    style={styles.date}
                  >
                    <Text style={showEndTimePicker ? { color: "red" } : null}>
                      {Platform.OS === "ios"
                        ? endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {showStartTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(event, val) => {
                  if (Platform.OS === "android") {
                    setShowStartTimePicker(false);
                  }

                  setStartTime(val);
                  console.log(val.valueOf());
                }}
              />
            )}

            {showEndTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(event, val) => {
                  if (Platform.OS === "android") {
                    setShowEndTimePicker(false);
                  }

                  setEndTime(val);
                  console.log(val.valueOf());
                }}
              />
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
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                backgroundColor: "#C8D5E1",
                padding: 8,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
            {loading ? (
              <ActivityIndicator color="black" size={"small"} />
            ) : (
              <TouchableOpacity
                onPress={hadleRespone}
                style={{
                  backgroundColor: "#C8D5E1",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Add </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default AddTask;

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
    rowGap: 30,
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
    paddingHorizontal: 2,
    paddingVertical: 5,
    fontSize: 15,
  },
  description: {
    borderBottomColor: "grey",
    paddingHorizontal: 2,
    // paddingVertical: 5,
    // fontFamily:"glacial-r",
    fontSize: 15,
  },
  second: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "white",
    gap: 7,
    borderRadius: 5,
  },
  date: {
    backgroundColor: "#EEEEEE",
    // marginLeft: 25,
    padding: 10,
    borderRadius: 3,
    alignSelf: "flex-end",
  },
  dropdown: {
    width: "40%",
    justifyContent: "space-around",
    alignSelf: "flex-end",
  },
  input: {
    fontSize: 16,
    color: "black",
  },
  label: {
    fontSize: 16,
    color: "black",
  },
});
