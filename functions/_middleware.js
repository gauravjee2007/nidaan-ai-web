export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // ✅ Always allow static assets
  if (
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg")
  ) {
    return next();
  }

  // ✅ If user hits /login → send to login.html
  if (url.pathname === "/login") {
    return Response.redirect(new URL("/login.html", url.origin), 302);
  }

  // ✅ Allow login page itself
  if (url.pathname === "/login.html" || url.pathname === "/") {
    return next();
  }

  // 🔒 Protect chat page
  if (url.pathname.startsWith("/chat") && !isLoggedIn) {
    return Response.redirect(new URL("/login.html", url.origin), 302);
  }

  return next();
}
