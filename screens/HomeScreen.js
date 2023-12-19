import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";

const HomeScreen = () => {
  const list = [
    {
      id: 0,
      image: require("../images/home.png"),
      name: "Home",
    },

    {
      id: 1,
      image: require("../images/deals.png"),
      name: "Deals",
    },

    {
      id: 2,
      image: require("../images/electronics.png"),
      name: "Electronics",
    },

    {
      id: 3,
      image: require("../images/mobiles.png"),
      name: "Mobiles",
    },

    {
      id: 4,
      image: require("../images/music.png"),
      name: "Music",
    },

    {
      id: 5,
      image: require("../images/fashion.png"),
      name: "Fashion",
    },
  ];

  const images = [
    "https://blog.placeit.net/wp-content/uploads/2021/11/ad-banner-maker-announcing-discounts-for-black-friday.png",
    "https://m-cdn.phonearena.com/images/article/139475-wide-two_1200/Best-Prime-Day-Google-Pixel-phone-deals-Superb-discounts-on-Pixel-phones-right-now.webp?1689231622",
    "https://www.homesforheroes.com/wp-content/uploads/2021/05/young-couple-shopping-online-in-kitchen-on-laptop-wife-holding-credit-card-looking-for-discounts-for-police-Homes-for-Heroes.jpg",
    "https://images.macrumors.com/t/p4OKdf4BqxBekUQvLEJQ9p5J6OE=/800x0/article-new/2023/10/Prime-Big-Deal-Days-Feature-Best-Apple-Discounts.jpg?lossy",
  ];

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "#FBFCFC",
      }}
    >
      <ScrollView>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#7FB3D5",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />

          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              Deliver to Kamil - Patrice Lumumby 16/18
            </Text>
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                  borderWidth: 2,
                  borderColor: "#ddd",
                  borderRadius: 25,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  marginTop: 5,
                }}
              >
                {" "}
                {item?.name}{" "}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#F2F3F4"}
          inactiveDotColor="#2E86C1"
          ImageComponentStyle={{ width: "100%" }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
