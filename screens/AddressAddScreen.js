import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";

const AddressAddScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <Header />

      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 21 }}>Your addresses</Text>

        <Pressable
          onPress={""}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingHorizontal: 5,
            paddingVertical: 7,
            borderColor: "#7B7D7D",
          }}
        >
          <Text>Add a new address</Text>
          <FontAwesome5 name="plus-square" size={24} color="black" />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressAddScreen;

const styles = StyleSheet.create({});
