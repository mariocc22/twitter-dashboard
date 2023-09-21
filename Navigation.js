// contenedor de las pantallas de las que queremos navegar
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Feed from "./screens/tabScreens/Feed";
import Notifications from "./screens/tabScreens/Notifications";
import Settings from "./screens/tabScreens/Settings";
import TweetDetailScreen from "./screens/homeStack/TweetDetailsScreen";
import Payments from "./screens/drawerScreens/Payment";

// iconos para los tabs
import { Ionicons } from "@expo/vector-icons";
import { Image, useColorScheme, Pressable } from "react-native";

// crear las top tabs
const TopTab = createMaterialTopTabNavigator();

function TopTabGroup() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1f2",
        },
      }}
    >
      <TopTab.Screen name="News" component={Feed} />
      <TopTab.Screen name="Following" component={Payments} />
      <TopTab.Screen name="💪🏼" component={Payments} />
    </TopTab.Navigator>
  );
}

// crear un drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="FeedStack" component={FeedStack} />
      <Drawer.Screen name="Payments" component={Payments} />
    </Drawer.Navigator>
  );
}

// crea una Stack
const Stack = createNativeStackNavigator();

// esta funcion crea una instancia de la stack y estas dos pantallas van a poder navegar entre ellas solamente
function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedMain"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TweetDetailScreen"
        component={TweetDetailScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

// crea una instancia de los tabs
const Tab = createBottomTabNavigator();

function TabGroup({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "ios-settings-sharp";
          } else if (route.name === "Notifications") {
            iconName = focused ? "ios-notifications" : "notifications";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={TopTabGroup}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                source={require("./assets/me-square.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginLeft: 15,
                  marginTop: 15,
                }}
              />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DrawerGroup />
    </NavigationContainer>
  );
}
