import { getCookie } from "@/utils/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {


  const client_id = 'iGJ1u5DC1n7hB7f63SOl15vweh7hqGZE';
  const redirect_url = process.env.AUTH_REDIRECT_URL;
  const state = 'eyJyZXR1cm5UbyI6Ii9ibGFzdG9mZiJ9';


  //If we already have a session-cookie we should redirect to the callback URL
  const cookieName = process.env.SESSION_NAME;
  if (cookieName) {
    const session = getCookie(cookieName)
    if (session) {
      const code = Math.random().toString(36).substring(7);
      const redirectWithState = `${redirect_url}?state=${state}&code=${code}`;
      return NextResponse.redirect(redirectWithState, { status: 302 });
    }
  }


  return NextResponse.redirect(`${process.env.AUTH_SSO_SERVER}/api/auth/authorize?client_id=${client_id}&redirect_url=${redirect_url}&state=${state}`, { status: 302 });

}