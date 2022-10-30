import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Definitions from "./Definitions/DefinitionsMeaning";
import { Audio } from "expo-av";

const { width } = Dimensions.get("screen");

export default function DictionaryContent({ data, category = "en" }) {
  // console.log(">>> DICTIONARY CONTENT", data);
  const [word, setWord] = useState(undefined);
  const [phonetic, setPhonetic] = useState("");
  const [soundURI, setSoundURI] = useState(undefined);
  const [sound, setSound] = useState();

  async function playSound(uri) {
    // console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
      { shouldPlay: true }
    );
    setSound(sound);

    // console.log("Playing Sound");
    await sound.playAsync();

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }

  useEffect(() => {
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (data !== undefined && data !== "error") {
      setWord(data[0].word);

      let uri = "";

      let tempPhonetic = "";

      if (data.length > 0) {
        data.forEach((dataElement) => {
          return dataElement.phonetics.forEach((element) => {
            if (element.audio !== "") {
              uri = element.audio;
            }
            if (element.text !== "") {
              tempPhonetic = element.text;
            }
          });
        });
      }

      setPhonetic(tempPhonetic);
      setSoundURI(uri);
    }
  }, [data]);

  if (data === undefined)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  if (data === "error") {
    return (
      <View>
        <Text>Nothing Found, try again!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignSelf: "flex-start", width: width - 20 }}>
        <Text style={styles.word}>{capitalize(word)}</Text>
      </View>
      {soundURI !== "" && (
        <Button
          title={`Play Sound${": " + phonetic}`}
          onPress={() => playSound(soundURI)}
        />
      )}
      <ScrollView>
        {data.map((mean, index) => {
          return (
            <View key={index}>
              <Definitions ind={index} mean={mean} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  word: {
    padding: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    paddingVertical: 10,
    alignItems: "stretch",
  },
});
