import { NextRequest, NextResponse } from "next/server";
import { cookie_name, decode } from "./utils/cookie-manager";

const middleware = (req: NextRequest) => {
  if (!req.nextUrl.pathname.startsWith("/form/")) return NextResponse.next();

  const segment = req.nextUrl.pathname.split("/")[2];
  const isEnding = segment.endsWith("_end");
  const level = Number(segment);
  if (Number.isNaN(level) && !isEnding) return NextResponse.next();
  const cookie = req.cookies.get(cookie_name);

  if (cookie == null) return NextResponse.redirect(new URL("/", req.url));

  const data = decode(cookie.value);

  if (isEnding && data.level >= 8) return NextResponse.next();
  if (level === data.level) return NextResponse.next();

  return NextResponse.redirect(new URL(`/form/${data.level}`, req.url));
};

export const config = {
  matcher: ["/form/:level*"],
};

export default middleware;
