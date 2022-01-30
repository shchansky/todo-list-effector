import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 350px;
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
  /* justify-content: start; */
  gap: 4px;
`;

export const Task = styled.li`
  list-style: none;
  min-height: 30px;
  border: 1px solid black;
  word-wrap: break-word;
`;
