import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { getPosts, createPost } from "../api/api";
import PostCard from "../components/PostCard";

export default function HomeScreen({ navigation }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const { width } = Dimensions.get("window");

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try { 
      const data = await getPosts(); 
      setPosts(data); 
    } catch (err) { console.error(err); }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      await createPost("student", content);
      setContent("");
      loadPosts();
    } catch (err) { console.error(err); }
  };

  return (
    <View style={[styles.container, { paddingHorizontal: width*0.05 }]}>
      <TextInput
        placeholder="เขียนสิ่งที่อยากแบ่งปัน..."
        style={styles.input} 
        value={content} 
        onChangeText={setContent} 
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>โพสต์</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 16, backgroundColor: "#f2f6ff" },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    textAlignVertical: "top"
  },
  button: { 
    backgroundColor: "#0d3b66", 
    paddingVertical: 14, 
    borderRadius: 16, 
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
