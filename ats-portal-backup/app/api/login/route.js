import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { access_token } = body;

  // Store ATS token in secure cookie
  const res = NextResponse.json({ ok: true });

  res.cookies.set("ats_access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/"
  });

  return res;
}
