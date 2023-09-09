import { Fragment } from "react";
import { Article } from "./Article";
import data from "./data.json";
import { PassForm } from "./form";

export default async function Page() {
  const placeholder = data;

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground">
        You have to read this, even though you won't.
      </p>
      <Article>
        {["Using this services", "Service Provider", "Age Requirements"].map(
          (title) => (
            <Fragment key={title}>
              <h2 className="font-bold text-2xl mt-16 mb-6 first:mt-0">
                {title}
              </h2>
              <p className="text-muted-foreground whitespace-break-spaces select-none">
                {placeholder}
              </p>
            </Fragment>
          )
        )}
      </Article>
      <PassForm />
    </>
  );
}
