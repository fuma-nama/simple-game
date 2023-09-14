"use client";
import { get } from "@/utils/cookie-manager";
import { useEffect, useState } from "react";

export default function Analyst() {
  return (
    <>
      <h1 className="font-bold text-4xl mb-2">Analyst</h1>
      <p className="text-muted-foreground">
        Shared information of your account.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="p-4 border rounded-lg bg-card ">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Level
          </p>
          <span className="font-bold text-2xl">
            <Level />
          </span>
        </div>
      </div>
    </>
  );
}

function Level() {
  const [level, setLevel] = useState<number>();
  useEffect(() => {
    const data = get();
    setLevel(data?.level ?? 0);
  }, []);

  if (level == null) return <div className="bg-secondary h-8 rounded-md" />;
  if (level === 0) return <>Unknown</>;

  return <>{level}</>;
}
