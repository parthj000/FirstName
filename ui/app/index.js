import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MyContext, MyContextProvider } from "../components/AppContext";
import Login from "./login";

import { MyContextProvider } from "../components/AppContext";

const App = () => {
  return (
    <>
      

      <MyContextProvider>
        <Login />
      </MyContextProvider>
    </>
  );
};

export default App;
styles = StyleSheet.create({});
