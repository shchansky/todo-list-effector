import React from "react";
import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import * as Markup from "./todo-list.styles";

type TaskData = {
  content: string;
  isActive: boolean;
};

const taskSet = createEvent<string>();
const taskDel = createEvent<number>();
const taskToggleActive = createEvent<number>();
const valueSet = createEvent<string>();

const $value = createStore("");
const $tasks = createStore<TaskData[]>([{ content: "Hi", isActive: true }]);

$value.on(valueSet, (_oldValue, newValue) => newValue.trim());
$tasks
  .on(taskSet, (data, value) => {
    if (value.length > 0) data.push({ content: `${value}`, isActive: true });
  })
  .on(taskDel, (data, index) => data.filter((_, i) => i !== index))

  .on(taskToggleActive, (data, index) =>
    data.map((el, i) => {
      if (i === index) {
        return { ...el, isActive: !el.isActive };
      }

      return el;
    })
  );

export const TodoList = () => {
  const value = useStore($value);
  const data = useStore($tasks);
  console.log(data)

  const handleTaskSet =
    (value: string) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      taskSet(value);
      valueSet("");
    };

  const handleTaskDel = React.useCallback(
    (index: number) => () => {
      taskDel(index);
    },
    [data]
  );

  return (
    <Markup.Container>
      <Markup.Form onSubmit={handleTaskSet(value)}>
        <Markup.Textarea
          value={value}
          onChange={(e) => valueSet(e.target.value)}
        />
        <Markup.Button type="submit">Set!</Markup.Button>
      </Markup.Form>
      <hr />
      <Markup.Tasks>
        {data.map((el, index) => (
          <Markup.Task key={index}>
            <Markup.TaskData
              isActive={el.isActive}
              onClick={() => taskToggleActive(index)}
            >
              {el.content}
            </Markup.TaskData>

            <Markup.TaskButton onClick={handleTaskDel(index)}>
              Del
            </Markup.TaskButton>
          </Markup.Task>
        ))}
      </Markup.Tasks>
    </Markup.Container>
  );
};
