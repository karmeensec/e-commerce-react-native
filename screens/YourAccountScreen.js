import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import shoppingBasket from "../images/shopping-basket.png";

const YourAccountScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [accountUser, setAccountUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/profile/${userId}`,
          {
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          }
        );

        console.log("Profile screen response data: ", response.data);
        const { user } = response.data;

        setAccountUser(user);
      } catch (error) {
        console.log("fetchUserProfile function error: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log("Account Screen user: ", accountUser);

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Image
          style={{ width: 100, height: 60, resizeMode: "contain" }}
          source={shoppingBasket}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          {accountUser?.name} Account Information
        </Text>
      </View>

      {accountUser && (
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Id:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser?._id}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Name:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser?.name}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Email:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser?.email}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Mobile Number:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser.address[0]?.mobileNumber}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Street address:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser.address[0]?.street}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              House Number:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser.address[0]?.houseNumber}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Postal Code:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser.address[0]?.postalCode}
              </Text>
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Verification Token:{" "}
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {accountUser?.verificationToken}
              </Text>
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default YourAccountScreen;

const styles = StyleSheet.create({});
