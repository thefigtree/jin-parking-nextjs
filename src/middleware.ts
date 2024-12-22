// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(["mybookings(.*)", "/book/(.*)"]);

// const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

// export default clerkMiddleware(async (auth, req: NextRequest) => {
//   const { userId, redirectToSignIn, sessionClaims } = await auth();

//   if (!userId && (isProtectedRoute(req) || isAdminRoute(req))) {
//     return redirectToSignIn({ returnBackUrl: req.url });
//   }

//   if (userId && isAdminRoute(req)) {
//     if (sessionClaims?.metadata.role === "admin") {
//       return NextResponse.next();
//     } else {
//       return new Response("가입절차가 필요합니다.", { status: 401 });
//     }
//   }

//   return NextResponse.next();
// });

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/mybookings(.*)", "/book/(.*)"]);

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, redirectToSignIn, sessionClaims } = auth();

  if (!userId && (isProtectedRoute(req) || isAdminRoute(req))) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  if (userId && isAdminRoute(req)) {
    if (sessionClaims?.metadata.role === "admin") {
      return NextResponse.next();
    } else {
      return new Response(`You are not authorized`, { status: 401 });
    }
  }

  return NextResponse.next();
});
