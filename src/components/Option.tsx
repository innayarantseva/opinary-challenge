import styled from "styled-components";

type OptionProps = {
  selected?: boolean;
};

export const Option = styled.li`
  list-style: none;
  background: ${(props: OptionProps) =>
    props.selected ? "#7dd3fc" : "transparent"};

  display: flex;
  justify-content: center;

  border-radius: 8px;
  padding: 8px;
  margin: 4px 0;

  cursor: pointer;

  &:hover {
    background: ${(props: OptionProps) =>
      props.selected ? "#38bdf8" : "#e0f2fe"};
  }
`;
