import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductInfoScreen = () => {
  const route = useRoute();

  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const height = (width * 100) / 100;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#FBFCFC",
        marginTop: 55,
      }}
    >
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

      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            key={index}
            source={{ uri: item }}
            style={{ resizeMode: "contain", marginTop: 25, width, height }}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "#C0392B",
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#F7F9F9",
                    fontSize: 15,
                  }}
                >
                  20% offe
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "#212F3D",
                  elevation: 5,
                }}
              >
                <Ionicons name="share-social-outline" size={24} color="white" />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 35,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: "#212F3D",
                elevation: 5,
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <Ionicons name="heart-outline" size={24} color="white" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
