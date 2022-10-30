import React, { useEffect, useState } from "react";

import { Icon, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import DictionaryContent from "../components/dictionaryContent";

export default function MeaningScreen({ navigation, route }) {
  const [meanings, setMeanings] = useState(undefined);

  useEffect(() => {
    loadMeaning();
  }, [route.params]);

  const loadMeaning = async () => {
    try {
      const response = route.params.meanings;
      //   console.log(">>> Meanings", response);
      setMeanings(response);
    } catch (e) {
      navigation.goBack();
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DictionaryContent data={meanings} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 50,
  },
});
