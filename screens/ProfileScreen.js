import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import shoppingBasket from "../images/shopping-basket.png";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { userId, setUserId } = useContext(UserType);

  const [profileUser, setProfileUser] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",

      headerStyle: {
        backgroundColor: "#2980B9",
      },

      headerLeft: () => (
        <Image
          style={{ width: 70, height: 40, resizeMode: "contain" }}
          source={shoppingBasket}
        />
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginHorizontal: 10,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <Ionicons name="search" size={24} color="black" />
        </View>
      ),
    });
  }, []);

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

        setProfileUser(user);
      } catch (error) {
        console.log("fetchUserProfile function error: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log("Profile user: ", profileUser);

  return (
    <ScrollView style={{ padding: 10, flex: 1 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Welcome {profileUser?.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Your Orders
          </Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Your Account
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Buy Again
          </Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Log Out
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
