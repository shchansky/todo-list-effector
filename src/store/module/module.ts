import { createStore, createEvent, combine } from "effector";
import { useStore } from "effector-react";
import { v4 } from "uuid";

type TaskData = {
  content: string;
  isActive: boolean;
  guid: string;
};

export const mockData = [
  { content: "First task from mock", isActive: true, guid: v4() },
  { content: "Second task from mock", isActive: true, guid: v4() },
  { content: "Third task from mock", isActive: true, guid: v4() },
];

const taskSet = createEvent<string>();
const taskDel = createEvent<string>();
const taskToggleActive = createEvent<string>();
const valueSet = createEvent<string>();
const statusSet = createEvent<"all" | "active" | "completed">();

const value = createStore("");
const data = createStore<TaskData[]>(mockData);
const status = createStore<"all" | "active" | "completed">("all");

value.on(valueSet, (_oldValue, newValue) => newValue.trim());
data
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

status.on(statusSet, (_oldStatus, newStatus) => newStatus);

const $store = combine({ value, data, status });

export const layout = {
  useState: () => useStore($store),
  taskSet,
  taskDel,
  taskToggleActive,
  valueSet,
  statusSet,
};
