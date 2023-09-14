"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { set } from "@/utils/cookie-manager";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function PassForm({ wordsCount }: { wordsCount: number }) {
  const form = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      words: "",
    },
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit(() => {
    set({
      level: 6,
    });
    router.push("/form/6");
  });

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
              if (num != wordsCount) return "Wrong Answer";
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Words Count in the first paragraph</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Title not included</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </Form>
    </form>
  );
}
