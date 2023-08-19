import { SortableContext, useSortable } from "@dnd-kit/sortable";
import PlusIcon from "../utils/PlusIcon";

import { Id, Task, Column } from "../types/task.type";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskListCard from "./TaskListCard";

interface Props {
  column: Column;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

const TaskListLane = ({
  column,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-400 opacity-40 border-2 border-blue-500 w-[350px] h-[500px] max-h-[500px] rounded-md
        flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 w-[280px] lg:w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="bg-gray-600 text-white text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3
        font-bold flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-gray-800 px-2 py-1 text-sm rounded-full">
            {column.id === "todo" && <>0</>}
            {column.id === "doing" && <>1</>}
            {column.id === "done" && <>2</>}
          </div>
          {!editMode && column.title}
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskListCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center border-gray-600 border-2 rounded-md p-4 hover:bg-blue-500
        hover:text-white active:bg-blue-600 hover:border-gray-600"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Thêm ghi chú
      </button>
    </div>
  );
};

export default TaskListLane;
