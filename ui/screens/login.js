// import { Link, router, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StatusBar,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoginButton from "../components/LoginButton";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const fetchToken = async (navigation) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      // router.push("/welcome");
      navigation.replace("WelcomePage");
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerr] = useState(null);
  const [pwderr, setPwderr] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchToken(navigation);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />

      <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
        <Toast />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* <Image source={require("../assets/in.jpg")} style={styles.image} /> */}
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",

              marginBottom: 16,
            }}
          >
            Login
          </Text>
          <View style={styles.errorContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(val) => {
                val ? setEmailerr(null) : setEmailerr("*required");
                setEmail(val);
              }}
            />
            {emailerr ? <Text style={styles.error}>{emailerr}</Text> : null}
          </View>

          <View style={styles.errorContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => {
                val ? setPwderr(null) : setPwderr("*required");

                setPassword(val);
              }}
            />
            {pwderr ? <Text style={styles.error}>{pwderr}</Text> : null}
          </View>

          <LoginButton
            email={email}
            password={password}
            emailerr={emailerr}
            pwderr={pwderr}
            setEmailerr={setEmailerr}
            setPwderr={setPwderr}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={styles.optionText}>Don't have an account </Text>
            <TouchableOpacity
              style={{ alignItems: "bottom" }}
              onPress={() => navigation.replace("SignUpPage")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#92A0AD",
    gap: 12,
  },
  input: {
    height: 40,
    // borderColor: "black",
    // borderWidth: 1,

    // fontWeight: "bold",
    elevation: 5,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 9,
    width: "100%",
  },
  signInButton: {
    color: "white",
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 12,
    marginTop: 15,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 14,
    color: "rgb(80 84 89)",
  },
  image: {
    width: "119%",
    height: 300,
    marginBottom: 20,
    aspectRatio: "1/1",
  },
  errorContainer: {
    width: "100%",
    // paddingHorizontal: 10,
    margin: 0,
  },
  error: {
    color: "black",
    fontSize: 12,
    fontStyle: "italic",
    paddingHorizontal: 10,
  },
});
