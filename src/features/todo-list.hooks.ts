import React from "react";

import * as store from "../store";

export const useHandlers = () => {
  const handleTaskSet = React.useCallback(
    (value: string) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      store.layout.taskSet(value);
      store.layout.valueSet("");
    },
    []
  );

  const handleChangeValue = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      store.layout.valueSet(e.target.value),
    []
  );

  const handleTaskDel = React.useCallback(
    (guid: string) => () => {
      store.layout.taskDel(guid);
    },
    []
  );

  const handleTaskToggleActive = React.useCallback(
    (guid: string) => () => store.layout.taskToggleActive(guid),
    []
  );

  const handleStatusSet = React.useCallback(
    (status: "all" | "active" | "completed") => () =>
      store.layout.statusSet(status),
    []
  );

  return {
    handleTaskSet,
    handleChangeValue,
    handleTaskDel,
    handleTaskToggleActive,
    handleStatusSet,
  };
};
