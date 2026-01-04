export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // ✅ ALWAYS allow login & static pages
  if (
    url.pathname === "/login" ||
    url.pathname === "/login.html" ||
    url.pathname === "/register" ||
    url.pathname === "/register.html" ||
    url.pathname === "/" ||
    url.pathname.startsWith("/assets")
  ) {
    return next();
  }

  // 🔒 Protect chat page ONLY
  if (url.pathname === "/chat" || url.pathname === "/chat.html") {
    if (!isLoggedIn) {
      return Response.redirect(url.origin + "/login", 302);
    }
  }

  return next();
}
