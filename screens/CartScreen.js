import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const ecomImageUrl =
    "https://cdn0.iconfinder.com/data/icons/e-commerce-two-color-blue/2048/41_-_eCommerce_-_Two_Color_Blue_A3_B3_1-7-512.png";
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);

  console.log("Cart screen cart: ", cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((acc, item) => acc + item, 0);

  console.log("Total: ", total);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleDeleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleProceedtoBuyPress = () => {
    navigation.navigate("Confirm");
  };

  return (
    <ScrollView style={{ marginTop: 40, flex: 1 }}>
      <Header />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Amount: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>${total}</Text>
      </View>

      <Text style={{ marginHorizontal: 10, fontSize: 13 }}>
        Equated Monthly Instalment(EMI) details accessible
      </Text>

      <Pressable
        disabled={cart.length === 0}
        onPress={handleProceedtoBuyPress}
        style={({ pressed }) => [
          {
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            elevation: 10,
            backgroundColor: pressed
              ? "#D4AC0D"
              : cart.length === 0
              ? "#D3D3D3"
              : "#F1C40F",
          },
          cart.length === 0 && { borderColor: "#A9A9A9" }, // Change border color when disabled
        ]}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {" "}
          Proceed to buy{" "}
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {cart.length}
          </Text>{" "}
          items{" "}
        </Text>
      </Pressable>

      <Text
        style={{
          height: 1,
          borderColor: "#D7DBDD",
          borderWidth: 1,
          margin: 10,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 3,
              borderRadius: 13,
              borderBottomColor: "#D5D8DC",
              borderRightColor: "#D6DBDF",
            }}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <Text
                  numberOfLines={2}
                  style={{ width: 150, marginTop: 10, fontWeight: "500" }}
                >
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}
                >
                  ${item?.price}
                </Text>
                <Image
                  source={{
                    uri: ecomImageUrl,
                  }}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#F39C12",
                    fontSize: 20,
                  }}
                >
                  In Stock
                </Text>
                <Text style={{ fontWeight: "500" }}>
                  {item?.rating?.rate}⭐
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
                marginHorizontal: 7,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => handleDecreaseQuantity(item)}
                    style={{
                      padding: 7,
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRadius: 7,
                      backgroundColor: "#EAECEE",
                    }}
                  >
                    <Entypo name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => handleDeleteItem(item)}
                    style={{
                      padding: 7,
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRadius: 7,
                      backgroundColor: "#EAECEE",
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable
                  style={{ paddingHorizontal: 18, paddingVertical: 6 }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => handleIncreaseQuantity(item)}
                  style={{
                    padding: 7,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderRadius: 7,
                    backgroundColor: "#EAECEE",
                  }}
                >
                  <Entypo name="plus" size={24} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => handleDeleteItem(item)}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D5D8DC",
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
                marginHorizontal: 10,
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                }}
              >
                <FontAwesome name="bookmark-o" size={24} color="black" />
              </Pressable>

              <Pressable
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                }}
              >
                <Text style={{ color: "#5DADE2" }}>See more</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
