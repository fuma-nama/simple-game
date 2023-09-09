"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export function PassForm() {
  const form = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      words: "",
    },
  });

  const onSubmit = form.handleSubmit(() => {});

  return (
    <form
      className="p-4 border bg-card text-card-foreground rounded-lg mt-8 space-y-4"
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <FormField
          name="words"
          control={form.control}
          rules={{
            validate: (v) => {
              const num = Number(v);

              if (Number.isNaN(num)) return "Invalid value";
              if (num != 983) return "Wrong Answer";
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Words Count</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </Form>
    </form>
  );
}
