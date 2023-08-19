import { createReducer } from "@reduxjs/toolkit";
import { Task } from "../../types/task.type";

import { updateTaskList } from "../actions/task.action";

// Interface declair
interface TaskState {
  taskList: Task[];
}

// InitialState value
const initialState: TaskState = {
  taskList: [
    {
      id: "1",
      columnId: "todo",
      content: "Tham gia lớp teacher1",
    },
    {
      id: "2",
      columnId: "doing",
      content: "Trò chuyện với các thành viên lớp teacher1",
    },
    {
      id: "3",
      columnId: "doing",
      content: "Làm test 1",
    },
    {
      id: "4",
      columnId: "done",
      content: "Làm test 3",
    },
  ],
};

const taskReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateTaskList, (state, action) => {
    if (action.payload) {
      state.taskList = action.payload;
    }
  });
});

export default taskReducer;
