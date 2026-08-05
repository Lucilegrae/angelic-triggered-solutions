import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: any) {
          res.cookies.set(name, "", options);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  const isPortalRoute = path.startsWith("/portal");
  const isLoginRoute = path.startsWith("/portal/login");
  const isResetRoute = path.startsWith("/portal/reset-password");
  const isCallbackRoute = path.startsWith("/auth/callback");

  if (
    isPortalRoute &&
    !isLoginRoute &&
    !isResetRoute &&
    !isCallbackRoute &&
    !user
  ) {
    return NextResponse.redirect(new URL("/portal/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/portal/:path*"],
};
