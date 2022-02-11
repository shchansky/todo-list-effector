import React from "react";
import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import { v4 } from "uuid";
import { Form, Tasks, TaskData, SelectButtons } from "./components";
import * as Markup from "./todo-list.styles";

const taskSet = createEvent<string>();
const taskDel = createEvent<string>();
const taskToggleActive = createEvent<string>();
const valueSet = createEvent<string>();

const statusSet = createEvent<"all" | "active" | "completed">();

const mockData = [
  { content: "First task from mock", isActive: true, guid: v4() },
  { content: "Second task from mock", isActive: true, guid: v4() },
  { content: "Third task from mock", isActive: true, guid: v4() },
];

const $value = createStore("");
const $tasks = createStore<TaskData[]>(mockData);
const $status = createStore<"all" | "active" | "completed">("all");

$value.on(valueSet, (_oldValue, newValue) => newValue.trim());
$tasks
  .on(taskSet, (data, value) => {
    if (value.length > 0)
      data.push({ content: `${value}`, isActive: true, guid: v4() });
  })
  .on(taskDel, (data, guid) => data.filter((el) => el.guid !== guid))

  .on(taskToggleActive, (data, guid) =>
    data.map((el) => {
      if (el.guid === guid) {
        return { ...el, isActive: !el.isActive };
      }
      return el;
    })
  );

$status.on(statusSet, (_oldStatus, newStatus) => newStatus);

export const TodoList = () => {
  const value = useStore($value);
  const data = useStore($tasks);
  const status = useStore($status);

  const handleTaskSet = React.useCallback(
    (value: string) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      taskSet(value);
      valueSet("");
    },
    []
  );

  const handleChangeValue = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => valueSet(e.target.value),
    []
  );

  const handleTaskDel = React.useCallback(
    (guid: string) => () => {
      taskDel(guid);
    },
    []
  );

  const handleTaskToggleActive = React.useCallback(
    (guid: string) => () => taskToggleActive(guid),
    []
  );

  const handleStatusSet = React.useCallback(
    (status: "all" | "active" | "completed") => () => statusSet(status),
    []
  );

  return (
    <Markup.Container>
      <Form
        value={value}
        handleTaskSet={handleTaskSet}
        handleChangeValue={handleChangeValue}
      />

      <SelectButtons handleStatusSet={handleStatusSet} />

      <Tasks
        data={data}
        status={status}
        handleTaskDel={handleTaskDel}
        handleTaskToggleActive={handleTaskToggleActive}
      />
    </Markup.Container>
  );
};
