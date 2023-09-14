"use client";
import SkyImage from "@/public/doge_sky.jpg";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const texts = [
  "You brought doge to the free land",
  "There is fill with grass, with beautiful river and anime girls",
  "- Happy End",
];

export default function Page() {
  const [text, setText] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    if (text >= texts.length) router.replace("/");
  }, [text]);

  return (
    <div className="relative">
      <Image
        alt="sky"
        src={SkyImage}
        priority
        className="cursor-pointer"
        onClick={() => setText((prev) => prev + 1)}
      />
      {texts[text] && (
        <div className="absolute inset-x-0 bottom-0 bg-background/50 backdrop-blur-lg p-4 pointer-events-none">
          {texts[text]}
        </div>
      )}
      <p className="absolute bottom-4 right-4 inline-flex items-center pointer-events-none">
        Next <ChevronRightIcon />
      </p>
    </div>
  );
}
