import React, { useState } from "react";
import { TaskColumn } from "./TaskColumn";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";

const initialTasks = [
  { id: "1", title: "Task 1", category: "todo" },
  { id: "2", title: "Task 2", category: "inProgress" },
  { id: "3", title: "Task 3", category: "done" },
];

export const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newCategory = over.id;

    // Ensure we're dropping into a different category
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );
    console.log("Dropped in section:", newCategory);
  };

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
