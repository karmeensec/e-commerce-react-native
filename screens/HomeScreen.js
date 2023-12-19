import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "#FBFCFC",
      }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#2980B9",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "#FBFCFC",
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}
          >
            <Ionicons
              name="search"
              size={22}
              color="black"
              style={{ paddingLeft: 10 }}
            />
            <TextInput placeholder="Search for your products..." />
          </Pressable>

          <Ionicons name="mic-outline" size={26} color="black" />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#7FB3D5",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />

          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              Deliver to Kamil - Patrice Lumumby 16/18
            </Text>
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
