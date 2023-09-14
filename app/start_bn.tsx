"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { set } from "@/utils/cookie-manager";
import { useRouter } from "next/navigation";

export function StartGame({
  state,
}: {
  state: "ended" | "started" | "default";
}) {
  const router = useRouter();

  const onContinue = () => {
    router.prefetch("/form/1");
    router.push("/form/1");
  };

  const onNew = () => {
    set({
      level: 1,
    });

    router.prefetch("/form/1");
    router.push("/form/1");
  };

  if (state === "ended") {
    return (
      <Card>
        <CardTitle>No Forms</CardTitle>
        <CardDescription>
          Welcome! You have submitted the application already.
        </CardDescription>
        <Button className="mt-6 max-sm:w-full" onClick={onNew}>
          Reset
        </Button>
      </Card>
    );
  }

  if (state === "started") {
    return (
      <Card>
        <CardTitle>Continue Application</CardTitle>
        <CardDescription>
          You have started an application earlier, please continue or restart
          it.
        </CardDescription>
        <div className="flex flex-col gap-2 mt-6 sm:flex-row">
          <Button onClick={onContinue}>Continue</Button>
          <Button onClick={onNew} variant="secondary">
            New Game
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>Getting Started</CardTitle>
      <CardDescription>
        Hello our dear user, you have to complete a few forms in order to start
        using our service.
      </CardDescription>
      <Button className="mt-6 max-sm:w-full" onClick={onNew}>
        Start
      </Button>
    </Card>
  );
}
