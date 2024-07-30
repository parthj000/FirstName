import { Link, router, useRouter, useRouteParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-native-paper";

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function WelcomePage() {
  const route = useRouter();
  const [goal, setGoal] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Token, setToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [success, setSuccess] = useState(false);
  const [goalLoading, setGoalLoading] = useState("");
  // const [required, setRequired] = useState(false);

  const fetchGoal = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (token) {
        setToken(token);
        console.log(
          token + "this token in goal context -----------------------"
        );
        const res = await fetch(`${process.env.BACKEND_URI}/api/goals`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          data.goalText ? setGoal(data.goalText) : setGoal("set your goal");
          setName(data.username);
          setLoading(false);
          return;
        }
        console.log(data + "data herer ---------------------------");
        await AsyncStorage.removeItem("token");
        console.log(data);
        throw new Error("something went wrong");
      }
      throw new Error("user is not authorized");
    } catch (error) {
      if (error.message === "Network request failed") {
        console.log(error);
        setGoal("!Network error!");
        setLoading(false);
        return;
      }
      console.log(error);

      router.push("/login");
      Toast.show({
        type: "error",
        text1: "Oops,something went wrong",
        position: "top",
      });
    }
  };

  const handleSetGoal = async () => {
    try {
      console.log(newGoal);
      if (!newGoal) {
        return null;
      }

      setGoalLoading(true);
      console.log(Token);
      let res = await fetch(`${process.env.BACKEND_URI}/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({
          token: Token,
          goalText: newGoal,
        }),
      });

      const data = await res.json();
      console.log(data, "data of our goal handling");

      if (res.status === 201 || res.status === 200) {
        setGoal(newGoal);
        setModalVisible(false);
        setGoalLoading(false);
        Toast.show({
          type: "success",
          text1: "Goal has been set",
          position: "top",
        });
        setSuccess(true);
        return;
      } else {
        setGoalLoading(false);
        setModalVisible(false);
        return setSuccess(false);
      }
    } catch (error) {
      console.log("error on handleSetGoal", error);
      setGoalLoading(false);
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Cant set the goal, Retry !",
        position: "top",
      });
      return setSuccess(false);
    }
  };

  useEffect(() => {
    fetchGoal(setLoading);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
      {loading ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ backgroundColor: "#92A0AD" }}>
          <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
            <Toast />
          </View>

          <View
            style={{ justifyContent: "flex-end", marginRight: 25, marginTop: 30 }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                width: 60,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                padding: 5,
                borderColor: "black",
                borderWidth: 1,
              }}
              onPress={async () => {
                try {
                  console.log("pressed");
                  setLoading(true);
                  console.log(loading);
                  await AsyncStorage.removeItem("token").then(() => {
                    setLoading(false);
                    router.push("/login");
                  });

                  return;
                } catch (err) {
                  setLoading(false);
                  Toast.show({
                    type: "error",
                    text1: err.message,
                  });
                }
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.first}>
            <Text style={styles.Welcome}>
              Welcome{" "}
              <Text style={{ color: "black", fontWeight: "300" }}>Back,</Text>
            </Text>
            <Text style={styles.username}>{name} !</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <TextInput
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.usernameGoal}
                editable={false}
              >
                {goal}
              </TextInput>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              // marginLeft: 40,
              // width: "83%",
            }}
          >
            Goals for today
          </Text>

          <View style={styles.second}>
            <TouchableOpacity
              style={styles.Actvitiy}
              onPress={() => route.push("/activities")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/clock.png")}
              ></Image>
              <Text>Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Calender}
              onPress={() => route.push("/calendar")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/calendar.png")}
              ></Image>
              <Text>Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Resources}
              onPress={() => route.push("/resources")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/books.png")}
              ></Image>
              <Text>Resources</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Progress}
              onPress={() => route.push("/progress")}
            >
              <Image
                style={{ height: "80%", width: "100%" }}
                source={require("../assets/bars.png")}
              ></Image>
              <Text>Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        visible={modalVisible}
        onDismiss={() => {
          setSuccess(false);
          setModalVisible(false);
          return;
        }}
        contentContainerStyle={styles.modalView}
      >
        {goalLoading ? (
          <ActivityIndicator size="large" color={"black"} />
        ) : (
          <>
            <Text style={styles.modalText}>Set a Goal</Text>
            <View style={{ marginBottom: 20, width: "100%" }}>
              <TextInput
                style={styles.input}
                placeholder="Enter your goal"
                value={newGoal}
                onChangeText={setNewGoal}
              />
              {newGoal ? null : (
                <Text
                  style={{
                    fontStyle: "italic",
                    fontSize: 10,
                    color: "red",
                    paddingLeft: 10,
                  }}
                >
                  *required
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#C8D5E1",
                borderRadius: 5,
                color: "white",
                padding: 7,
              }}
              onPress={() => {
                handleSetGoal();
              }}
            >
              <Text
                onPress={() => {
                  handleSetGoal();
                }}
                style={{ color: "black", fontWeight: "bold" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bgimage: {
    position: "absolute",
    top: -210,
    left: 0,
    right: 0,
    bottom: 0,
    width: 500,
    height: 505,
    zIndex: -1,
  },
  first: {
    paddingLeft: 40,
  },

  Welcome: {
    fontWeight: "300",
    marginTop: "5%",
    fontSize: 40,
    color: "black",
  },
  username: {
    color: "black",
    fontSize: 27,
    fontWeight: "800",
  },

  usernameGoal: {
    marginTop: 35,
    marginBottom: 5,
    width: "83%",
    backgroundColor: "#E1E1E1",
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    height: 35,
    padding: 5,
    borderRadius: 25,
    elevation: 8,
  },

  Goal: {
    marginTop: 5,
    width: "83%",

    textAlign: "center",
    height: 35,
    padding: 5,
    borderRadius: 25,
  },

  second: {
    paddingTop: 60,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    paddingLeft: 40,
    paddingBottom: "100%",
  },

  Actvitiy: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#E1E1E1",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  Calender: {
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,

    elevation: 5,
    backgroundColor: "#E1E1E1",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  Resources: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#E1E1E1",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  Progress: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#E1E1E1",
    width: "40%",
    height: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  modalView: {
    backgroundColor: "#E1E1E1",
    padding: 20,
    margin: 45,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    aspectRatio: "1/1",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,

    paddingLeft: 10,
    borderRadius: 10,
  },
});
