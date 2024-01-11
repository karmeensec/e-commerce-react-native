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
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { userId, setUserId } = useContext(UserType);

  const [profileUser, setProfileUser] = useState();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth token cleared!");
    navigation.replace("Login");
  };

  const handleLogout = () => {
    clearAuthToken();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/orders/${userId}`,
          {
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          }
        );

        console.log("Response data for orders: ", response.data);
        const orders = response.data.orders;
        setOrders(orders);

        setIsLoading(false);
      } catch (error) {
        console.log("FetchOrders function error: ", error);
      }
    };

    fetchOrders();
  }, []);

  console.log("Profile screen orders: ", orders);

  return (
    <ScrollView style={{ padding: 10, flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Welcome {profileUser?.name}
      </Text>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}
          >
            Your Account
          </Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}
          >
            Buy Again
          </Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 25,
            flex: 1,
            backgroundColor: "#EAECEE",
            borderWidth: 0.5,
            elevation: 2,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}
          >
            Log Out
          </Text>
        </Pressable>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 18 }}>
          Your Recent Orders
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              key={order._id}
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {order.products.slice(0, 1)?.map((product) => (
                <View key={product._id} style={{ marginVertical: 10 }}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
