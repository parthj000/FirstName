import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import StackNavigator from "./Navigation";


import * as Font from "expo-font";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from auto-hiding

const fetchFonts = () => {
  return Font.loadAsync({
    "chunk-b": require("./assets/Fonts/chunkfive/ChunkBold.otf"),
    "chunk-r": require("./assets/Fonts/chunkfive/ChunkRegular.otf"),
    "glacial-r": require("./assets/Fonts/glacial/glacial-regular.otf"),
    "glacial-b": require("./assets/Fonts/glacial/glacial-bold.otf"),
    "glacial-i": require("./assets/Fonts/glacial/glacial-italic.otf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAndHideSplash = async () => {
      await fetchFonts();
      setFontLoaded(true);
      setTimeout(async() => {
        console.log("1 second is over");
        await SplashScreen.hideAsync();
      }, 500);
       // Hides the splash screen
    };

    loadFontsAndHideSplash();
  }, []);

  // if (!fontLoaded) {
  //   return null; // You can return a fallback UI if needed
  // }

  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
