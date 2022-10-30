import React, { useEffect, useState, useCallback } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Search from "../components/search";

import { getWordApi } from "../api/dictionary";

import { useFormik } from "formik";
import * as Yup from "yup"; //validation
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OLD_RESULTS } from "../utils/constants";

export default function SearchScreen({ props }) {
  const [data, setData] = useState(undefined);
  const [loadSearch, setLoadSearch] = useState(false);
  const [error, setError] = useState("");
  const [oldResults, setOldResults] = useState([]);
  const navigation = useNavigation();

  const getOldResults = async () => {
    try {
      const response = await AsyncStorage.getItem(OLD_RESULTS);
      setOldResults(JSON.parse(response || "[]"));
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setData(undefined);
      setLoadSearch(false);
      setError("");
      formik.setFieldValue("search", "");
      getOldResults();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { search } = formValue;

      if (search !== "") {
        setOldResults([...oldResults, search]);
        setLoadSearch(!loadSearch);
      }
    },
  });

  const setFormikSearch = (text) => {
    formik.setFieldValue("search", text);
    if (error) {
      setError("");
    }
  };

  const dataLoad = async (word) => {
    const tempData = await getWordApi(word);
    const response = tempData !== undefined ? tempData.data : undefined;
    await AsyncStorage.setItem(OLD_RESULTS, JSON.stringify(oldResults));
    setData(response);
    goToMeaning(response);
    // console.log("CALLING FORMIK", response, "\nWORD", word);
  };

  // console.log(">>> FORMIK", formik.values, "\nDATA", data);

  useEffect(() => {
    if (formik.values.search !== "") {
      dataLoad(formik.values.search);
    }
  }, [loadSearch]);

  const goToMeaning = (searchData) => {
    // console.log(">>> NAVIGATION", searchData);
    navigation.navigate("Meaning", { meanings: searchData });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadSearch === false && (
        <>
          <Search
            text={formik.values.search}
            onChangeText={setFormikSearch}
            handleSubmit={formik.handleSubmit}
          />
          {oldResults.length > 0 && (
            <>
              <Text> Old Results </Text>
              <View style={styles.scrollViewContainer}>
                <ScrollView horizontal style={styles.scrollView}>
                  {oldResults.map((result, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.button}
                      onPress={() => {
                        dataLoad(result);
                      }}
                    >
                      <Text>{result}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
          {oldResults.length <= 0 && <Text>Nothing searched yet</Text>}
        </>
      )}
      {loadSearch === true && <ActivityIndicator />}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    search: "",
  };
}

function validationSchema() {
  return {
    search: Yup.string().required("You need to search something"),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    height: 70,
    paddingHorizontal: 20,
  },
  scrollView: {
    marginTop: 15,
    flex: 1,
  },
  button: {
    // marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 100,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
