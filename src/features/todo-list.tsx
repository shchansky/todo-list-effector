import React from "react";
import * as Markup from "./todo-list.styles";

const data = new Array(1);

export const TodoList = () => {
  const [value, setValue] = React.useState("");
  const handleChange = React.useCallback((e) => setValue(e.target.value), []);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    data.push(value);
    setValue((prev) => (prev = ""));
  };

  return (
    <Markup.Container>
      <Markup.Form onSubmit={handleClick}>
        <Markup.Textarea value={value} onChange={handleChange} />
        <Markup.Button type="submit">Set!</Markup.Button>
      </Markup.Form>
      <hr />

      <div>
        {data.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </div>
    </Markup.Container>
  );
};
