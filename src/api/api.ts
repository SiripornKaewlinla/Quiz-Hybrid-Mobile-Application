export const API_KEY = "d84c9cb28a43b20bae79c4bdb704f927060b00f361d406c6ceb6dbee79521b0f";
export const BASE_URL = "https://cis.kku.ac.th/api";

// ดึงรายชื่อเพื่อนร่วมชั้นจากปีการศึกษา
export async function getClassMembers(year: number) {
  const res = await fetch(`${BASE_URL}/classroom/class/${year}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

// ดึงโพสต์
export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: { "Authorization": `Bearer ${API_KEY}` },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// สร้างโพสต์
export async function createPost(user: string, content: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ user, content }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

// คอมเมนต์โพสต์
export async function commentOnPost(postId: string, user: string, text: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ user, text }),
  });
  if (!res.ok) throw new Error("Failed to comment");
  return res.json();
}

// Like/Unlike
export async function toggleLike(postId: string, like: boolean) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: like ? "POST" : "DELETE",
    headers: { "Authorization": `Bearer ${API_KEY}` },
  });
  if (!res.ok) throw new Error("Failed to toggle like");
  return res.json();
}

// Login 
export async function loginUser(email: string, password: string) {
  // บัญชีจริง
  if (email === "siriporn.ka@kkumail.com" && password === "Password123") {
    return { id: 2, name: "Siriporn Kaewlinla", email };
  }

  // บัญชีทดสอบ
  if (email === "test" && password === "1234") {
    return { id: 1, name: "Test User", email };
  }

  throw new Error("Invalid credentials");
}
