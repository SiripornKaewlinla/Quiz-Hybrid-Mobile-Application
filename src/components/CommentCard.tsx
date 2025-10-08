import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CommentCard({ user, text }: any) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.user}>{user}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  user: {
    fontWeight: "bold",
    color: "#0d3b66",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#3f4c6b",
  },
});
