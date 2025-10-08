import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { commentOnPost, toggleLike } from "../api/api";
import CommentCard from "../components/CommentCard";
import { Ionicons } from "@expo/vector-icons";

export default function PostDetailScreen({ route }: any) {
  const { post } = route.params;
  const [comments, setComments] = useState(post.comments || []);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const { width } = Dimensions.get("window");

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = await commentOnPost(post.id, "me", comment);
      setComments([...comments, newComment]);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    try {
      await toggleLike(post.id, !liked);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      <View style={styles.postCard}>
        <Text style={styles.user}>{post.user}</Text>
        <Text style={styles.content}>{post.content}</Text>

        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "#e74c3c" : "#555"}
          />
          <Text style={styles.likeText}>{liked ? "Liked" : "Like"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.commentTitle}>ความคิดเห็น</Text>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CommentCard user={item.user} text={item.text} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="เขียนความคิดเห็น..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.button} onPress={handleComment}>
          <Text style={styles.buttonText}>ส่ง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f6ff", paddingTop: 16 },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  user: { fontWeight: "bold", fontSize: 18, marginBottom: 6, color: "#0d3b66" },
  content: { fontSize: 16, marginBottom: 12, color: "#3f4c6b" },
  likeButton: { flexDirection: "row", alignItems: "center" },
  likeText: { marginLeft: 6, fontWeight: "bold", color: "#555" },
  commentTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#0d3b66" },
  commentInputContainer: { marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#0d3b66",
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
