import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Configurations } from "./App";

const Options = styled.ul`
  padding: 0;
  margin: 0;
`;

type OptionProps = {
  selected?: boolean;
};

const Option = styled.li`
  list-style: none;
  background: ${(props: OptionProps) =>
    props.selected ? "palevioletred" : "white"};
`;

type PollProps = Configurations;

type PollResults = Record<string, Record<string, number>>;

export const Poll: React.FC<PollProps> = ({ question, options }) => {
  const [answer, setAnswer] = useState<string | undefined>();
  const [results, setResults] = useLocalStorage<PollResults>("pollResults", {});

  const questionResults = useMemo(() => {
    return (
      results[question] ||
      options.reduce((acc, option) => {
        acc[option] = 0;
        return acc;
      }, {} as Record<string, number>)
    );
  }, [results, question, options]);

  const onOptionClick = useCallback(
    (option: string) => {
      if (!answer) {
        setAnswer(option);

        const updatedAnswerCount = questionResults[option] + 1;

        setResults({
          ...results,
          [question]: { ...questionResults, [option]: updatedAnswerCount },
        });
      }
    },
    [answer, setAnswer, results, questionResults]
  );

  return (
    <section>
      <h2>{question}</h2>
      <Options>
        {options.map((option, index) => {
          return (
            <Option
              key={`option-${index}`}
              onClick={() => onOptionClick(option)}
              selected={answer === option}
            >
              {option}
              {answer && ` ${questionResults[option]}`}
            </Option>
          );
        })}
      </Options>
    </section>
  );
};
