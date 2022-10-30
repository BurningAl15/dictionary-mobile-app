import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Hr from "react-native-hr-component";

export default function Definitions({ ind, mean }) {
  // console.log(">>> MEAN", mean.meanings[0]);
  return (
    <View>
      <Text style={styles.word}>Group {ind + 1}</Text>
      {mean.meanings.map((item, meaningIndex) => (
        <View style={{ backgroundColor: "#ddd" }} key={meaningIndex}>
          <Text style={styles.subWord}>Meaning {meaningIndex + 1}</Text>

          <View>
            {item.definitions.map((def, defIndex) => (
              <View key={defIndex} style={styles.container}>
                {
                  <Text style={styles.definition}>
                    {defIndex + 1}. {def.definition}
                  </Text>
                }

                {def.example && (
                  <Text>
                    <Text style={styles.definition}>Example: </Text>
                    {def.example}
                  </Text>
                )}
                {def.synonyms.length > 0 && (
                  <Text>
                    <Text style={styles.definition}>Synonyms: </Text>
                    {def.synonyms.map((s) => `${s}, `)}
                  </Text>
                )}
                {defIndex < item.definitions.length - 1 ? (
                  <Hr
                    text=""
                    fontSize={5}
                    lineColor="#eee"
                    textPadding={0}
                    hrStyles={styles.line}
                  />
                ) : (
                  <View style={styles.jump} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
      <Hr
        text=""
        fontSize={5}
        lineColor="#ddd"
        textPadding={0}
        hrStyles={styles.endLine}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    color: "black",
  },
  definition: {
    fontWeight: "500",
  },
  line: {
    paddingVertical: 10,
    height: 1,
    backgroundColor: "rgba(255, 255, 255 ,0.3)",
    alignSelf: "stretch",
  },
  endLine: {
    paddingBottom: 10,
    height: 2,
    backgroundColor: "rgba(255, 255, 255 ,0.6)",
    alignSelf: "stretch",
  },
  jump: {
    paddingVertical: 10,
  },
  word: {
    padding: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    paddingVertical: 10,
    alignItems: "stretch",
  },
  subWord: {
    padding: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
    alignItems: "stretch",
  },
});
