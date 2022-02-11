import React from "react";
import * as store from "../store";
import { Form, Tasks, SelectButtons } from "./components";
import * as hooks from "./todo-list.hooks";
import * as Markup from "./todo-list.styles";

export const TodoList = () => {
  /* #region Editor Store */
  const { value } = store.layout.useState();
  const { data } = store.layout.useState();
  const { status } = store.layout.useState();
  /* #endregion */

  const {
    handleTaskSet,
    handleChangeValue,
    handleTaskDel,
    handleTaskToggleActive,
    handleStatusSet,
  } = hooks.useHandlers();

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
