import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Divder from "./Divder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ActivitiesModal = (props) => {
  const { modalVisible, setModalVisible, activity, setActivity } = props;

  const [showPicker, setShowPicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const [activities, setActivities] = useState([]);
  const [dataSend, setDataSend] = useState({
    date: new Date(),
  });
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* modals */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.8)",
            }}
          >
            <Toast />
            <View
              style={{
                paddingVertical: 50,
                paddingHorizontal: 30,
                minWidth: "90%",

                elevation: 5,
                borderRadius: 15,
                backgroundColor: "#E1E1E1",
              }}
            >
              {loading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={"black"} />
                </View>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 35,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: 40,
                    }}
                  >
                    {activity.display_name}
                  </Text>

                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 15,
                      // elevation: 5,
                    }}
                  >
                    <View>
                      <SelectDate
                        setDataSend={setDataSend}
                        dataSend={dataSend}
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                        setShowStartDatePicker={setShowStartDatePicker}
                        showStartDatePicker={showStartDatePicker}
                      />
                    </View>

                    <Divder color="grey" height={0.5} />

                    {activity.slug === "E" || activity.slug === "M" ? (
                      <DropDownComponent
                        datas={activity.subtypes}
                        setDataSend={setDataSend}
                        dataSend={dataSend}
                      />
                    ) : null}

                    {activity.slug === "PA" ? (
                      <TextComp setDataSend={setDataSend} dataSend={dataSend} />
                    ) : null}

                    <TimeComp
                      dropdownData={activity.subtypes}
                      dataSend={dataSend}
                      setDataSend={setDataSend}
                      showPicker={showPicker}
                      setShowPicker={setShowPicker}
                      setShowStartDatePicker={setShowStartDatePicker}
                      showStartDatePicker={showStartDatePicker}
                    />
                  </View>

                  {/* buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setShowStartDatePicker(false);
                        setShowPicker(false);
                        setModalVisible(false);
                        setDataSend({
                          date: new Date(),
                        });
                      }}
                    >
                      <Text>cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        postactivites(
                          dataSend,
                          setLoading,
                          activity.id,
                          setModalVisible
                        );

                        setShowStartDatePicker(false);
                        setShowPicker(false);

                        setDataSend({
                          date: new Date(),
                        });
                      }}
                    >
                      <Text>Save</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const TimeComp = (props) => {
  const {
    dropdownData,
    dataSend,
    setDataSend,
    showPicker,
    setShowPicker,
    showStartDatePicker,
    setShowStartDatePicker,
  } = props;
  // const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState("00:00");
  const [date, setDate] = useState(new Date());

  return (
    <>
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <View style={excStyle.time}>
          <Text style={excStyle.selectTime}>Select Time</Text>
          <TouchableOpacity
            onPress={() => {
              setShowStartDatePicker(false);
              showPicker ? setShowPicker(false) : setShowPicker(true);
            }}
          >
            <Text
              style={[
                excStyle.timeText,
                showPicker && Platform.OS === "ios"
                  ? { color: "red" }
                  : { color: "black" },
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        </View>
        {showPicker && (
          <>
            <DateTimePicker
              value={date}
              mode="time"
              // style={{ width: "100%" }}
              is24Hour={true}
              display="spinner"
              onChange={(event, time) => {
                if (Platform.OS === "android") {
                  setShowPicker(false);
                }
                setDate(time);

                let hours = time.getHours().toString().padStart(2, "0");
                let minutes = time.getMinutes().toString().padStart(2, "0");

                setTime(`${hours}:${minutes}`);
                setDataSend({
                  ...dataSend,
                  duration: parseInt(hours) * 60 * 60 + parseInt(minutes) * 60,
                });
              }}
            />
          </>
        )}
      </View>
    </>
  );
};

const SelectDate = (props) => {
  const [date, setDate] = useState(new Date());
  const {
    dataSend,
    setDataSend,
    showPicker,
    setShowPicker,
    showStartDatePicker,
    setShowStartDatePicker,
  } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 15 }}>Select Date:</Text>
        <TouchableOpacity
          onPress={() => {
            setShowPicker(false);
            showStartDatePicker
              ? setShowStartDatePicker(false)
              : setShowStartDatePicker(true);
          }}
          style={{
            backgroundColor: "#EEEEEE",
            borderRadius: 3,
            alignSelf: "flex-end",
            padding: 7,
          }}
        >
          <Text style={showStartDatePicker&&Platform.OS ==="ios" ? { color: "red" } : null}>
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
            setShowStartDatePicker(false);
            if (Platform.OS === "ios") {
              setShowStartDatePicker(true);
            }

            setDate(val);

            if (event.type === "set") {
              setDataSend({ ...dataSend, date: val });
            }
          }}
        />
      )}
    </>
  );
};

const DropDownComponent = (props) => {
  const { datas, styles, dataSend, setDataSend } = props;
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <View style={{ padding: 4, marginVertical: 10 }}>
        <Dropdown
          style={styles}
          data={datas}
          selectedTextStyle={{ fontSize: 15 }}
          labelField="display_name"
          valueField="id"
          placeholder="Select your routine"
          value={selectedValue}
          onChange={(item) => {
            setSelectedValue(item.value);
            setDataSend({
              ...dataSend,
              activity_sub_type_id: item.id,
            });
          }}
        />
      </View>
      <Divder height={0.5} color={"grey"} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#C8D5E1",
    elevation: 4,
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
});

const excStyle = StyleSheet.create({
  time: {
    width: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    // marginTop: 6,
    alignItems: "center",
  },
  timeText: {
    backgroundColor: "#EEEEEE",
    alignSelf: "center",
    padding: 7,
    borderRadius: 4,

    fontSize: 15,
    marginVertical: 10,
  },
  dropDown: {
    marginVertical: 10,
  },
  selectTime: {
    fontSize: 15,
    marginVertical: 10,
  },
});

const affirmations = [
  "I am worthy of reaching my goals",
  "I am confident in my abilities and skills",
  "I am a magnet for success and opportunities",
  "I am enough",
  "I am grateful for another day of life",
  "I am deserving of love and happiness",
  "I am strong, brave, and resilient",
  "I am capable of making healthy choices",
  "I am love. I am purpose",
  "I am in charge of my life",
];

const TextComp = (props) => {
  const { setDataSend, dataSend } = props;
  const [dropdownValue, setDropdownValue] = useState(null);
  const [showTextInput, setShowTextInput] = useState(false);

  const data = affirmations.map((affirmation, index) => ({
    label: affirmation,
    value: index.toString(),
  }));

  const handleDropdownChange = (item) => {
    setDropdownValue(item.value);
    if (item.value === "input") {
      setShowTextInput(true);
    } else {
      setShowTextInput(false);
    }
  };

  return (
    <>
      <View style={{ paddingVertical: 15 }}>
        <Dropdown
          style={{}}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select affirmation"
          value={dropdownValue}
          onChange={handleDropdownChange}
          containerStyle={{ height: "45%", borderRadius: 5 }}
          itemContainerStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: "grey",
            marginHorizontal: 8,
          }}
        />

        {showTextInput && <TextInput style={{}} placeholder="Add title" />}
      </View>
      <Divder height={0.5} color={"grey"} />
    </>
  );
};

async function postactivites(dataSend, setLoading, id, setModalVisible) {
  try {
    const obj = {
      ...dataSend,
      activity_type_id: id,
    };
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    const res = await fetch(
      `${process.env.BACKEND_URI}/api/activities/activity_log`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(obj),
      }
    );

    const data = await res.json();
    console.log(data, "this is the dataatatata-----------");
    if (res.ok) {
      Toast.show({
        type: "success",
        text1: "Activity set successfully",
      });

      setTimeout(() => {
        setModalVisible(false);
        setLoading(false);
      }, 700);

      return;
    } else {
      Toast.show({
        type: "error",
        text1: data.message,
      });
      setLoading(false);

      return;
    }
  } catch (error) {
    Toast.show({
      type: "success",
      text1: error.message,
    });
    setLoading(false);
  }
}

export default ActivitiesModal;
