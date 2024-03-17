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
      title: "Apple iPhone X, GSM Unlocked 5.8, 256 GB - Space Gray",
      typicalPrice: 546.39,
      price: 460,
      image: require("../images/deals/81ReA1gb8sL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/deals/81npBrq-s3L._AC_SL1500_.jpg"),
        require("../images/deals/71qIcwo0SuL._AC_SL1500_.jpg"),
        require("../images/deals/71xHgmViTJL._AC_SL1500_.jpg"),
      ],
      color: "Blue",
      size: "256GB",
    },

    {
      id: 1,
      title:
        "Google Pixel 7a - Unlocked Android Cell Phone - Smartphone with Wide Angle Lens and 24-Hour Battery - 128 GB - Sea",
      typicalPrice: 307.95,
      price: 264.95,
      image: require("../images/deals/71m09hEhnwL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/deals/71gyIvqVRYL._AC_SL1500_.jpg"),
        require("../images/deals/81wMv71xXqL._AC_SL1500_.jpg"),
        require("../images/deals/71Zb0QByDhL._AC_SL1500_.jpg"),
      ],
      color: "Black",
      size: "128GB",
    },

    {
      id: 2,
      title:
        "Xiaomi Redmi Note 12 5G (256GB + 8GB) (Tmobile Tello & Global) Unlocked 6.67 48MP Triple Camera + Extra (w/Fast Car Charger Bundle) (Forest Green...",
      typicalPrice: 499,
      price: 499,
      image: require("../images/deals/71JQTp150HL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/deals/71VbP-hRxzL._AC_SL1500_.jpg"),
        require("../images/deals/71Ay8aNEKaL._AC_SL1500_.jpg"),
        require("../images/deals/51ZScIG5GiL._AC_.jpg"),
        require("../images/deals/513UR8QOf3L._AC_.jpg"),
      ],
      color: "Forest Green",
      size: "128GB",
    },

    {
      id: 3,
      title:
        "SAMSUNG Galaxy S24+ Plus Cell Phone, 256GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version, 2024, Onyx Black",
      typicalPrice: 999,
      price: 999,
      image: require("../images/deals/71NngboUC6L._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/deals/71leyNMeprL._AC_SL1500_.jpg"),
        require("../images/deals/71kGjgjzmPL._AC_SL1500_.jpg"),
        require("../images/deals/71DXhOBo7sL._AC_SL1500_.jpg"),
        require("../images/deals/71ADXeT-iQL._AC_SL1500_.jpg"),
      ],
      color: "Green",
      size: "256GB",
    },
  ];

  const offers = [
    {
      id: 0,
      title:
        "Lenovo Tab M9-2023 - Tablet - Long Battery Life - 9 HD - Front 2MP & Rear 8MP Camera - 3GB Memory - 32GB Storage - Android 12 or Later - Folio Case...",
      offer: "43% OFF",
      oldPrice: 349.99,
      price: 199.99,
      image: require("../images/offers/618mxQZWt1L._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/offers/61df7boSpXL._AC_SL1500_.jpg"),
        require("../images/offers/61Cw22OyeOL._AC_SL1500_.jpg"),
        require("../images/offers/61fJ3Jfx3RL._AC_SL1500_.jpg"),
      ],
      color: "Angora Blue",
      size: "32GB",
    },

    {
      id: 1,
      title:
        "JBL Quantum 360X - Wireless Consol Over-Ear Gaming Headset for Xbox with Detachable Boom mic, Up to 22-Hour Battery Life, Memory Foam Comfort, Compatible...",
      offer: "17% OFF",
      oldPrice: 119.99,
      price: 99.26,
      image: require("../images/offers/51ioyakanoL._AC_SL1000_.jpg"),
      carouselImages: [
        require("../images/offers/51a1kUab74L._AC_SL1000_.jpg"),
        require("../images/offers/51oXF00xmuL._AC_SL1000_.jpg"),
        require("../images/offers/61bHXWcJm8L._AC_SL1000_.jpg"),
      ],
      color: "Black",
      size: "Normal",
    },

    {
      id: 2,
      title:
        "Acer Nitro 5 Gaming Laptop | Intel 12th Gen i7-12650H | NVIDIA GeForce RTX 4060 Laptop GPU | 15.6” FHD 144Hz IPS Display | 16GB DDR5 | 1TB Gen 4 SSD |...",
      offer: "25% OFF",
      oldPrice: 1299.99,
      price: 949.0,
      image: require("../images/offers/71Wkd-uyvnL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/offers/612l2j6KEnL._AC_SL1500_.jpg"),
        require("../images/offers/71Jipy5XiAL._AC_SL1500_.jpg"),
        require("../images/offers/51ugQT1ewpL._AC_SL1500_.jpg"),
      ],
      color: "Black",
      size: "15 inches",
    },

    {
      id: 3,
      title:
        "TP-Link AX1800 WiFi 6 Router (Archer AX21) – Dual Band Wireless Internet Router, Gigabit Router, Easy Mesh, Works with Alexa - A Certified for Humans Device",
      offer: "20% OFF",
      oldPrice: 99.99,
      price: 84.99,
      image: require("../images/offers/51NPaIorJiL._AC_SL1000_.jpg"),
      carouselImages: [
        require("../images/offers/71zB9NiCEzL._AC_SL1500_.jpg"),
        require("../images/offers/41LnYFsCdyL._AC_SL1000_.jpg"),
        require("../images/offers/714ouVFX55L._AC_SL1500_.jpg"),
      ],
      color: "Navy Blue",
      size: "Normal",
    },

    {
      id: 4,
      title:
        "Sceptre New 27-inch Gaming Monitor 100Hz 1ms DisplayPort HDMI x2 100% sRGB AMD FreeSync Build-in Speakers, Eye Care Frameless Machine Black 2024 (E275W-FW100T)",
      offer: "20% OFF",
      oldPrice: 119.99,
      price: 109.99,
      image: require("../images/offers/71jdr9u9YhL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/offers/61SingUvk4L._AC_SL1500_.jpg"),
        require("../images/offers/71Lfn6fUgHL._AC_SL1500_.jpg"),
        require("../images/offers/51JxWjNbgpL._AC_SL1500_.jpg"),
      ],
      color: "Eclipse Gray",
      size: "27 inches",
    },

    {
      id: 5,
      title:
        "Emeril Lagasse 26 QT Extra Large Air Fryer, Convection Toaster Oven with French Doors, Stainless Steel",
      offer: "20% OFF",
      oldPrice: 189.99,
      price: 149.99,
      image: require("../images/offers/811r4Po5kXL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/offers/71DJ7s+eoKL._AC_SL1500_.jpg"),
        require("../images/offers/81FnDd+3JDL._AC_SL1500_.jpg"),
        require("../images/offers/81VLX-UHF8L._AC_SL1500_.jpg"),
      ],
      color: "Eclipse Gray",
      size: "Normal",
    },

    {
      id: 6,
      title:
        "Amazfit Bip 3 Smart Watch for Android iPhone, Health Fitness Tracker with 1.69 Large Display,14-Day Battery Life, 60+ Sports Modes, Blood Oxygen Heart...",
      offer: "15% OFF",
      oldPrice: 59.99,
      price: 44.99,
      image: require("../images/offers/61r9pDwmNHL._AC_SL1500_.jpg"),
      carouselImages: [
        require("../images/offers/61tBag7TPZL._AC_SL1500_.jpg"),
        require("../images/offers/6123vD48CQL._AC_SL1500_.jpg"),
        require("../images/offers/71yL6u5tsdL._AC_SL1500_.jpg"),
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

  const [addresses, setAddresses] = useState([]);

  const { userId, setUserId } = useContext(UserType);

  const [selectedAddress, setSelectedAddress] = useState("");

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/address/${userId}`
      );

      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("fetchAddresses function error: ", error);
      console.log("Error details:", error.response?.data);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, isModalVisible]);

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
        console.log("Fake response: ", response);

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
      offer: item?.offer,
      selectedAddress: selectedAddress,
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

  console.log("All addresses Home: ", addresses);

  const handleSetAddressPress = (item) => {
    setSelectedAddress(item);
  };

  console.log("Select address: ", selectedAddress);

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
              {selectedAddress ? (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add your address or choose a pick-up point
                </Text>
              )}
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
                  source={item?.image}
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
                  source={item?.image}
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
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => handleSetAddressPress(item)}
                key={index}
                style={{
                  width: 180,
                  height: 140,
                  borderColor: "#A6ACAF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                  marginTop: 10,
                  gap: 3,
                  borderRadius: 10,
                  borderWidth: selectedAddress === item ? 6 : 1,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 15, fontWeight: "bold" }}
                  >
                    {item?.name}
                  </Text>
                  <Ionicons name="ios-location" size={24} color="#CB4335" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    color: "#2C3E50",
                    textAlign: "center",
                    width: 130,
                  }}
                >
                  {item?.houseNumber}, {item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color: "#2C3E50",
                    textAlign: "center",
                    width: 130,
                  }}
                >
                  {item?.street}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: "#2C3E50",
                    textAlign: "center",
                    width: 130,
                  }}
                >
                  Poland, Lodz
                </Text>
              </Pressable>
            ))}

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
