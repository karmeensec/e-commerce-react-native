import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Share,
  Animated,
  Easing,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();

  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const height = (width * 100) / 100;

  const [isLiked, setIsLiked] = useState(false);

  const [isFlipped, setFlipped] = useState(false);
  const [flipValue] = useState(new Animated.Value(0));

  const disptach = useDispatch();

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleLikePress = () => {
    setIsLiked((prev) => !prev);
  };

  const handleSharePress = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${route?.params?.title}`,
        url: route?.params?.title,
      });
    } catch (error) {
      console.error("Error sharing image:", error.message);
    }
  };

  const handleFlipPress = () => {
    Animated.timing(flipValue, {
      toValue: isFlipped ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setFlipped(!isFlipped);
    });
  };

  const interpolateFlip = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleAddToCart = (item) => {
    setIsAddedToCart(true);
    disptach(addToCart(item));

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);

  console.log("Cart itself: ", cart);

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
              <Pressable onPress={handleFlipPress}>
                <Animated.View
                  style={[
                    styles.flipContainer,
                    { transform: [{ rotateY: interpolateFlip }] },
                  ]}
                >
                  <View style={styles.flipItem}>
                    <Text style={styles.flipText}>
                      {isFlipped ? "20%OFF" : "20%OFF"}
                    </Text>
                  </View>
                </Animated.View>
              </Pressable>

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
                <Pressable onPress={handleSharePress}>
                  <Ionicons
                    name="share-social-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
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
              <Pressable onPress={handleLikePress}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={24}
                  color="white"
                />
              </Pressable>
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
        onPress={() => handleAddToCart(route?.params?.item)}
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
        {isAddedToCart ? (
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>View Cart</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Add to Cart</Text>
        )}
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

const styles = StyleSheet.create({
  flipContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0392B",
    elevation: 5,
    borderWidth: 2,
    borderColor: "#D5D8DC",
  },
  flipItem: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  flipText: {
    fontWeight: "600",
    textAlign: "center",
    color: "#F7F9F9",
    fontSize: 12,
  },
});
