import React from "react";
import { TaskCard } from "./TaskCard";
import { Plus, ListTodo, Timer, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";

export const TaskColumn = ({ title, category, tasks }) => {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-50/50 p-4 rounded-xl shadow-sm border border-gray-200/50 min-h-[500px] w-full "
    >
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {tasks
        .filter((task) => task.category === category)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </motion.div>
  );
};
