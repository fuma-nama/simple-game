import { Button } from "@/components/ui/button";
import { PackageIcon } from "lucide-react";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { description?: string };
}) {
  return (
    <>
      <h1 className="font-bold text-2 xl inline-flex items-center mb-2">
        <PackageIcon className="mr-2 w-9 h-9" />
        Failed to Register
      </h1>
      <p className="text-muted-foreground">{searchParams.description}</p>
      <Button className="w-fit mt-4">
        <Link href="/">Try Again</Link>
      </Button>
    </>
  );
}
