import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";
import shoppingBasket from "../images/shopping-basket.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FBFCFC", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 120, height: 120, margin: 20 }}
          source={shoppingBasket}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 10,
              color: "#1C2833",
            }}
          >
            Login to your account
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              paddingVertical: 5,
              paddingLeft: 10,
              paddingHorizontal: 30,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: "#ECF0F1",
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput placeholder="Enter your email" style={{ width: 250 }} />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              paddingVertical: 5,
              paddingLeft: 10,
              paddingHorizontal: 30,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: "#ECF0F1",
            }}
          >
            <MaterialCommunityIcons
              name="account-lock-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Enter your password"
              style={{ width: 250 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
