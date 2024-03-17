import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    setIsAddedToCart(true);
    dispatch(addToCart(item));

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 60000);
  };

  const handleViewCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleProductPress = () => {
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
      rating: item?.rating,
      image: item?.image,
      // selectedAddress: selectedAddress,
    });
    console.log("this item : ", item);
  };

  return (
    <Pressable
      style={{
        marginHorizontal: 20,
        marginVertical: 25,
        borderTopWidth: 2,
        borderRadius: 25,
        borderColor: "#D5D8DC",
        paddingVertical: 5,
      }}
      onPress={handleProductPress}
    >
      <Image
        source={{ uri: item?.image }}
        style={{ width: 150, height: 150, resizeMode: "contain" }}
      />
      <Text style={{ width: 150, marginTop: 10 }} numberOfLines={1}>
        {" "}
        {item?.title}{" "}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>${item?.price}</Text>
        <Text style={{ fontWeight: "500" }}>{item?.rating?.rate}⭐</Text>
      </View>

      <Pressable
        onPress={() => {
          if (isAddedToCart) {
            handleViewCartPress();
          } else {
            handleAddToCart(item);
          }
        }}
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 10,
          backgroundColor: "#17202A",
          borderColor: "#A9A9A9",
          borderRadius: 10,
          borderWidth: 1,
        }}
      >
        {isAddedToCart ? (
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
            View Cart
          </Text>
        ) : (
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
            Add to cart
          </Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
