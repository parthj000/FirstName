// import { Link, router, useRouter, useRouteParams } from "expo-router";
import React, { useEffect, useState } from "react";


import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { useNavigation, CommonActions } from "@react-navigation/native";
import WelcomeGrid from "../components/WelcomeGrid";
import ConfirmPassword from "../components/ConfirmPassword";
import { Ionicons } from "@expo/vector-icons";


export default function WelcomePage() {
  // const route = useRouter();
  const [goal, setGoal] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Token, setToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [success, setSuccess] = useState(false);
  const [goalLoading, setGoalLoading] = useState("");
  const [confirm, setConfirm] = useState(null);

  const navigation = useNavigation();

  const fetchGoal = async () => {
    try {
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

  const handleLogout = async () => {
    try {
      console.log("pressed");
      setLoading(true);
      console.log(loading);

      await AsyncStorage.multiRemove(["token", "confirm"]).then(() => {
        setLoading(false);
        navigation.replace("Login");
      });

      return;
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: err.message,
      });
    }
  };

  const getConfirmStatus = async () => {
    console.log("loaded first");
    try {
      const confirmStore = await AsyncStorage.getItem("confirm");
      if (!confirmStore) {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          `${process.env.BACKEND_URI}/api/confirm-password`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        // if (!res.ok) {
        //   throw new Error(`HTTP error! Status: ${res.status}`);
        // }

        const data = await res.json();

        console.log(data.confirm, "this is just before setting data");
        await AsyncStorage.setItem("confirm", data.confirm);
        setConfirm(data.confirm);
        console.log("[[[[[[[[[[[[[[[[[[[[[[[[=======================");
        return;
      }

      setConfirm(confirmStore);

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const finale = async () => {
    try {
      await getConfirmStatus();
      await fetchGoal();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Something really went wrong !",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    finale();
  }, []);
  

  if (confirm && confirm !== "true") {
    return (
      <>
        <ConfirmPassword navigation={navigation} />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
      <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
        <Toast />
      </View>
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
        <View style={{ backgroundColor: "#92A0AD", flex: 1, paddingTop: 50 }}>
          <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
            <Toast />
          </View>

          <View
            style={
              Platform.OS === "ios"
                ? {
                    justifyContent: "flex-end",
                    marginRight: 25,
                    marginTop: 20,
                  }
                : {
                    justifyContent: "flex-end",
                    marginRight: 25,
                  }
            }
          >
            <TouchableOpacity
              style={logoutStyles.button}
              onPress={() => {
                handleLogout();
              }}
            >
              <Text style={logoutStyles.text}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.first}>
            <Text style={styles.Welcome}>
              Welcome{" "}
              <Text style={{ color: "black", fontWeight: "300" }}>back,</Text>
            </Text>
            <Text style={styles.username}>{name}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.usernameGoal}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* Empty View to balance the icon on the right */}
                <View style={{ width: 18 }} />
                
                <Text
                  style={{
                    fontFamily: "glacial-r",
                    fontSize: 16,
                    textAlign: "center",
                    flex: 1, // Takes up the remaining space
                  }}
                >
                  {goal}
                </Text>
                <Ionicons
                  name="create-outline"
                  style={{ fontSize: 18 }}
                  color="#000"
                />
              </View>
            </TouchableOpacity>

            <Text
              style={{
                textAlign: "center",
                paddingHorizontal: 30,
                fontFamily: "glacial-b",
                fontSize: 16,
              }}
            >
              Goals for today
            </Text>

            <WelcomeGrid />
          </View>
        </View>
      )}

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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {goalLoading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color={"black"} />
                </View>
              ) : (
                <>
                  <Text style={styles.modalTitle}>Set a Goal</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your goal"
                      selectionColor={"grey"}
                      value={newGoal}
                      onChangeText={setNewGoal}
                    />
                    {newGoal ? null : (
                      <Text style={styles.errorText}>*required</Text>
                    )}
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setModalVisible(false);
                        // setNewGoal("");
                      }}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        handleSetGoal();
                      }}
                    >
                      <Text style={styles.buttonText}>Save</Text>
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
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    minWidth: "90%",

    elevation: 5,
    borderRadius: 15,
    backgroundColor: "#E1E1E1",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 35,

    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    padding: 15,
    elevation: 5,
  },
  errorText: {
    fontStyle: "italic",
    fontSize: 10,
    color: "red",
    paddingLeft: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#C8D5E1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  first: {
    paddingHorizontal: 40, // backgroundColor: "black",
  },

  Welcome: {
    marginTop: "5%",
    fontSize: 36,
    letterSpacing: Platform.OS === "ios" ? 2.5 : 1.5,
    fontFamily: "glacial-b",
    color: "black",
  },
  username: {
    color: "black",
    fontSize: Platform.OS === "ios" ? 40 : 35,
    fontFamily: "chunk-b",
    textTransform: "capitalize",
  },

  usernameGoal: {
    marginTop: 40,
    marginBottom:5 ,
    paddingVertical: 7,
    paddingHorizontal:10,
    borderRadius:10,

    width: "100%",
    backgroundColor: "#E1E1E1",
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },

  Goal: {
    marginTop: 5,
    width: "83%",

    textAlign: "center",
    height: 35,
    padding: 5,
    borderRadius: 25,
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

    backgroundColor: "white",

    paddingLeft: 10,
    borderRadius: 10,
  },
  containText: {
    fontFamily: "glass",
  },
});

const logoutStyles = StyleSheet.create({
  button: {
    backgroundColor: "#C8D5E1",
    padding: 8,
    borderRadius: 5,

    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    
  },
});
