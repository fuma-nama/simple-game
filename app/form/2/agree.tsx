import { useState } from "react";

export function Movingbox(props: React.HTMLAttributes<HTMLDivElement>) {
  const [isUp, setIsUp] = useState(false);

  return (
    <div
      {...props}
      onMouseEnter={() => setIsUp((prev) => !prev)}
      onClick={(e) => e.preventDefault()}
      data-up={isUp}
    />
  );
}
