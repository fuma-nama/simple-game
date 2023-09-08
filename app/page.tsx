import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl mb-2">Welcome Back</h1>
      <p className="text-muted-foreground">Test your patience</p>
      <div className="text-card-foreground bg-card rounded-lg border p-4 mt-8">
        <h2 className="font-medium mb-2">Getting Started</h2>
        <p className="text-sm text-muted-foreground">
          Hello our dear user, you have to complete a few forms in order to
          start using our service.
        </p>
        <Button className="mt-4" size="sm" asChild>
          <Link href="/form/1">Start</Link>
        </Button>
      </div>
    </>
  );
}
