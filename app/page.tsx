import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { StartGame } from "./start_bn";
import { cookies } from "next/headers";
import { cookie_name, decode } from "@/utils/cookie-manager";

export default function Home() {
  const cookie = cookies().get(cookie_name);
  const data = cookie ? decode(cookie.value) : null;

  return (
    <>
      <h1 className="font-bold text-4xl mb-2">Welcome Back</h1>
      <p className="text-muted-foreground mb-8">Test your patience</p>
      <StartGame
        state={
          data == null ? "default" : data.level === 8 ? "ended" : "started"
        }
      />
      <Card className="mt-4">
        <CardTitle>Prerequisites</CardTitle>
        <CardDescription>
          This game requires hotkeys, as well as some hacky ways to win. Make
          sure you are on laptop/desktop, with a keyboard and mouse before
          getting started.
        </CardDescription>
      </Card>
      <Card className="mt-4">
        <CardTitle>In Development</CardTitle>
        <CardDescription>
          Feel free to support this project by pressing a star!
        </CardDescription>
      </Card>
    </>
  );
}
