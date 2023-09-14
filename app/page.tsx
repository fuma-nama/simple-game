import { Card } from "@/components/ui/card";
import { StartGame } from "./start_bn";
import { cookies } from "next/headers";
import { cookie_name } from "@/utils/cookie-manager";

export default function Home() {
  const cookie = cookies().get(cookie_name);

  return (
    <>
      <h1 className="font-bold text-4xl mb-2">Welcome Back</h1>
      <p className="text-muted-foreground">Test your patience</p>
      <StartGame started={cookie != null} />
      <Card className="mt-4">
        <h2 className="font-semibold text-lg mb-2">Prerequisites</h2>
        <p className="text-sm text-muted-foreground">
          This game requires hotkeys, as well as some hacky ways to win. Make
          sure you are on laptop/desktop, with a keyboard and mouse before
          getting started.
        </p>
      </Card>
      <Card className="mt-4">
        <h2 className="font-semibold text-lg mb-2">In Development</h2>
        <p className="text-sm text-muted-foreground">
          Feel free to support this project by pressing a star!
        </p>
      </Card>
    </>
  );
}
