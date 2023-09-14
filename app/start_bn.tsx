"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { set } from "@/utils/cookie-manager";
import { useRouter } from "next/navigation";

export function StartGame({ started }: { started: boolean }) {
  const router = useRouter();

  const onContinue = () => {
    router.prefetch("/form/1");
    router.push("/form/1");
  };

  const onClick = () => {
    set({
      level: 1,
    });

    router.prefetch("/form/1");
    router.push("/form/1");
  };

  if (started) {
    return (
      <Card className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Continue Application</h2>
        <p className="text-sm text-muted-foreground">
          You have started an application earlier, please continue or restart
          it.
        </p>
        <div className="flex flex-col gap-2 mt-6 sm:flex-row">
          <Button onClick={onContinue}>Continue</Button>
          <Button onClick={onClick} variant="secondary">
            New Game
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <h2 className="font-semibold text-lg mb-2">Getting Started</h2>
      <p className="text-sm text-muted-foreground">
        Hello our dear user, you have to complete a few forms in order to start
        using our service.
      </p>
      <Button className="mt-6 max-sm:w-full" onClick={onClick}>
        Start
      </Button>
    </Card>
  );
}
