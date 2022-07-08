import React from "react";

export type Configurations = {
  question: string;
  answers: [string, string, string];
};

export const App: React.FC<{ configurations: Configurations }> = ({
  configurations,
}) => {
  return (
    <section>
      <h1>The Poll</h1>
      <div>{configurations.question}</div>
      {configurations.answers.length ? (
        <ul>
          {configurations.answers.map((answer, index) => (
            <li key={`a-${index}`}>{answer}</li>
          ))}
        </ul>
      ) : (
        <div>No answers were provided, sorry!</div>
      )}
    </section>
  );
};
