import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}

              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
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
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({});
