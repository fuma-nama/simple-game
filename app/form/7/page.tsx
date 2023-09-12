"use client";
import NextImage from "next/image";
import StrongDogeImage from "@/public/strong_doge.png";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/utils/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";

const texts = [
  "Oh, my dear... You finally come?",
  "This is the last step of this form, congrats!",
  "Unfortunately, I can't let you go...",
];

export default function Page() {
  const [step, setStep] = useState(0);
  const { toast, toasts } = useToast();

  useEffect(() => {
    if (step >= texts.length) return;
    toast({
      id: step.toString(),
      description: texts[step],
      onOpenChange(open) {
        if (!open) setStep((prev) => prev + 1);
      },
      action: <ToastAction altText="Next">Next</ToastAction>,
    });
  }, [step]);

  return (
    <>
      <Toaster toasts={toasts} />
      <NextImage alt="doge" src={StrongDogeImage} width={500} />
      <Game />
    </>
  );
}

type Object = { shouldDestroy(): boolean; render: () => void };

function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const ctx = element.getContext("2d")!;
    let mounted = true;
    let mouse: { x: number; y: number } | null = null;
    let objects: Object[] = [];

    element.width = window.outerWidth;
    element.height = window.outerHeight;
    let is_doge_attack = false;
    const doge_attack = new Image(100, 95);
    const strong_doge = new Image(348, 300);
    const sword = new Image(493, 1920);
    strong_doge.src = "/strong_doge_attack.png";
    doge_attack.src = "/doge_attack.png";
    sword.src = "/sword.png";

    const listener = (e: MouseEvent) => {
      mouse = { x: e.x, y: e.y };
    };

    const next = () => {
      if (!mounted) return;
      ctx.clearRect(0, 0, element.width, element.height);

      if (mouse) {
        ctx.fillStyle = "red";
        ctx.fillRect(mouse.x - 10, mouse.y - 10, 20, 20);
      }

      const newObjects: Object[] = [];
      for (const object of objects) {
        object.render();
        if (object.shouldDestroy()) continue;
        newObjects.push(object);
      }

      objects = newObjects;
      requestAnimationFrame(next);
    };

    const createDogeAttack = (x: number, y: number): Object => {
      return {
        shouldDestroy() {
          return x >= element.width * 2;
        },
        render() {
          for (let i = 0; i < element.width; i += 100) {
            ctx.drawImage(doge_attack, x + i - element.width, y);
          }

          x += element.width * 0.01;
        },
      };
    };

    const createSwordAttack = (x: number, y: number): Object => {
      let delay = 50;
      let tick = 0;
      const offset = 100;

      return {
        shouldDestroy() {
          return y >= sword.height * 2;
        },
        render() {
          delay--;
          if (delay > 0) {
            ctx.fillStyle =
              tick > 15 / 2 ? "rgba(255,0,0,0.1)" : "rgba(255,0,0,0.2)";
            tick = tick > 15 ? 0 : tick + 1;

            ctx.fillRect(
              x + offset,
              0,
              sword.width - offset * 2,
              element.height
            );
            return;
          }

          ctx.drawImage(sword, x, y - sword.height);
          y += element.height * 0.03;
        },
      };
    };

    const createStrongDogeAttack = (x: number, y: number): Object => {
      return {
        shouldDestroy() {
          return x <= -strong_doge.width;
        },
        render() {
          ctx.drawImage(strong_doge, x, y);
          x -= element.width * 0.02;
        },
      };
    };

    const createAttackButton = (x: number, y: number): Object => {
      const padding_x = 20,
        padding_y = 10;
      return {
        shouldDestroy() {
          return false;
        },
        render() {
          ctx.textBaseline = "top";
          ctx.font = "24px Arial";
          const metrics = ctx.measureText("Attack");

          ctx.fillStyle = "white";
          ctx.fillRect(
            x,
            y,
            metrics.width + padding_x * 2,
            metrics.actualBoundingBoxDescent + padding_y * 2
          );

          ctx.fillStyle = "black";
          ctx.fillText("Attack", x + padding_x, y + padding_y);
        },
      };
    };

    objects.push(createAttackButton(0, 0));
    const timer = setInterval(() => {
      if (is_doge_attack) {
        objects.push(createDogeAttack(0, mouse?.y ?? 0));
      }
      if (sword.complete && Math.random() > 0.5) {
        objects.push(createSwordAttack(element.width * Math.random(), 0));
      }
      if (strong_doge.complete && Math.random() > 0.9) {
        objects.push(createStrongDogeAttack(element.width, mouse?.y ?? 0));
      }
    }, 500);

    const timer2 = setInterval(() => {
      is_doge_attack = !is_doge_attack;
    }, 2000);

    doge_attack.onload = next;
    window.addEventListener("mousemove", listener);

    return () => {
      mounted = false;
      clearInterval(timer);
      clearInterval(timer2);
      window.removeEventListener("mousemove", listener);
    };
  }, []);

  return <canvas ref={ref} width={0} height={0} className="fixed inset-0" />;
}
