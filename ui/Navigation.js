import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import WelcomePage from "./screens/welcome";
import Login from "./screens/login";
import MyCalendar from "./screens/calendar";
import Activities from "./screens/activities";
import Progress from "./screens/progress";
import Resources from "./screens/resources";
import SignUpPage from "./screens/signup";
import AddEvent from "./screens/add";
import AddTask from "./screens/addtask";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: "black",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: "#92A0AD",
            

          },
          headerTitleStyle: {
            alignSelf: "center",
            fontSize: 20,
            fontFamily:"glacial-b"
          },
          headerTitleAlign:"center",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={MyCalendar}
          options={{ headerBackTitle: "Home",  }}
        />
        <Stack.Screen
          name="Activities"
          component={Activities}
          options={{ headerBackTitle: "Home" }}
        />
        <Stack.Screen
          name="Resources"
          component={Resources}
          options={{ headerBackTitle: "Home" }}
        />
        <Stack.Screen
          name="Progress"
          component={Progress}
          options={{ headerBackTitle: "Home" }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
