import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// middleware auth
export const middleware = (request: NextRequest) => {
  // init cookie store
  const cookieStore = cookies();
  // get token from cookie
  const token = cookieStore.get("access-token");

  // validate token
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

// matcher routes
export const config = {
  matcher: ["/home", "/profile", "/settings"],
};
