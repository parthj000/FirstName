import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import dayjs from "dayjs";

const EventModal = (props) => {
  const { modalVisible, setModalVisible ,data} = props;
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.85)",
          }}
        >
          <View
            style={{
              padding: 50,
              width: "90%",

              elevation: 5,
              borderRadius: 15,
              backgroundColor: "#E1E1E1",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row", paddingVertical: 4 }}>
              <Text style={{ fontWeight: "bold" }}>Start time:</Text>
              <Text> {dayjs(data.start).format("h:mm A")}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>End time:</Text>
              <Text> {dayjs(data.end).format("h:mm A")}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,

                // flexShrink: 1, // Ensures the View can shrink if needed
                flexWrap: "wrap", // Allows text to wrap within the available space
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Description:</Text>
              <Text
                style={{
                  flex: 1, // Allows the text to take up the remaining space
                  flexShrink: 1, // Ensures text can shrink within its container
                }}
              >
                {data.des}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                backgroundColor: "#C8D5E1",
                padding: 8,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EventModal;

const styles = StyleSheet.create({});
