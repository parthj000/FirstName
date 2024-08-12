import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useDebugValue, useEffect, useState } from "react";
import Header from "./TopHeader";
import ActivitiesModal from "../components/ActivitiesModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Activities = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getActivities(setActivities, setLoading);
  }, []);

  return (
    <>
      <>
        <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
          <Toast />
        </View>
        <View style={styles.container}>
          {/* <Header /> */}

          <View style={styles.content}>
            <Text style={styles.Header}>Activity Log</Text>

            {loading ? (
              <View
                style={{
                  flex: 1,
                  marginTop: "20%",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={"black"} />
              </View>
            ) : (
              <>
                <View>
                  {activities &&
                    activities.map((item, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            console.log(item);
                            setModalVisible(true);
                            setActivity(item);
                          }}
                          style={styles.activityList}
                        >
                          <Text style={styles.title}>{item.display_name}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>

                <ActivitiesModal
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                  activity={activity}
                  setActivities={setActivity}
                />
              </>
            )}
          </View>
        </View>
      </>
    </>
  );
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "#92A0AD",
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent:"center",
    paddingTop: "30%",
    
  },
  activityList: {
    backgroundColor: "#C8D5E1",
    paddingVertical: 15,
    paddingHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 40,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    
    fontFamily:"glacial-b"
  },
  Header: {
    fontSize: 40,
    fontFamily:"glacial-b",
    paddingBottom: 20,
  },
});

// functions

const getActivities = async (setActivities, setLoading) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(`${process.env.BACKEND_URI}/api/activities`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    setActivities(data.activities);
    setLoading(false);
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Something went wrong",
    });
    setLoading(false);
  }
};
