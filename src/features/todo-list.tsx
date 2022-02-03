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

const valueButtonClicked = createEvent();
const taskDeleted = createEvent();

const valueChanged = createEvent<string>();
const $value = createStore("");

$value.on(valueChanged, (_oldValue, newValue) => newValue.trim());

export const TodoList = () => {
  const value = useStore($value);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    valueButtonClicked();
    if (value) data.push(`${value}`);
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

// const inputChange = createEvent<string>();

// const store = createStore("");

// store.on(inputChange, (currentState, arg) => {
//   const newState = arg;
//   return newState;
// })

// inputChange("myText")

/// --------------------

// const input = document.createElement("input");

// const inputChange = (arg: string) => {
//   const event = new CustomEvent("input-change", { detail: arg });
// };

// input.addEventListener("input-change", (event: CustomEvent<string>) => {
//   console.log(event.detail)
// });
