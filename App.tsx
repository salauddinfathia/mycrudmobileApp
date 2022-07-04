import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import App1 from "./App1";
import App2 from "./App2";
import { NavigationContainer } from "@react-navigation/native";
//Below requires npm install react-native-vector-icons @types/react-native-vector-icons. Using it for Tab Navigator icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
const App: React.FC = () => {
  //below are some optional props that can be passed to Tab.Navigator. You can try the code with and without options
  const tabProps = {
    initialRouteName: "For Personal Transactions",
    tabBarOptions: {
      activeTintColor: "green",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "#eee",
      },
      backBehavior: "history", //Behaviour when system back is touched. Options are none, initialRoute, order, history. This seems to be buggy
    },
    lazy: true, //default is true
  };

    

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator {...tabProps}>
        <Tab.Screen
          name="For Personal Transactions"
          component={App1}
          options={{
            tabBarLabel: "For Personal Transactions",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cash" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="For Personal Assets"
          component={App2}
          options={{
            tabBarLabel: "For Personal Assets",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="car" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
};
// export default App;
