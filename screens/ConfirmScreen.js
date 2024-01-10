import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ConfirmScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const { userId, setUserId } = useContext(UserType);

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");
  const [isOption, setIsOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((acc, item) => acc + item, 0);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/address/${userId}`
      );

      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("fetchAddresses function error: ", error);
    }
  };

  console.log("All addresses Confirm screen: ", addresses);

  const handleSelectedAddressPress = (item) => {
    setSelectedAddress(item);
  };

  const handleCurrentStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleOptionPress = () => {
    setIsOption((prev) => !prev);
  };

  return (
    <ScrollView style={{ marginTop: 45 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {steps?.map((item, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "#138D75" },
                    index <= currentStep && { backgroundColor: "#138D75" },
                  ]}
                />
              )}

              <View
                style={[
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1.5,
                    elevation: 5,
                  },
                  index < currentStep && { backgroundColor: "#138D75" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>

              <Text style={{ textAlign: "center", marginTop: 10 }}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select your delivery address
          </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  marginVertical: 10,
                  padding: 17,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  borderColor: "#7B7D7D",
                  borderRadius: 5,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={24} color="black" />
                ) : (
                  <FontAwesome5
                    onPress={() => handleSelectedAddressPress(item)}
                    name="circle"
                    size={24}
                    color="black"
                  />
                )}

                <View style={{ marginHorizontal: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Ionicons name="ios-location" size={24} color="#CB4335" />
                  </View>

                  <Text style={{ fontSize: 14, color: "#2C3E50" }}>
                    {item?.houseNumber}, {item?.landmark}
                  </Text>

                  <Text style={{ fontSize: 13, color: "#2C3E50" }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 12, color: "#2C3E50" }}>
                    Poland, Lodz
                  </Text>

                  <Text style={{ fontSize: 12, color: "#2C3E50" }}>
                    {item?.mobileNumber}
                  </Text>

                  <Text style={{ fontSize: 12, color: "#2C3E50" }}>
                    {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        backgroundColor: "transparent",
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        Edit
                      </Text>
                    </Pressable>

                    <Pressable
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        Set as default
                      </Text>
                    </Pressable>

                    <Pressable
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        backgroundColor: "transparent",
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        Remove
                      </Text>
                    </Pressable>
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={handleCurrentStep}
                        style={{
                          marginTop: 15,
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 8,
                          backgroundColor: "#17202A",

                          borderRadius: 20,
                          elevation: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          Deliver to selected address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your delivery options
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
              gap: 7,
              borderColor: "#A6ACAF",
              borderWidth: 1,
              borderRadius: 8,
              marginVertical: 10,
              backgroundColor: "#F2F4F4",
            }}
          >
            {isOption ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <FontAwesome5
                onPress={handleOptionPress}
                name="circle"
                size={24}
                color="black"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ fontWeight: "500", color: "#138D75" }}>
                Tomorrow by 10PM
              </Text>
              - Get a FREE delivery with a Premium membership
            </Text>
          </View>

          <Pressable
            onPress={handleCurrentStep}
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: "#17202A",
              borderRadius: 10,
              borderWidth: 1,
              elevation: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Continue
            </Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment method
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
              gap: 7,
              borderColor: "#A6ACAF",
              borderWidth: 1,
              borderRadius: 8,
              marginVertical: 10,
              backgroundColor: "#F2F4F4",
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <FontAwesome5
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={24}
                color="black"
              />
            )}

            <Text>Cash on Delivery</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
              gap: 7,
              borderColor: "#A6ACAF",
              borderWidth: 1,
              borderRadius: 8,
              marginVertical: 10,
              backgroundColor: "#F2F4F4",
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <FontAwesome5
                onPress={() => setSelectedOption("card")}
                name="circle"
                size={24}
                color="black"
              />
            )}

            <Text>Credit or Debit card</Text>
          </View>

          <Pressable
            onPress={handleCurrentStep}
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: "#17202A",
              borderRadius: 10,
              borderWidth: 1,
              elevation: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Continue
            </Text>
          </Pressable>
        </View>
      )}

      {currentStep == 3 && selectedOption == "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              padding: 8,
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Secure a 10% savings and ensure a continuous supply
              </Text>

              <Text style={{ fontSize: 15, color: "#808B96", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>

          <View
            style={{
              gap: 8,
              padding: 8,
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#808B96" }}
              >
                Items:{" "}
              </Text>
              <Text style={{ fontSize: 17, color: "#808B96" }}>${total}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#808B96" }}
              >
                Delivery:{" "}
              </Text>
              <Text style={{ fontSize: 17, color: "#808B96" }}>$0</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 23, fontWeight: "bold", color: "#808B96" }}
              >
                Total order price:{" "}
              </Text>
              <Text
                style={{ fontSize: 23, fontWeight: "bold", color: "#2C3E50" }}
              >
                ${total}
              </Text>
            </View>
          </View>

          <View
            style={{
              gap: 8,
              padding: 8,
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "#808B96" }}>Pay with</Text>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: "#17202A",
              borderRadius: 10,
              borderWidth: 1,
              elevation: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Place your order
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({});
