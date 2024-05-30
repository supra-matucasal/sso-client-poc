import { removeCookie } from "@/utils/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

  //Remove the cookie session
  removeCookie('session')

  //Redirect to logout endpoint
  //   returnTo: https://supra.com/blastoff
  // client_id: iGJ1u5DC1n7hB7f63SOl15vweh7hqGZE
  const client_id = process.env.AUTH_SSO_CLIENT_ID;
  const redirect_logout_url = process.env.AUTH_REDIRECT_LOGOUT_URL;

  return NextResponse.redirect(`${process.env.AUTH_SSO_SERVER}/api/auth/logout?client_id=${client_id}&redirect_logout_url=${redirect_logout_url}`, { status: 302 });

}