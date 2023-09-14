"use client";
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

export default function Settings() {
  return (
    <>
      <h1 className="font-bold text-4xl">Settings</h1>
      <Developer />
    </>
  );
}

function Developer() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      level: "",
    },
  });

  const onSubmit = form.handleSubmit((v) => {
    set({
      level: Number(v.level),
    });
    const path = `/form/${v.level}`;
    router.prefetch(path);
    router.push(path);
  });

  return (
    <div className="mt-8 border rounded-md overflow-hidden">
      <div className="px-4 py-2 text-sm font-medium bg-secondary text-muted-foreground">
        Developer Settings
      </div>
      <form className="p-4" onSubmit={onSubmit}>
        <Form {...form}>
          <FormField
            name="level"
            control={form.control}
            rules={{
              required: "Can't be empty",
              min: { value: 1, message: "Too Small" },
              max: { value: 8, message: "Too Big" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="From 1 to 8" />
                </FormControl>
                <FormDescription>Jump to the specified level</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </form>
    </div>
  );
}
