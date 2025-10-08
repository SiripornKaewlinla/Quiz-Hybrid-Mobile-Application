import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { getClassMembers } from "../api/api";

export default function ClassmatesScreen() {
  const [members, setMembers] = useState<any[]>([]);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    getClassMembers(2565).then(setMembers).catch(console.error);
  }, []);

  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      <Text style={styles.title}>สมาชิกชั้นปี 2565</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#f2f6ff", // ฟ้าอ่อนสบายตา
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0d3b66",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  item: {
    fontSize: 16,
    color: "#3f4c6b",
  },
});
