import { StyleSheet, Text, View, Modal, TouchableOpacity,ActivityIndicator } from "react-native";
import React, { useState } from "react";
import dayjs from "dayjs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

 

async function handleDelete(props){
    const { data,setLoading ,setModalVisible} = props;

    setLoading(true);
   const id = data.id
    console.log(data.id,"delete option is clicked==================================")
  try{
    const res = await fetch(`${process.env.BACKEND_URI}/api/events?id=${id}`,{
        method:"DELETE",
        headers:{
            "authorization":`Bearer ${await AsyncStorage.getItem("token")}`
        }
    });
    const data= await res.json();
    console.log(data);

    if(res.status===200){
      
      setModalVisible(false);
      Toast.show({
        type: "success",
        text1: `${data.message},refresh the page!`,
      });

    }

    else{
       Toast.show({
         type: "error",
         text1: data.message,
       });
    }

    

    
    setLoading(false);


}
  catch(err){
    console.log(err)
    Toast.show({
      type: "error",
      text1: data.message,
    });
    setLoading(false);

  }

}




const EventModal = (props) => {
  const { modalVisible, setModalVisible ,data} = props;
  const [loading,setLoading] = useState();
  const navigation = useNavigation();
 
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
          <Toast />
          <View
            style={{
              padding: 50,
              width: "90%",

              elevation: 5,
              borderRadius: 15,
              backgroundColor: "#E1E1E1",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color={"black"} />
            ) : (
              <>
                {/* edit and delete component  */}

                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      navigation.push("Update",{
                        event:JSON.stringify(data)
                      });
                    }}
                  >
                    <Ionicons name="pencil" size={25} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => handleDelete({ data, setLoading,setModalVisible })}
                  >
                    <Ionicons name="trash" size={25} color="black" />
                  </TouchableOpacity>
                </View>

                {/* this is othr component  */}

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
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EventModal;

const styles = StyleSheet.create({});
