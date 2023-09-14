"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useForm } from "react-hook-form";
import QuestionImage from "@/public/question-1.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { set } from "@/utils/cookie-manager";

const langs = [
  ["Kotlin", `println("Hello World")`],
  ["Python", `print("Hello World")`],
  ["C", `printf("Hello World")`],
];

const pictures = [
  ["Zuckerberg", "/zuckerberg.jpg"],
  ["Neuro", "/neuro.png"],
  ["Vedal", "/vedal.png"],
];

export default function Page() {
  const form = useForm({
    defaultValues: {
      lang: undefined as string | undefined,
      answer: undefined as string | undefined,
      bot: undefined as string | undefined,
    },
    reValidateMode: "onSubmit",
  });
  const first_answer = 0;
  const router = useRouter();
  const onSubmit = form.handleSubmit(
    () => {
      set({
        level: 5,
      });
      router.replace("/form/5");
    },
    () => {
      const params = new URLSearchParams({
        description: "Haha I caught you, robot",
      });
      router.replace("/form/failed?" + params);
    }
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Verify</h1>
      <p className="text-muted-foreground">
        Are you a robot? Our product is only available for humans.
      </p>
      <form
        onSubmit={onSubmit}
        className="p-4 border bg-card text-card-foreground rounded-lg mt-8 space-y-4"
      >
        <Form {...form}>
          <FormField
            name="lang"
            control={form.control}
            rules={{
              validate: (v) => {
                if (v !== langs[first_answer][0]) return "Wrong Answer";
              },
            }}
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Choose the code written in {langs[first_answer][0]}
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {langs.map(([lang, code]) => (
                      <div
                        key={lang}
                        onClick={() => onChange(lang)}
                        className={cn(
                          "border border-transparent rounded-lg cursor-pointer",
                          lang === value && "border-primary"
                        )}
                      >
                        <CodeBlock>{code}</CodeBlock>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="answer"
            control={form.control}
            rules={{
              validate: (v) => {
                if (v !== "b") return "Wrong Answer";
              },
            }}
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Answer a Simple Math Question</FormLabel>
                <Image
                  alt="Question"
                  src={QuestionImage}
                  className="rounded-lg"
                />
                <FormControl>
                  <RadioGroup {...field} onValueChange={onChange}>
                    <Radio value="a">-16</Radio>
                    <Radio value="b">-3</Radio>
                    <Radio value="c">3</Radio>
                    <Radio value="d">16</Radio>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bot"
            control={form.control}
            rules={{
              validate: (v) => {
                if (v !== "Vedal") return "Wrong Answer";
              },
            }}
            render={({ field: { value, onChange, ref } }) => (
              <FormItem>
                <FormLabel>Choose a picture of human</FormLabel>
                <div
                  ref={ref}
                  className="grid grid-cols-2 lg:grid-cols-3 gap-2 w-fit"
                >
                  {pictures.map(([label, src]) => (
                    <button
                      type="button"
                      key={label}
                      onClick={() => onChange(label)}
                      className={cn(
                        "rounded-lg overflow-hidden",
                        label === value && "ring-2 ring-primary"
                      )}
                    >
                      <Image alt={label} src={src} width={200} height={200} />
                    </button>
                  ))}
                </div>
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

function Radio({ value, children }: { value: string; children: string }) {
  const id = useId();

  return (
    <div className="flex flex-row items-center">
      <RadioGroupItem id={id} value={value} />
      <label htmlFor={id} className="flex-1 text-sm font-medium pl-2">
        {children}
      </label>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-sm bg-secondary/50 text-secondary-foreground overflow-auto border p-4 rounded-lg">
      <code className="grid">
        {children.split("\n").map((line, i) => (
          <span key={i}>{line.length === 0 ? " " : line}</span>
        ))}
      </code>
    </pre>
  );
}
