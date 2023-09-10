"use client";
import { Fragment, ReactNode, useEffect, useState } from "react";

export function Article({
  footer,
  children,
}: {
  footer: ReactNode;
  children: ReactNode;
}) {
  const [repeated, setRepeated] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.scrollY > 0) window.scrollTo({ top: window.scrollY - 10 });
    });
    const listener = () => {
      if (
        window.scrollY >=
        (document.scrollingElement!.scrollHeight -
          document.scrollingElement!.clientHeight) /
          2
      )
        setRepeated((v) => Math.min(10, v + 1));
    };

    window.addEventListener("scroll", listener);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <>
      <article className="mt-16">
        {Array(repeated)
          .fill(null)
          .map((_, i) => (
            <Fragment key={i}>{children}</Fragment>
          ))}
      </article>
      {repeated >= 10 && footer}
    </>
  );
}
