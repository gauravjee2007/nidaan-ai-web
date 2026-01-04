export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 🔐 Read cookie
  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // ✅ Allow login related paths
  if (
    url.pathname === "/login.html" ||
    url.pathname === "/do-login" ||
    url.pathname === "/"
  ) {
    return next();
  }

  // 🔒 Protect chat page
  if (url.pathname === "/chat.html" && !isLoggedIn) {
    return Response.redirect(url.origin + "/login.html", 302);
  }

  // ✅ Allow all other requests
  return next();
}
