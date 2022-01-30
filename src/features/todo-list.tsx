import React from "react";
import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import * as Markup from "./todo-list.styles";

// const data = new Array(1);

// export const TodoList = () => {
//   const [value, setValue] = React.useState("");
//   const handleChange = React.useCallback((e) => setValue(e.target.value), []);

//   const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     data.push(value);
//     setValue((prev) => (prev = ""));
//   };

//   return (
//     <Markup.Container>
//       <Markup.Form onSubmit={handleClick}>
//         <Markup.Textarea value={value} onChange={handleChange} />
//         <Markup.Button type="submit">Set!</Markup.Button>
//       </Markup.Form>
//       <hr />

//       <Markup.Tasks>
//         {data.map((el, index) => (
//           <Markup.Task key={index}>{el}</Markup.Task>
//         ))}
//       </Markup.Tasks>
//     </Markup.Container>
//   );
// };

const data = new Array(1);

const valueChanged = createEvent<string>();
const valueButtonClicked = createEvent();
const taskDeleted = createEvent();
const $value = createStore("").on(
  valueChanged,
  (_oldValue, newValue) => newValue
);

export const TodoList = () => {
  const value = useStore($value);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    valueButtonClicked();
    data.push(`${value}`);
    console.log(value);
    valueChanged("");
  };

  const deleteTask = React.useCallback(
    (index: number) => () => {
      data.splice(index, 1);
      taskDeleted();
    },
    []
  );

  return (
    <Markup.Container>
      <Markup.Form onSubmit={handleClick}>
        <Markup.Textarea
          value={value}
          onChange={(e) => valueChanged(e.target.value)}
        />
        <Markup.Button type="submit">Set!</Markup.Button>
      </Markup.Form>
      <hr />
      <Markup.Tasks>
        {data.map((el, index) => (
          <Markup.Task key={index}>
            <Markup.TaskData>{el}</Markup.TaskData>

            <Markup.TaskButton onClick={deleteTask(index)}>
              Del
            </Markup.TaskButton>
          </Markup.Task>
        ))}
      </Markup.Tasks>
    </Markup.Container>
  );
};
