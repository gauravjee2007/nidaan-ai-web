export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const cookie = request.headers.get("Cookie") || "";
  const isLoggedIn = cookie.includes("nidaan_auth=true");

  // Allow login + root
  if (
    url.pathname === "/" ||
    url.pathname === "/login.html" ||
    url.pathname === "/do-login"
  ) {
    return next();
  }

  // Protect chat (both forms)
  if (
    (url.pathname === "/chat" || url.pathname === "/chat.html") &&
    !isLoggedIn
  ) {
    return Response.redirect(url.origin + "/login.html", 302);
  }

  return next();
}
