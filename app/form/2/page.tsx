"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "./data.json";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMemo } from "react";

export default function Page() {
  const form = useForm({
    defaultValues: {
      country: undefined as string | undefined,
      staffs: 0,
    },
  });
  const allowed_staffs = useMemo(() => {
    return Math.round(1500 * Math.random());
  }, []);

  const allowed_country = "SK";
  const onSubmit = form.handleSubmit(() => {});

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Your Company</h1>
      <p className="text-muted-foreground">
        Tell us more details of your company
      </p>
      <form
        onSubmit={onSubmit}
        className="p-4 border bg-card text-card-foreground rounded-lg mt-8 space-y-4"
      >
        <Form {...form}>
          <FormField
            name="country"
            control={form.control}
            rules={{
              validate: (v) => {
                if (!v) return "This is required";
                if (v !== allowed_country)
                  return "Must be " + countries[allowed_country];
              },
            }}
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Country/Region</FormLabel>
                <Select value={value} onValueChange={onChange}>
                  <FormControl>
                    <SelectTrigger {...field}>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(countries).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="staffs"
            control={form.control}
            rules={{
              validate: (v) => {
                if (v != allowed_staffs)
                  return `We only accept companies with ${allowed_staffs} Staffs`;
              },
            }}
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Staffs</FormLabel>
                <p className="text-xs">{value} Staffs</p>
                <FormControl>
                  <Slider
                    value={[value]}
                    onValueChange={(v) => onChange(v[0])}
                    max={1500}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  How many staffs do your company have
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </Form>
      </form>
    </>
  );
}