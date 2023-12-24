import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
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
  );
};

export default Header;

const styles = StyleSheet.create({});
