import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PostCard({ post }: any) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Text style={styles.user}>{post.user}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  user: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0d3b66",
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: "#3f4c6b",
  },
});
