export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip middleware for static assets (they're handled by _headers file)
  // This ensures React Router v7 client-side routing works correctly
  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/_") ||
    pathname.match(
      /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json)$/i
    )
  ) {
    return context.next();
  }

  // Get the response from the next handler
  const response = await context.next();

  // Only modify HTML responses (for React Router v7 SPA routing)
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  // Clone response to modify headers for HTML responses
  const newResponse = new Response(response.body, response);

  // Add security headers for HTML responses
  // These complement the _headers file for dynamic HTML responses
  newResponse.headers.set("X-Content-Type-Options", "nosniff");
  newResponse.headers.set("X-Frame-Options", "DENY");
  newResponse.headers.set("X-XSS-Protection", "1; mode=block");
  newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Add Permissions-Policy header
  newResponse.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  return newResponse;
}
