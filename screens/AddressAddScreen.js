import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddressAddScreen = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([]);

  const { userId, setUserId } = useContext(UserType);

  console.log("User id: ", userId);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/address/${userId}`
      );

      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("fetchAddresses function error: ", error);
    }
  };

  console.log("All addresses: ", addresses);

  const handleAddressPress = () => {
    navigation.navigate("Add");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <Header />

      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 21 }}>Your addresses</Text>

        <Pressable
          onPress={handleAddressPress}
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
