import styled from "styled-components";

export const Container = styled.div`
  width: 350px;
  box-sizing: border-box;
`;

export const Form = styled.form`
  display: flex;
`;

export const Textarea = styled.textarea`
  width: 300px;
  height: 60px;
  resize: none;
`;

export const Button = styled.button``;

export const Tasks = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Task = styled.li`
  list-style: none;
  display: flex;
  min-height: 30px;

  word-wrap: break-word;
`;

export const TaskData = styled.span<{ isActive: boolean }>`
  color: ${(isActive) => ( !isActive ? "red" : "black")};
  width: 300px;
  border: 1px solid black;
  flex-grow: 2;
  word-wrap: break-word;
`;

export const TaskButton = styled.button``;
