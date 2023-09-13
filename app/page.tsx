import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl mb-2">Welcome Back</h1>
      <p className="text-muted-foreground">Test your patience</p>
      <Card className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Getting Started</h2>
        <p className="text-sm text-muted-foreground">
          Hello our dear user, you have to complete a few forms in order to
          start using our service.
        </p>
        <Button className="mt-6 max-sm:w-full" asChild>
          <Link href="/form/1">Start</Link>
        </Button>
      </Card>
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
