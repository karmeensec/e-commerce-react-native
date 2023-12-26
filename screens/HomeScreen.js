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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { Octicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";

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

  const deals = [
    {
      id: 0,
      title: "Apple iPhone 12, 256GB, Blue - Unlocked (Renewed Premium)",
      typicalPrice: 546.39,
      price: 460,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/513NI5xpYjL._AC_SL1000_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/513NI5xpYjL._AC_SL1000_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51ERFKUcVlL._AC_SL1000_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51yHm-RlBbL._AC_SL1000_.jpg",
      ],
      color: "Blue",
      size: "256GB",
    },

    {
      id: 1,
      title: "Apple iPhone 11, 64GB, Black - Unlocked (Renewed)",
      typicalPrice: 307.95,
      price: 264.95,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61MG3m5FhIL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61MG3m5FhIL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41Uss6iRXiL._AC_SL1333_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51ya2kKb6gL._AC_SL1500_.jpg",
      ],
      color: "Black",
      size: "64GB",
    },

    {
      id: 2,
      title:
        "SAMSUNG Galaxy S20 FE G780F 128GB 8GB RAM Dual Sim GSM Unlocked International Version - Cloud Red",
      typicalPrice: 499,
      price: 499,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71NjjYcElTL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71NjjYcElTL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71lseRlo5hL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71CBYSOUnIL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71oPiycuotL._AC_SL1500_.jpg",
      ],
      color: "Cloud Red",
      size: "128GB",
    },

    {
      id: 3,
      title:
        "Xiaomi Mi 13 Ultra 5G 256GB 12GB Factory Unlocked (GSM Only | No CDMA - not Compatible with Verizon/Sprint) China Version - Green",
      typicalPrice: 999,
      price: 999,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/7114DYWzqML._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/7114DYWzqML._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61C9J31MFtL._AC_SL1200_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41lv72KUNyL._AC_SL1081_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61bJcViuWGL._AC_SL1079_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71yy-RCDb0L._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81KbTb-bVPL._AC_SL1500_.jpg",
      ],
      color: "Green",
      size: "256GB",
    },
  ];

  const offers = [
    {
      id: 0,
      title:
        "SAMSUNG Galaxy Tab S6 Lite 10.4 64GB Android Tablet, LCD Screen, S Pen Included, Slim Metal Design, AKG Dual Speakers, 8MP Rear Camera, Long Lasting Battery, US Version, 2022, Angora Blue",
      offer: "43% off",
      oldPrice: 349.99,
      price: 199.99,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/415G0bg-hiL._AC_SL1000_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/415G0bg-hiL._AC_SL1000_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51QtzxAUZKL._AC_SL1000_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61cFm5eRcdL._AC_SL1000_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61Hd--NBHwL._AC_SL1000_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61h1KyNKFwL._AC_SL1000_.jpg",
      ],
      color: "Angora Blue",
      size: "64GB",
    },

    {
      id: 1,
      title:
        "Turtle Beach Stealth 600 Gen 2 MAX Multiplatform Amplified Wireless Gaming Headset for Xbox Series X|S, Xbox One, PS5, PS4, Windows 10 & 11 PCs & Nintendo Switch - 48+ Hour Battery - Black",
      offer: "17% off",
      oldPrice: 119.99,
      price: 99.26,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81mLZHcCV1L._SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/712Ve-FtgTL._SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71h+MzptHJL._SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61B5wernQSL._SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71MYdL98ycL._SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81YmCQUh-WL._SL1500_.jpg",
      ],
      color: "Black",
      size: "Normal",
    },

    {
      id: 2,
      title:
        "ASUS TUF Gaming 27 1080P Monitor - Full HD, 165Hz (Supports 144Hz), 1ms, Extreme Low Motion Blur, FreeSync Premium, Shadow Boost, Eye Care, HDMI, DisplayPort, Tilt Adjustable - VG277Q1A,Black",
      offer: "25% off",
      oldPrice: 199.99,
      price: 149.0,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81Gm7yg2npL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81Gm7yg2npL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81Y6pDMjrwL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81XAo31sQNL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81ZuC8pafbL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/6125fV9U0ZL._AC_SL1500_.jpg",
      ],
      color: "Black",
      size: "27 inches",
    },

    {
      id: 3,
      title:
        "TP-Link TL-SG105, 5 Port Gigabit Unmanaged Ethernet Switch, Network Hub, Ethernet Splitter, Plug & Play, Fanless Metal Design, Shielded Ports, Traffic Optimization,Navy Blue",
      offer: "20% off",
      oldPrice: 19.99,
      price: 15.99,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71kcM4nLRjL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71kcM4nLRjL._AC_SL1500_.jpg",
      ],
      color: "Navy Blue",
      size: "Normal",
    },

    {
      id: 4,
      title:
        "ASUS ROG Strix G15 (2022) Gaming Laptop, 15” 16:10 FHD 144Hz, GeForce RTX 3050, AMD Ryzen™ 7 6800H/HS, 16GB DDR5, 512GB PCIe SSD, Wi-Fi 6E, Windows 11, G513RC-ES73, Eclipse Gray",
      offer: "20% off",
      oldPrice: 999.99,
      price: 848.99,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71OyrTkxpGL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71IA+MeLP2L._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71gi+JciE8L._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71khWP11sUL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51vYBgQ4pyL._AC_SL1500_.jpg",
      ],
      color: "Eclipse Gray",
      size: "15 inches",
    },

    {
      id: 5,
      title:
        "Ninja SFP701 Combi All-in-One Multicooker, Oven, and Air Fryer, 14-in-1 Functions,15-Minute Complete Meals, Includes 3 Accessories, Auto Cook Menu, Timer, Automatic Shut-Off, Grey, 14.92 x15.43 x13.11",
      offer: "20% off",
      oldPrice: 229.99,
      price: 149.99,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81Rc-+bdezL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81Rc-+bdezL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81sP3NnHmzL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81mTPhsFjHL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91LkRimPabL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81jc15i4u1L._AC_SL1500_.jpg",
      ],
      color: "Eclipse Gray",
      size: "Normal",
    },

    {
      id: 6,
      title:
        "Amazfit GTR 4 Smart Watch for Men Android iPhone, Dual-Band GPS, Alexa Built-in, Bluetooth Calls, 150+ Sports Modes, 14-Day Battery Life, Heart Rate Blood Oxygen Monitor, 1.43”AMOLED Display,Black",
      offer: "15% off",
      oldPrice: 199.99,
      price: 169.99,
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71aWDnZOfLL._AC_SL1500_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71aWDnZOfLL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/7117Em-zhyL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81r4KIFJ1fL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71qi3Lg2hHL._AC_SL1500_.jpg",
      ],
      color: "Black",
      size: "Normal",
    },
  ];
  const navigation = useNavigation();

  const [items, setItems] = useState([
    { label: "Electronics", value: "electronics" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("electronics");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [specAddresses, setSpecAddresses] = useState([]);

  const { userId, setUserId } = useContext(UserType);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        setProducts(response.data);
      } catch (error) {
        console.log("FakeStoreApi Fetch Error: ", error);
      }
    };

    fetchData();
  }, []);

  console.log("All Products: ", products);

  const onGenderTypeOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleOffersPress = (item) => {
    navigation.navigate("Info", {
      id: item.id,
      title: item.title,
      price: item?.price,
      carouselImages: item.carouselImages,
      color: item?.color,
      size: item?.size,
      oldPrice: item?.oldPrice,
      item: item,
    });
  };

  const cart = useSelector((state) => state.cart.cart);

  console.log("Cart itself: ", cart);

  const handleModalVisibility = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleAddAddressPress = () => {
    setIsModalVisible(false);
    navigation.navigate("Address");
  };

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "#FBFCFC",
        }}
      >
        <ScrollView>
          <Header />

          <Pressable
            onPress={handleModalVisibility}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#7FB3D5",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable onPress={handleModalVisibility}>
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Deliver to Kamil - Patrice Lumumby 16/18
              </Text>
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
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

          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Trending deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  marginVertical: 10,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onPress={() => handleOffersPress(item)}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 180,
                    height: 180,
                    resizeMode: "contain",
                    borderWidth: 2,
                    borderColor: "#ddd",
                    margin: 4,
                    borderRadius: 10,
                  }}
                />
                <Text style={{ width: 150, marginTop: 10 }} numberOfLines={1}>
                  {" "}
                  {item?.title}{" "}
                </Text>
                <View
                  style={{
                    borderColor: "#D5D8DC",
                    borderBottomWidth: 2,
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                    {" "}
                    ${item.price}{" "}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D5D8DC",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleOffersPress(item)}
              >
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
                <View
                  style={{
                    borderColor: "#D5D8DC",
                    borderBottomWidth: 2,
                    padding: 5,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "semibold",
                      fontSize: 10,
                      textDecorationLine: "line-through",
                    }}
                  >
                    {" "}
                    ${item.oldPrice}{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                    {" "}
                    ${item.price}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#A93226",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#F7F9F9",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#D5D8DC",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "65%",
              marginBottom: isOpen ? 15 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#273746",
                height: 20,
                marginBottom: isOpen ? 15 : 15,
              }}
              open={isOpen}
              value={category}
              items={items}
              setOpen={setIsOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose a category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderTypeOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={handleModalVisibility}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={handleModalVisibility}
        visible={isModalVisible}
        onTouchOutside={handleModalVisibility}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Choose your location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 14, color: "#909497" }}>
              Select your delivery location
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={handleAddAddressPress}
              style={{
                width: 140,
                height: 140,
                borderWidth: 1,
                borderColor: "#A6ACAF",
                borderRadius: 10,
                marginTop: 10,
                paddingTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#7B7D7D",
                }}
              >
                Add your address or choose a pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="ios-location" size={24} color="#7B7D7D" />
              <Text style={{ fontWeight: 400, color: "#7B7D7D" }}>
                Enter your postal code
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Octicons name="location" size={24} color="#7B7D7D" />
              <Text style={{ fontWeight: 400, color: "#7B7D7D" }}>
                Use my current location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialIcons name="location-city" size={24} color="#7B7D7D" />
              <Text style={{ fontWeight: 400, color: "#7B7D7D" }}>
                Deliver outside of Poland
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
