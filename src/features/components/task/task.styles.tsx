import styled from "styled-components";

export const Task = styled.li`
  list-style: none;
  display: flex;
  min-height: 30px;

  word-wrap: break-word;
`;

export const TaskData = styled.span<{ isActive: boolean }>`
  text-decoration: ${({ isActive }) => (!isActive ? "line-through" : "none")};
  width: 300px;
  border: 1px solid black;
  flex-grow: 2;
  word-wrap: break-word;
`;

export const TaskButton = styled.button``;

