"use client";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

export function CompanyDraw({ onChange }: { onChange: (v: string) => void }) {
  const ref = useRef<CanvasDraw>(null);

  return (
    <div className="p-2 bg-card w-fit flex flex-col border rounded-lg gap-2">
      <CanvasDraw
        ref={ref}
        catenaryColor="white"
        onChange={(canvas) => onChange(canvas.getSaveData())}
        canvasWidth={200}
        canvasHeight={200}
        brushRadius={2}
        brushColor="white"
        lazyRadius={0}
        backgroundColor="transparent"
      />
      <Button
        variant="secondary"
        size="sm"
        type="button"
        onClick={() => ref.current?.clear()}
      >
        Clear
      </Button>
    </div>
  );
}
