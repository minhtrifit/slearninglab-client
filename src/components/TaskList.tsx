import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "../types/task.type";
import TaskListLane from "./TaskListLane";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskListCard from "./TaskListCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";
import { Button } from "antd";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import LoadingCpm from "./LoadingCpm";

import {
  updateTaskList,
  getTaskByUsername,
} from "../redux/reducers/task.reducer";

interface PropType {
  isDarkMode: boolean;
}

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Cần làm",
  },
  {
    id: "doing",
    title: "Đang tiến hành",
  },
  {
    id: "done",
    title: "Hoàn tất",
  },
];

const defaultTasks: Task[] = [
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
];

const generateId = () => {
  /* Generate a random number between 0 and 10000 */
  // return Math.floor(Math.random() * 10001);

  const uid = v4();
  return uid;
};

const TaskList = (props: PropType) => {
  const { isDarkMode } = props;

  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const isSaving = useSelector<RootState, boolean>(
    (state) => state.task.isSaving
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const handleGetTaskList = async (username: string) => {
    const rs = await dispatchAsync(getTaskByUsername(username));

    if (rs.type === "task/get_task_by_username/fulfilled") {
      setTasks(rs.payload);
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (username !== undefined) {
      handleGetTaskList(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="">
      <div className="flex justify-end py-5">
        <Button
          type="primary"
          onClick={async () => {
            const data = { taskList: tasks, username: username };

            const rs = await dispatchAsync(updateTaskList(data));

            if (rs.type === "task/update_task_list/fulfilled") {
              toast.success("Lưu thành công");
            } else {
              toast.error("Lưu thất bại");
            }
          }}
        >
          Lưu thay đổi
        </Button>
      </div>
      {isSaving ? (
        <div className="w-[250px] md:w-[500px] lg:w-[800px] xl:w-[1000px]">
          <LoadingCpm />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4">
            <div className="flex flex-col xl:flex-row gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <TaskListLane
                    isDarkMode={isDarkMode}
                    key={col.id}
                    column={col}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                  />
                ))}
              </SortableContext>
            </div>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <TaskListLane
                  isDarkMode={isDarkMode}
                  column={activeColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskListCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      )}
    </div>
  );

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Ghi chú ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    // console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording

          tasks[activeIndex].columnId = tasks[overIndex].columnId;

          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        // console.log("DROPPING TASK OVER COLUMN", { activeIndex });

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};

export default TaskList;
