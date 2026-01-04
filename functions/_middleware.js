export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // ✅ PUBLIC / ALLOWED PATHS
  const publicPaths = [
    "/",
    "/login",
    "/login.html",
    "/do-login",
    "/register",
    "/register.html"
  ];

  // Allow public pages
  if (publicPaths.includes(url.pathname)) {
    return next();
  }

  // 🔒 Protect chat page
  if (url.pathname.startsWith("/chat") && !isLoggedIn) {
    return Response.redirect(
      new URL("/login", url.origin),
      302
    );
  }

  // Allow everything else
  return next();
}
