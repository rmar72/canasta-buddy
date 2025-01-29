export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/", "/my-canasta"], // Protect these routes
};