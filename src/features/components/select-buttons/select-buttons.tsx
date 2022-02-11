import React from "react";
import * as Markup from "./select-buttons.styles";

export type Props = {
  handleStatusSet: (
    status: "all" | "active" | "completed"
  ) => () => "all" | "active" | "completed";
};



export const SelectButtons = ({handleStatusSet}: Props) => {
  return (
    <>
      <hr />
      <Markup.StatusButton onClick={handleStatusSet("all")}>
        All
      </Markup.StatusButton>
      <Markup.StatusButton onClick={handleStatusSet("active")}>
        Active
      </Markup.StatusButton>
      <Markup.StatusButton onClick={handleStatusSet("completed")}>
        Completed
      </Markup.StatusButton>
      <hr />
    </>
  );
};
