import React from "react";
import * as Markup from "./task.styles";

export type Props = {
  content: string;
  guid: string;
  isActive: boolean;
  handleTaskDel: (guid: string) => () => void;
  handleTaskToggleActive: (guid: string) => () => string;
};

export const Task = (props: Props) => {
  const { content, guid, isActive, handleTaskDel, handleTaskToggleActive } =
    props;

  return (
    <Markup.Task key={guid}>
      <Markup.TaskData
        isActive={isActive}
        onClick={handleTaskToggleActive(guid)}
      >
        {content}
      </Markup.TaskData>
      <Markup.TaskButton onClick={handleTaskDel(guid)}>Del</Markup.TaskButton>
    </Markup.Task>
  );
};
