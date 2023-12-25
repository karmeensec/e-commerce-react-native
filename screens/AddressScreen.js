import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const AddressScreen = () => {
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#3498DB" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new address
        </Text>

        <TextInput
          placeholder="Country, city, state"
          placeholderTextColor={"#A6ACAF"}
          style={{
            padding: 10,
            borderColor: "#A6ACAF",
            borderRadius: 5,
            marginTop: 10,
            borderWidth: 1,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            First and last name
          </Text>

          <TextInput
            placeholderTextColor={"#A6ACAF"}
            placeholder="John Doe"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile number
          </Text>

          <TextInput
            placeholderTextColor={"#A6ACAF"}
            placeholder="+1234567890"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Company, Building, House number
          </Text>

          <TextInput
            placeholderTextColor={"#A6ACAF"}
            placeholder="Bill & Aileen M. , 1 , FL32750"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area, Town, Street,
          </Text>

          <TextInput
            placeholderTextColor={"#A6ACAF"}
            placeholder="JD, Anytown, 123 Label st."
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>

          <TextInput
            placeholderTextColor={"#A6ACAF"}
            placeholder="Jane Doe hospital"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Postal Code</Text>

          <TextInput
            placeholderTextColor={"#A6ACAF"}
            placeholder="12-345"
            style={{
              padding: 10,
              borderColor: "#A6ACAF",
              borderRadius: 5,
              marginTop: 10,
              borderWidth: 1,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
