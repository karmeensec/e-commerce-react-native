import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { Ionicons } from "@expo/vector-icons";

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

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

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
            marginVertical: 10,
          }}
        >
          <Text>Add a new address</Text>
          <FontAwesome5 name="plus-square" size={24} color="black" />
        </Pressable>

        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                marginVertical: 10,
                padding: 10,
                flexDirection: "column",
                gap: 5,
                borderColor: "#7B7D7D",
                borderRadius: 5,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Ionicons name="ios-location" size={24} color="#CB4335" />
              </View>

              <Text style={{ fontSize: 14, color: "#2C3E50" }}>
                {item?.houseNumber}, {item?.landmark}
              </Text>

              <Text style={{ fontSize: 13, color: "#2C3E50" }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 12, color: "#2C3E50" }}>
                Poland, Lodz
              </Text>

              <Text style={{ fontSize: 12, color: "#2C3E50" }}>
                {item?.mobileNumber}
              </Text>

              <Text style={{ fontSize: 12, color: "#2C3E50" }}>
                {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: "transparent",
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Edit
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Set as default
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: "transparent",
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Remove
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressAddScreen;

const styles = StyleSheet.create({});
