"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";
import { set } from "@/utils/cookie-manager";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const topics = [
  ["Doge", "You are lying"],
  ["Cat", "Don't you think cats will take over our planet?"],
  ["Anime", "Simp."],
  ["Technology", "You are lying"],
  ["AI Girlfriend", "Simp."],
  ["Art", "I think you only wanna draw anime girls, Simp."],
  ["Math", "You are lying"],
  ["NSFW", "Simp."],
  ["How to kill people", "Hey! Don't do illegal things"],
  ["Yagoo"],
  ["J-POP", "Simp."],
  ["Hololive", "Simp."],
  ["Japan girls", "Simp."],
  ["VTuber", "Simp."],
  ["How to buy a gun", "Hey! Don't do illegal things"],
  ["How to make a gun", "Hey! Don't do illegal things"],
];

export default function Page() {
  const form = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      topic: undefined,
    },
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit(() => {
    set({
      level: 4,
    });
    router.push("/form/4");
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Preferences</h1>
      <p className="text-muted-foreground">What do you like?</p>
      <DogeBackground />
      <form
        onSubmit={onSubmit}
        className="p-4 border bg-card text-card-foreground rounded-lg mt-8 space-y-4"
      >
        <Form {...form}>
          <FormField
            name="topic"
            control={form.control}
            rules={{
              validate: (v) => {
                if (!v) return "You must choose one";
                const topic = topics.find(([item]) => item === v);
                if (!topic) return "Invalid Topic";
                const [_, message] = topic;

                if (message) return message;
              },
            }}
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Favourite Topic</FormLabel>
                <div className="flex flex-row flex-wrap gap-2">
                  {topics.map(([item]) => (
                    <Toggle
                      key={item}
                      size="sm"
                      pressed={value === item}
                      onPressedChange={(v) => onChange(v ? item : null)}
                    >
                      {item}
                    </Toggle>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </Form>
      </form>
    </>
  );
}

function DogeBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const size = 100;
    const image = new Image(size, size);
    let mounted = true;
    let points: [x: number, y: number][] = [];
    element.width = window.outerWidth;
    element.height = window.outerHeight;
    image.onload = next;

    image.src = "/doge.png";

    const context = element.getContext("2d")!;
    let mousePos: [x: number, y: number] | null = null;

    const listener = (e: MouseEvent) => {
      mousePos = [e.x, e.y];
    };

    window.addEventListener("mousemove", listener);

    const timer = setInterval(() => {
      const xOffset = element.height / 2;
      const x = (element.width + xOffset) * Math.random();
      points.push([x - xOffset - size, -size]);
    }, 200);

    function next() {
      if (!mounted) return;
      context.clearRect(0, 0, element.width, element.height);
      let died = false;
      const newPoints: typeof points = [];

      for (const point of points) {
        context.drawImage(image, point[0], point[1], size, size);
        point[0] += 10;
        point[1] += 10;

        if (mousePos) {
          const inX = mousePos[0] >= point[0] && mousePos[0] <= point[0] + size;
          const inY = mousePos[1] >= point[1] && mousePos[1] <= point[1] + size;

          if (inX && inY) died = true;
        }

        if (point[0] <= element.width || point[1] <= element.height) {
          newPoints.push(point);
        }
      }

      points = newPoints;

      if (died) {
        context.fillStyle = "rgba(255,0,0,0.2)";
        context.fillRect(0, 0, element.width, element.height);
        setTimeout(() => {
          router.push("/form/failed?description=Doge ate your mouse");
        }, 500);
        return;
      }

      requestAnimationFrame(next);
    }

    return () => {
      mounted = false;
      clearInterval(timer);
      window.removeEventListener("mousemove", listener);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      width={0}
      height={0}
      className="fixed inset-0 pointer-events-none"
    />
  );
}
