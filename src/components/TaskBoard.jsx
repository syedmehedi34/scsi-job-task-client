import React, { useState } from "react";
import { TaskColumn } from "./TaskColumn";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTaskContext } from "../providers/TaskContext";

export const TaskBoard = () => {
  // const [tasks, setTasks] = useState(initialTasks);
  const { tasks, setTasks, handleAddTask, handleDragEnd } = useTaskContext();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <TaskColumn
          title="To Do"
          category="todo"
          tasks={tasks.filter((t) => t.category === "todo")}
          setTasks={setTasks}
          allTasks={tasks}
        />
        <TaskColumn
          title="In Progress"
          category="inProgress"
          tasks={tasks.filter((t) => t.category === "inProgress")}
          setTasks={setTasks}
          allTasks={tasks}
        />
        <TaskColumn
          title="Done"
          category="done"
          tasks={tasks.filter((t) => t.category === "done")}
          setTasks={setTasks}
          allTasks={tasks}
        />
      </motion.div>
    </DndContext>
  );
};
