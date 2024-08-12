// import React, { useContext, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import { Divider } from "react-native-paper";
// import { CalendarContext } from "./CalendarContext";

// const MockData = [
//   {
//     id: 1,
//     name: "event1",
//     date: "15.0.3",
//     color: "pink",
//   },
//   {
//     id: 2,
//     name: "event2",
//     date: "15.0.3",
//     color: "yellow",
//   },
//   {
//     id: 3,
//     name: "event3",
//     color: "cyan",
//   },
//   {
//     id: 4,
//     name: "event4",
//     color: "pink",
//   },
//   {
//     id: 5,
//     name: "event5",
//     color: "cyan",
//   },
//   {
//     id: 6,
//     name: "event6",
//     color: "lightgray",
//   },
//   {
//     id: 7,
//     name: "event7",
//     color: "yellow",
//   },
//   {
//     id: 8,
//     name: "event8",
//     color: "lightgray",
//   },
//   {
//     id: 9,
//     name: "event9",
//     color: "cyan",
//   },
//   {
//     id: 10,
//     name: "event10",
//     color: "yellow",
//   },
//   {
//     id: 11,
//     name: "event11",
//     color: "pink",
//   },
// ];
// const colors = [
//   ["green", "black"],
//   ["yellow", "black"],
//   ["blue", "black"],
//   ["red", "white"],
// ];

// const TaskComponent = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const { currentDate } = useContext(CalendarContext);

//   // Function to handle item click
//   const handleItemClick = (item) => {
//     setSelectedItem(item); // Set selected item
//     setModalVisible(true); // Open modal
//   };

//   console.log(currentDate +"task");

//   // Render items function
//   const renderItems = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleItemClick(item)}
//       style={{
//         padding: 20,
//         backgroundColor: item.color,
//         borderWidth: 0,

//         borderRadius: 10,
//         marginVertical: 4,
//         marginHorizontal: 15,
//         elevation: 5,
//       }}
//     >
//       <View style={{ flexDirection: "row", gap: 5 }}>
//         <View>
//           <Text style={styles.date}>{currentDate.split("-")[2]}</Text>
//           <Text>{new Date(currentDate).toDateString().split(" ")[1]}</Text>
//         </View>

//         <Text style={{ fontStyle: "italic" }}>
//           {item.name} of {new Date(currentDate).toDateString()}{" "}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const ModalComponent = () => {
//     return (
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             {/* Display selected item data */}
//             {selectedItem && (
//               <View>
//                 <Text style={styles.modalText}>
//                   Event Name: {selectedItem.name}
//                 </Text>
//                 {selectedItem.date && (
//                   <Text style={styles.modalText}>
//                     Event Date: {selectedItem.date}
//                   </Text>
//                 )}
//                 <Divider />
//                 <TouchableOpacity onPress={() => setModalVisible(false)}>
//                   <Text style={styles.closeButton}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={MockData}
//         renderItem={renderItems}
//         keyExtractor={(item) => item.id.toString()}
//       />

//       <ModalComponent />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E1E1E1",
//     paddingVertical: 5,
//   },
//   date: {
//     fontSize: 20,
//     fontWeight: "bold",
//     padding: 7,

//     borderRightColor: "gray",
//     borderRightWidth: 0.5,
//   },
//   event: {
//     padding: 20,

//     borderWidth: 0,
//     borderStyle: "dashed",
//     borderRadius: 6,
//     marginVertical: 5,
//     marginHorizontal: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalText: {
//     color: "black",
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   closeButton: {
//     color: "blue",
//     marginTop: 20,
//     textAlign: "center",
//   },
// });

// function getRandomElement(array) {
//   const randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }

// export default TaskComponent;
