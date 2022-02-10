import React from "react";
import * as Markup from "./from.styles";

export type Props = {
  value: string;
  handleTaskSet: (
    value: string
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangeValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => string;
};

export const Form = (props: Props) => {
  const { value, handleTaskSet, handleChangeValue } = props;

  return (
    <Markup.Form onSubmit={handleTaskSet(value)}>
      <Markup.Textarea value={value} onChange={handleChangeValue} />
      <Markup.Button type="submit">Set!</Markup.Button>
    </Markup.Form>
  );
};
