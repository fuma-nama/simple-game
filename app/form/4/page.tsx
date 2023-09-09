"use client";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = form.handleSubmit((v) => {});

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Verify</h1>
      <p className="text-muted-foreground">
        Are you a robot? Our product is only available for humans.
      </p>
      <form
        onSubmit={onSubmit}
        className="p-4 border bg-card text-card-foreground rounded-lg mt-8 space-y-4"
      ></form>
    </>
  );
}
