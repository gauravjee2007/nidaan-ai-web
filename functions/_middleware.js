export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // Allow public pages
  if (
    url.pathname === "/login" ||
    url.pathname === "/login.html" ||
    url.pathname === "/do-login" ||
    url.pathname === "/" ||
    url.pathname.startsWith("/assets")
  ) {
    return next();
  }

  // Protect chat
  if (url.pathname.startsWith("/chat") && !isLoggedIn) {
    return Response.redirect(url.origin + "/login", 302);
  }

  return next();
}

