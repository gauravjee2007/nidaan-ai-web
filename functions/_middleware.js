export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // ✅ Allow login & login API always
  if (
    url.pathname === "/login" ||
    url.pathname === "/login.html" ||
    url.pathname === "/do-login"
  ) {
    return next();
  }

  // 🔒 Protect chat page
  if (url.pathname.startsWith("/chat") && !isLoggedIn) {
    return Response.redirect(url.origin + "/login", 302);
  }

  // ✅ Allow everything else
  return next();
}
