import React from "react";
import styled from "styled-components";
import { Heading } from "./Heading";
import { Summary } from "./Summary";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 8px;
`;

type HeaderProps = {
  question: string;
  numberOfVotes: number;
};

export const Header: React.FC<HeaderProps> = ({ question, numberOfVotes }) => {
  return (
    <Container>
      <Heading>{question}</Heading>
      <Summary>
        {numberOfVotes
          ? `${numberOfVotes} already answered`
          : "Your answer is going to be the first!"}
      </Summary>
    </Container>
  );
};
