"use client";
import Image from "next/image";
import StrongDogeImage from "@/public/strong_doge.png";
import { Button } from "@/components/ui/button";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { set } from "@/utils/cookie-manager";

const texts = new Map<number, ReactNode>([
  [10, "Help me"],
  [11, "I've been here for countless years"],
  [12, "I can't escape"],
  [13, "I don't want to be lonely anymore"],
  [14, "Are you here?"],
  [15, "Who are you?"],
  [4, <Content />],
]);

function Content() {
  const router = useRouter();

  const onClick = () => {
    set({
      level: 7,
    });
    router.replace("/form/7");
  };

  return (
    <>
      <p>Don't press it, please</p>
      <Button size="sm" className="mt-auto ml-auto" onClick={onClick}>
        Submit
      </Button>
    </>
  );
}

export default function Page() {
  const [started, setStarted] = useState(false);
  const [windows, setWindows] = useState<DialogProps[]>([]);

  const setTop = useCallback((index: number) => {
    setWindows((prev) => {
      let max_z = 0;

      for (const item of prev) {
        max_z = Math.max(item.z, max_z);
      }

      return prev.map((item, i) =>
        i === index ? { ...item, z: max_z + 1 } : item
      );
    });
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setWindows((prev) => {
        if (prev.length > 40) return prev;

        return [
          ...prev,
          {
            z: 1,
            setTop: () => setTop(prev.length),
            position: {
              x: (window.outerWidth - 300) * Math.random(),
              y: (window.outerHeight - 300) * Math.random(),
            },
            children: texts.get(prev.length) ?? <p>Don't leave me alone</p>,
          },
        ];
      });
    }, 50);

    return () => clearInterval(timer);
  }, [started]);

  return (
    <div className="m-auto text-center">
      <h1 className="text-3xl font-bold mb-2">Last Question</h1>
      <p className="text-muted-foreground mb-4">???</p>
      <div className="relative">
        {started && (
          <Image
            alt="doge"
            src={StrongDogeImage}
            width={300}
            className="animate-in fade-in duration-1000 opacity-10"
            draggable={false}
          />
        )}
        <Button
          className="absolute top-4 left-[50%] translate-x-[-50%]"
          onClick={() => setStarted(true)}
        >
          {started ? "Broken" : "Submit"}
        </Button>
        {windows.map((win, i) => (
          <WindowDialog key={i} {...win} />
        ))}
      </div>
    </div>
  );
}

type Position = {
  x: number;
  y: number;
};

type DialogProps = {
  z: number;
  position: Position;
  setTop: () => void;
  children?: ReactNode;
};

function WindowDialog(props: DialogProps) {
  const [position, setPosition] = useState(props.position);
  const [isPressed, setPressed] = useState<boolean>(false);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isPressed) return;
      const rect = e.currentTarget.getBoundingClientRect();

      const max_x = window.outerWidth - rect.width;
      const max_y = window.outerHeight - rect.height;
      setPosition((prev) => ({
        x: Math.max(0, Math.min(prev.x + e.movementX, max_x)),
        y: Math.max(0, Math.min(prev.y + e.movementY, max_y)),
      }));
    },
    [isPressed]
  );

  useEffect(() => {
    if (!isPressed) return;

    const initial = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = initial;
    };
  }, [isPressed]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 p-2 flex flex-col gap-4 border w-[300px] min-h-[200px] rounded-md bg-background text-sm text-foreground text-left",
        isPressed && "ring ring-ring"
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: props.z,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPressed(false)}
      onMouseDown={() => {
        props.setTop();
        setPressed(true);
      }}
      onMouseUp={() => setPressed(false)}
    >
      <p className="text-xs p-1 rounded-md text-muted-foreground bg-secondary text-center">
        Window
      </p>
      {props.children}
    </div>
  );
}
