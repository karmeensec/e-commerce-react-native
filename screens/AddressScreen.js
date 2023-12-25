import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { decode } from "base-64";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AddressScreen = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const parts = token.split(".");
      const payload = JSON.parse(decode(parts[1]));

      const userId = payload.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  console.log("User Id: ", userId);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handleHouseNumberChange = (text) => {
    setHouseNumber(text);
  };

  const handleStreetChange = (text) => {
    setStreet(text);
  };

  const handleLandmarkChange = (text) => {
    setLandmark(text);
  };

  const handlePostalCodeChange = (text) => {
    setPostalCode(text);
  };

  const handleAddNewAddress = () => {
    const address = {
      name,
      mobileNumber,
      houseNumber,
      street,
      landmark,
      postalCode,
    };

    axios
      .post(
        "http://10.0.2.2:8000/address",
        { userId, address },
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        Alert.alert("New Address Success", "Addresses added successfully");
        setName("");
        setMobileNumber("");
        setHouseNumber("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 600);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address!");
        console.log("Add Address post request error: ", error);
        console.error("Add Address post request error: ", error.message);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#3498DB" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new address
        </Text>

        <TextInput
          placeholder="Country, city, state"
          placeholderTextColor={"#A6ACAF"}
          style={{
            padding: 10,
            borderColor: "#A6ACAF",
            borderRadius: 5,
            marginTop: 10,
            borderWidth: 1,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            `` First and last name
          </Text>

          <TextInput
            value={name}
            onChangeText={handleNameChange}
            placeholderTextColor={"#A6ACAF"}
            placeholder="John Doe"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile number
          </Text>

          <TextInput
            value={houseNumber}
            onChangeText={handleHouseNumberChange}
            placeholderTextColor={"#A6ACAF"}
            placeholder="+1234567890"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Company, Building, House number
          </Text>

          <TextInput
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            placeholderTextColor={"#A6ACAF"}
            placeholder="Bill & Aileen M. , 1 , FL32750"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area, Town, Street,
          </Text>

          <TextInput
            value={street}
            onChangeText={handleStreetChange}
            placeholderTextColor={"#A6ACAF"}
            placeholder="JD, Anytown, 123 Label st."
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>

          <TextInput
            value={landmark}
            onChangeText={handleLandmarkChange}
            placeholderTextColor={"#A6ACAF"}
            placeholder="Jane Doe hospital"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Postal Code</Text>

          <TextInput
            value={postalCode}
            onChangeText={handlePostalCodeChange}
            placeholderTextColor={"#A6ACAF"}
            placeholder="12-345"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <Pressable
          onPress={handleAddNewAddress}
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor: "#F1C40F",
            borderRadius: 10,
            borderWidth: 1,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
