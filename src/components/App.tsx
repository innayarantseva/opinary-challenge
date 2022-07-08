import React from "react";
import { Poll } from "./Poll";

export type Configurations = {
  question: string;
  options: [string, string, string];
};

export const App: React.FC<Configurations> = (configurations) => {
  return (
    <section>
      <h1>The Poll</h1>
      <Poll {...configurations} />
    </section>
  );
};
