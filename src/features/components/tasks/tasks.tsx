import React from "react";
import { Task, TaskProps } from "../task";
import * as Markup from "./task.styles";

export type TaskData = {
  content: string;
  isActive: boolean;
  guid: string;
};

export type Props = Omit<TaskProps, "content" | "guid" | "isActive"> & {
  data: TaskData[];
  status: "all" | "active" | "completed";
};

export const Tasks = (props: Props) => {
  const { data = [], handleTaskDel, handleTaskToggleActive, status } = props;

  return (
    <Markup.Tasks>
      {status === "active" &&
        data
          .filter((el) => el.isActive)
          .map((el) => (
            <Task
              content={el.content}
              guid={el.guid}
              isActive={el.isActive}
              handleTaskDel={handleTaskDel}
              handleTaskToggleActive={handleTaskToggleActive}
            />
          ))}

      {status === "all" &&
        data.map((el) => (
          <Task
            content={el.content}
            guid={el.guid}
            isActive={el.isActive}
            handleTaskDel={handleTaskDel}
            handleTaskToggleActive={handleTaskToggleActive}
          />
        ))}

      {status === "completed" &&
        data
          .filter((el) => !el.isActive)
          .map((el) => (
            <Task
              content={el.content}
              guid={el.guid}
              isActive={el.isActive}
              handleTaskDel={handleTaskDel}
              handleTaskToggleActive={handleTaskToggleActive}
            />
          ))}
    </Markup.Tasks>
  );
};
