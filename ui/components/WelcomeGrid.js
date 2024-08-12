import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";

const WelcomeGrid = () => {
  const navigation = useNavigation();

  const handlePress = (props) => {
    navigation.navigate(`${props}`);
  };

  return (
    <>
      <View style={styles.gridContainer}>
        <View style={styles.firstRow}>
          <View style={styles.itemWrapper}>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handlePress("Activities")}
            >
              <View style={styles.item}>
                <Image
                  source={require("../assets/clock.png")}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.itemText}>Activity</Text>
          </View>

          <View style={styles.itemWrapper}>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handlePress("Calendar")}
            >
              <View style={styles.item}>
                <Image
                  source={require("../assets/calendar.png")}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.itemText}>Calendar</Text>
          </View>
        </View>

        <View style={styles.firstRow}>
          <View style={styles.itemWrapper}>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handlePress("Resources")}
            >
              <View style={styles.item}>
                <Image
                  source={require("../assets/books.png")}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.itemText}>Resources</Text>
          </View>

          <View style={styles.itemWrapper}>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handlePress("Progress")}
            >
              <View style={styles.item}>
                <Image
                  source={require("../assets/bars.png")}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.itemText}>Progress</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 40,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
    marginBottom: 10,
  },
  itemWrapper: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  item: {
    width: 250,
    height: 150,
    marginBottom: 5,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  itemText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontFamily: "glacial-b",
  },
});

export default WelcomeGrid;
