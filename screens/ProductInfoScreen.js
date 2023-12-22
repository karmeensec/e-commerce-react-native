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
                elevation: 20,
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

      <View style={{ padding: 10 }}>
        <Text style={{ marginTop: 10, fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>
        <Text style={{ marginTop: 6, fontSize: 18, fontWeight: "600" }}>
          {" "}
          ${route?.params?.price}{" "}
        </Text>
      </View>

      <Text
        style={{
          height: 1,
          borderColor: "#D7DBDD",
          borderWidth: 1,
          margin: 10,
        }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>

      <Text
        style={{
          height: 1,
          borderColor: "#D7DBDD",
          borderWidth: 1,
          margin: 10,
        }}
      />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Price: ${route?.params?.price}
        </Text>
        <Text style={{ color: "#239B56", fontWeight: "bold" }}>
          Free delivery tomorrow by 3PM. Order till 2PM.
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            gap: 5,
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Deliver to Kamil - Patrice Lumumby 16/18
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontWeight: "bold",
          marginHorizontal: 10,
          color: "#F39C12",
          fontSize: 20,
          textAlign: "right",
        }}
      >
        In Stock
      </Text>

      <Pressable
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 10,
          marginVertical: 10,
          backgroundColor: "#F1C40F",
          borderRadius: 20,
          borderWidth: 1,
          elevation: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Add to Cart</Text>
      </Pressable>

      <Pressable
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 10,
          marginVertical: 10,
          backgroundColor: "#ECF0F1",
          borderRadius: 20,
          borderWidth: 1,
          elevation: 10,
        }}
      >
        <Text style={{ fontSize: 15 }}>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
