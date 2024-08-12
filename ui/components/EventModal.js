import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";

const EventModal = (props) => {
  const { modalVisible, setModalVisible } = props;
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              padding: 50,
              minWidth: "90%",
              height: "60%",
              elevation: 5,
              borderRadius: 15,
              backgroundColor: "#E1E1E1",
            }}
          >
            <Text>Hello i am here</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EventModal;

const styles = StyleSheet.create({});
