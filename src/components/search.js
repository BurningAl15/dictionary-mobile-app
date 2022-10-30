import { View, TextInput, Button, StyleSheet } from "react-native";
import React from "react";

export default function Search({ text, onChangeText, handleSubmit, error }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        value={text}
        blurOnSubmit={true}
      />
      <Button title="Search" onPress={handleSubmit} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    width: 250,
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});
