import React from "react";
import { TaskCard } from "./TaskCard";
import { useTaskContext } from "../providers/TaskContext";
import { Plus, ListTodo, Timer, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const columnIcons = {
  todo: ListTodo,
  inProgress: Timer,
  done: CheckCircle2,
};

const columnColors = {
  todo: "text-blue-600",
  inProgress: "text-amber-600",
  done: "text-green-600",
};

export const TaskColumn = ({ title, category, tasks }) => {
  const { moveTask, addTask, reorderTasks } = useTaskContext();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"));
    const targetIndex = tasks.length;

    if (e.target.closest(".task-card")) {
      const targetCard = e.target.closest(".task-card");
      const targetIndex = Array.from(targetCard.parentNode.children).indexOf(
        targetCard
      );

      if (tasks.find((t) => t.id === taskId)?.category === category) {
        reorderTasks(category, sourceIndex, targetIndex);
      } else {
        moveTask(taskId, category, targetIndex);
      }
    } else {
      moveTask(taskId, category, targetIndex);
    }
  };

  const handleAddTask = () => {
    const newTask = {
      title: "",
      description: "",
      category,
    };
    addTask(newTask);
  };

  const Icon = columnIcons[category];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200/50 min-h-[500px] w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`${columnColors[category]}`} size={20} />
          <h2 className="font-semibold text-gray-700">{title}</h2>
          <span className="text-sm text-gray-400">({tasks.length})</span>
        </div>
        <button
          onClick={handleAddTask}
          className="p-1.5 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/80 transition-all"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={task.id} className="task-card">
            <TaskCard task={task} index={index} isNew={task.title === ""} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
