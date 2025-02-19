import React from "react";
import { TaskColumn } from "./TaskColumn";
import { useTaskContext } from "../providers/TaskContext";
import { motion } from "framer-motion";

export const TaskBoard = () => {
  const { tasks } = useTaskContext();

  const todoTasks = tasks.filter((task) => task.category === "todo");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "inProgress"
  );
  const doneTasks = tasks.filter((task) => task.category === "done");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <TaskColumn title="To Do" category="todo" tasks={todoTasks} />
      <TaskColumn
        title="In Progress"
        category="inProgress"
        tasks={inProgressTasks}
      />
      <TaskColumn title="Done" category="done" tasks={doneTasks} />
    </motion.div>
  );
};
