import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { saveAffUser, saveUser } from "@/utils//userUtils";
import {
  AFF_STORAGE_KEY,
  FUNNEL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
  UTM_PIXEL_META,
} from "@/constants/data";
import getOneLinkRepository from "./app/(dashboard)/links/_repository/getOneRepository";

export async function middleware(request: NextRequest) {
  const urlSearchParams = new URLSearchParams(request.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const publicUrl = [
    "login",
    "verified",
    "forgot-password",
    "reset-password",
    "lp",
    "checkout",
  ];
  // get user request cookie
  const userCookie = request.cookies.get(USER_LOCAL_STORAGE_KEY)?.value ?? "";
  let pathname = request.nextUrl.pathname.split("/")[1];
  // check if user cookie is in request

  if (pathname == "lp") {
    const data = await getOneLinkRepository(
      Number(params["i"]) || 0,
      params["type"], params["aff"]
    );
    // const affCookie = request.cookies.get(AFF_STORAGE_KEY)?.value ?? "";
    const aff = params["aff"];
    const pixel = data.data.utm_pixel;

    const res = NextResponse.redirect(
      data.data.url +
        "?" +
        (params["whatsapp"] ? "whatsapp="+params["whatsapp"] : "") +
        "&aff=" +
        aff +
        "&funnel=" +
        data.data.name,
      302,
    ); // External website URL

    const expire = new Date();
    expire.setDate(expire.getDate() + 180);
    const domain = '.'+process.env.NEXT_PUBLIC_DOMAIN;
    
    res.cookies.set(FUNNEL_STORAGE_KEY, data.data.name, {
      domain,
      path: '/',       // Path for which the cookie is valid
      sameSite: 'none',  // Control cross-site request behavior
      secure: true,
      maxAge: 60 * 60 * 24 * 180, // Optional: Set max-age for cookie (in seconds) - 180 day (6 month)
      expires: expire, // Optional: expires in 1 day
    });

    // if (pixel && pixel.trim() != '') {
      res.cookies.set(UTM_PIXEL_META, pixel ?? '', {
        domain,
        path: '/',       // Path for which the cookie is valid
        sameSite: 'none',  // Control cross-site request behavior
        secure: true,
        maxAge: 60 * 60 * 24 * 180, // Optional: Set max-age for cookie (in seconds) - 180 day (6 month)
        expires: expire, // Optional: expires in 1 day
      });
    // }

    if (aff && aff != "") {
      res.cookies.set(AFF_STORAGE_KEY, aff, {
        domain,
        path: '/',       // Path for which the cookie is valid
        sameSite: 'none',  // Control cross-site request behavior
        secure: true,
        maxAge: 60 * 60 * 24 * 180, // Optional: Set max-age for cookie (in seconds)
        expires: expire, // Optional: expires in 1 day
      });
    }
    return res;
  }

  // validate if user token is valid
  if (userCookie && !["lp","checkout"].includes(pathname)) {
    // if valid delete cookie and use new token valid data
    // request.cookies.delete(USER_LOCAL_STORAGE_KEY)

    // check if request path name if from auth or default path redirect to dashboard
    const response = publicUrl.includes(pathname)
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();

    return response;
  }

  const response = publicUrl.includes(pathname)
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/login", request.url));

  // user cookie doesn't exit or token isn't valid redirect to auth
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
