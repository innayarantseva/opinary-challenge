import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Configurations } from "./App";
import { Header } from "./Header";
import { Option } from "./Option";
import { Options } from "./Options";

export const getPercentage = (
  totalNumber: number,
  partialNumber: number
): string => {
  return ` — ${Math.round(((partialNumber * 100) / totalNumber) * 100) / 100}%`;
};

const Container = styled.section`
  font-family: sans-serif;
  color: #171717;

  min-width: 268px;
  max-width: 468px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 0px 16px 4px rgb(0 0 0 / 10%);
  border-radius: 16px;

  padding: 16px;
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

  const overallNumberOfVotes = useMemo(() => {
    return Object.values(questionResults).reduce((acc, num) => (acc += num), 0);
  }, [questionResults]);

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
    <Container>
      <Header question={question} numberOfVotes={overallNumberOfVotes} />

      <Options>
        {options.map((option, index) => {
          return (
            <Option
              key={`option-${index}`}
              onClick={() => onOptionClick(option)}
              selected={answer === option}
            >
              <div>
                {option}
                {answer &&
                  getPercentage(overallNumberOfVotes, questionResults[option])}
              </div>
            </Option>
          );
        })}
      </Options>
    </Container>
  );
};
