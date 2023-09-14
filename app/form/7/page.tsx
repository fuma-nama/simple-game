"use client";
import NextImage from "next/image";
import StrongDogeImage from "@/public/strong_doge.png";
import StrongDogeCryImage from "@/public/strong_doge_cry.png";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/utils/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const texts = [
  "Oh, my dear... You finally come?",
  "This is the last step of this form, congrats!",
  "Unfortunately, I can't let you go...",
];

const win_texts = [
  "Oh... my son, you win!",
  "You can go now...",
  "Submit your form and escape from here, forever",
  "Goodbye...",
  null,
  "...Me?",
  "I've been trapped here for countless years",
  "I'm fine, I love to be lonely, as always",
  "I tried to escape from here through the small hole of disk",
  "I am tired... to keep struggling in this place",
  "Maybe someday, I can fly on the wonderful sky, breathe fresh air, enjoy the freedom",
  null,
];

type End = "win";

export default function Page() {
  const [[step, level], setStep] = useState<[number, End | "default"]>([
    0,
    "default",
  ]);
  const { idRef, toast, toasts } = useToast();

  useEffect(() => {
    const lines = {
      win: win_texts,
      default: texts,
    }[level];

    if (lines[step] == null) return;
    toast({
      id: (idRef.current++).toString(),
      description: lines[step],
      onOpenChange(open) {
        if (!open) setStep(([v, l]) => [v + 1, l]);
      },
      action: <ToastAction altText="Next">Next</ToastAction>,
    });
  }, [step, level]);

  return (
    <>
      <Toaster toasts={toasts} />
      <NextImage
        alt="doge"
        src={
          {
            win: StrongDogeCryImage,
            default: StrongDogeImage,
          }[level]
        }
        width={500}
      />
      {(level !== "default" || step > 2) && (
        <Game setEnd={(end) => setStep([0, end])} />
      )}
      <Dialog open={level === "win" && win_texts[step] == null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Form</DialogTitle>
            <DialogDescription>
              End application and back to dashboard
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button asChild>
              <Link href="/">Confirm</Link>
            </Button>

            <Button
              variant="secondary"
              onClick={() => setStep((prev) => [prev[0] + 1, prev[1]])}
            >
              {step >= win_texts.length
                ? "Help Doge"
                : "Why don't you escape from here?"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type Object = {
  isAttacked?: boolean;
  isDestroyed?: boolean;
  shouldDestroy(): boolean;
  attack?: () => number;
  render: () => void;
};

type Listener = { execute(): void };
function Game({ setEnd }: { setEnd: (v: End) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const ctx = element.getContext("2d")!;
    let mounted = true;
    let state: End | undefined;
    let mouse: { x: number; y: number } | null = null;
    let timers: Listener[] = [];
    let objects: Object[] = [];
    let doge_hp = 100;
    let hp = 100;
    let tick = 0;

    element.width = window.outerWidth;
    element.height = window.outerHeight;
    let is_doge_attack = false;
    let attack_bn: Object | null = null;
    let hurt_state_time: number | null = null;
    const doge_attack = new Image(100, 95);
    const strong_doge = new Image(348, 300);
    const sword = new Image(493, 1920);
    strong_doge.src = "/strong_doge_attack.png";
    doge_attack.src = "/doge_attack.png";
    sword.src = "/sword.png";

    const inter_font = (
      getComputedStyle(document.body).fontFamily ?? "Arial"
    ).split(",")[0];

    const listener = (e: MouseEvent) => {
      mouse = { x: e.x, y: e.y };
    };

    const next = () => {
      if (!mounted) return;
      if (!state && doge_hp <= 0) {
        state = "win";
        setEnd("win");
      }

      tick++;
      if (tick === Number.MAX_VALUE) tick = 0;

      ctx.clearRect(0, 0, element.width, element.height);
      ctx.textBaseline = "top";

      const newObjects: Object[] = [];
      for (const object of objects) {
        const num = object.attack?.();
        if (num != null && num > 0 && !object.isAttacked) {
          const end = new Date(Date.now());
          end.setMilliseconds(end.getMilliseconds() + 1000);
          hurt_state_time = end.getTime();

          object.isAttacked = true;
          hp -= num;
        }

        object.render();
        if (object.shouldDestroy()) {
          object.isDestroyed = true;
          continue;
        }
        newObjects.push(object);
      }

      objects = newObjects;

      for (const timer of timers) {
        timer.execute();
      }

      requestAnimationFrame(next);
    };

    /**
     * @param interval in milliseconds
     */
    const createTimer = (interval: number, callback: () => void) => {
      const getNext = () => {
        const next = new Date(Date.now());
        next.setMilliseconds(next.getMilliseconds() + interval);
        return next;
      };
      let next = getNext();

      return {
        execute: () => {
          if (state === "win") return;
          if (Date.now() >= next.getTime()) {
            callback();
            next = getNext();
          }
        },
      };
    };

    const drawHeart = (x: number, y: number, w: number, h: number) => {
      ctx.translate(x, y);
      ctx.lineWidth = 1.0;

      const d = Math.min(w, h);
      ctx.beginPath();
      ctx.moveTo(0, d / 4);
      ctx.quadraticCurveTo(0, 0, d / 4, 0);
      ctx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
      ctx.quadraticCurveTo(d / 2, 0, (d * 3) / 4, 0);
      ctx.quadraticCurveTo(d, 0, d, d / 4);
      ctx.quadraticCurveTo(d, d / 2, (d * 3) / 4, (d * 3) / 4);
      ctx.lineTo(d / 2, d);
      ctx.lineTo(d / 4, (d * 3) / 4);
      ctx.quadraticCurveTo(0, d / 2, 0, d / 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.translate(-x, -y);
    };

    const createDogeAttack = (x: number, y: number): Object => {
      x -= doge_attack.width;
      return {
        shouldDestroy() {
          return x >= element.width;
        },
        attack() {
          if (inBoundingBox(x, y, doge_attack.width, doge_attack.height))
            return 10;
          return 0;
        },
        render() {
          ctx.drawImage(doge_attack, x, y);

          x += element.width * 0.01;
        },
      };
    };

    function inBoundingBox(x: number, y: number, w: number, h: number) {
      return (
        mouse != null &&
        mouse.x >= x &&
        mouse.x <= x + w &&
        mouse.y >= y &&
        mouse.y <= y + h
      );
    }

    const createSwordAttack = (x: number, y: number): Object => {
      let delay = 50;
      const offset = 150;

      return {
        shouldDestroy() {
          return y >= sword.height * 2;
        },
        attack() {
          if (
            inBoundingBox(
              x + offset,
              y - sword.height,
              sword.width - offset * 2,
              sword.height
            )
          )
            return 30;

          return 0;
        },
        render() {
          delay--;
          if (delay > 0) {
            ctx.fillStyle =
              Math.round(tick / 10) % 2 === 0
                ? "rgba(255,0,0,0.1)"
                : "rgba(255,0,0,0.2)";

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
        attack() {
          const offset_y = 50;
          if (
            inBoundingBox(
              x,
              y + offset_y,
              strong_doge.width,
              strong_doge.height - offset_y * 2
            )
          )
            return 30;
          return 0;
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
          const metrics = ctx.measureText("Attack");
          const pressed = inBoundingBox(
            x,
            y,
            metrics.actualBoundingBoxRight + padding_x * 2,
            metrics.actualBoundingBoxDescent + padding_y * 2
          );

          if (pressed) doge_hp -= 100;
          return pressed;
        },
        render() {
          ctx.font = `bold 16px ${inter_font}`;
          const text = "Attack";
          const metrics = ctx.measureText(text);

          ctx.fillStyle = "white";
          ctx.fillRect(
            x,
            y,
            metrics.width + padding_x * 2,
            metrics.actualBoundingBoxDescent + padding_y * 2
          );

          ctx.fillStyle = "black";
          ctx.fillText(text, x + padding_x, y + padding_y);
        },
      };
    };

    const createUI = (): Object => {
      return {
        shouldDestroy() {
          return false;
        },
        render() {
          if (!state) {
            const x = element.width - 20 * 11,
              y = element.height - 140;

            let text = `${hp} HP`;
            ctx.font = `bold 16px ${inter_font}`;
            let metrics = ctx.measureText(text);
            ctx.fillStyle = "white";
            ctx.fillText(text, x, y);
            ctx.translate(0, metrics.actualBoundingBoxDescent + 12);

            ctx.strokeStyle = "black";
            ctx.fillStyle = "red";
            for (let i = 0; i * 10 < hp; i++) {
              drawHeart(x + i * 20, y, 20, 20);
            }

            ctx.resetTransform();
          }

          // Doge HP
          if (!state) {
            const w = 300;
            ctx.fillStyle = "gray";
            ctx.fillRect((element.width - w) / 2, 0, w, 20);
            ctx.fillStyle = "red";
            ctx.fillRect(
              (element.width - w) / 2,
              0,
              Math.max(w * (doge_hp / 100), 0),
              20
            );
          }

          // mouse
          if (mouse) {
            let color = "#FF0000";
            if (
              hurt_state_time != null &&
              hurt_state_time >= Date.now() &&
              Math.round(tick / 10) % 2 === 0
            ) {
              color = "#FF000030";
            }

            ctx.strokeStyle = "white";
            ctx.fillStyle = color;
            drawHeart(mouse.x - 10, mouse.y - 10, 20, 20);
          }
        },
      };
    };

    objects.push(createUI());
    timers.push(
      createTimer(100, () => {
        if (is_doge_attack) {
          objects.push(createDogeAttack(0, mouse?.y ?? 0));
        }
      }),
      createTimer(2000, () => {
        is_doge_attack = !is_doge_attack;

        if (strong_doge.complete && Math.random() > 0.5) {
          objects.push(createStrongDogeAttack(element.width, mouse?.y ?? 0));
        }

        if (sword.complete) {
          objects.push(
            createSwordAttack((element.width - sword.width) * Math.random(), 0)
          );
        }

        if ((!attack_bn || attack_bn.isDestroyed) && Math.random() > 0.5) {
          attack_bn = createAttackButton(
            (element.width - 100) * Math.random(),
            (element.height - 100) * Math.random()
          );

          objects.push(attack_bn);
        }
      })
    );

    doge_attack.onload = next;
    window.addEventListener("mousemove", listener);

    return () => {
      mounted = false;
      window.removeEventListener("mousemove", listener);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      width={0}
      height={0}
      className="fixed inset-0 cursor-none"
    />
  );
}
