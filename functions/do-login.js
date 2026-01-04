export async function onRequestPost({ request }) {
  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");

  // 🔐 HARDCODED DEMO CREDENTIALS
  if (username === "admin" && password === "nidaan123") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "nidaan_auth=true; Path=/; HttpOnly; SameSite=Lax",
        "Location": "/chat"
      }
    });
  }

  // ❌ Invalid login
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/login?error=1"
    }
  });
}
