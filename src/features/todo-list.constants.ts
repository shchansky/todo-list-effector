import { v4 } from "uuid";

export const mockData = [
    { content: "First task from mock", isActive: true, guid: v4() },
    { content: "Second task from mock", isActive: true, guid: v4() },
    { content: "Third task from mock", isActive: true, guid: v4() },
  ];