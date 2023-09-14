"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set } from "@/utils/cookie-manager";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const router = useRouter();
  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(() => {
    set({
      level: 2,
    });
    router.push("/form/2");
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Basic Information</h1>
      <p className="text-muted-foreground">Let us know more about you</p>

      <form
        className="p-4 border bg-card text-card-foreground rounded-lg mt-8 space-y-4"
        onSubmit={onSubmit}
      >
        <fieldset className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="email"
            placeholder="Email"
            {...form.register("name", {
              required: { value: true, message: "Can't be empty" },
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </fieldset>
        <fieldset className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...form.register("password", {
              required: { value: true, message: "Can't be empty" },
              minLength: {
                value: 4000,
                message: "Must be longer than 4000 characters",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </fieldset>
        <Button>Submit</Button>
      </form>
    </>
  );
}

function Error({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm border border-destructive bg-destructive/50 p-2 rounded-md text-destructive-foreground">
      {children}
    </p>
  );
}
