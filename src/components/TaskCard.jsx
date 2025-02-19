import React, { useState } from "react";
import { Pencil, Trash2, X, Check, GripVertical, Calendar } from "lucide-react";
import { useTaskContext } from "../providers/TaskContext";
import { motion } from "framer-motion";

export const TaskCard = ({ task, index, isNew = false }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceIndex", index);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateTask({
        ...task,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        dueDate: editedDueDate,
      });
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    const now = new Date();
    const due = new Date(task.dueDate);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "overdue";
    if (diffDays === 0) return "due-today";
    if (diffDays <= 2) return "due-soon";
    return "on-track";
  };

  const dueDateClasses = {
    overdue: "text-red-600 dark:text-red-400",
    "due-today": "text-amber-600 dark:text-amber-400",
    "due-soon": "text-orange-600 dark:text-orange-400",
    "on-track": "text-green-600 dark:text-green-400",
  };

  const status = getDueDateStatus();

  if (isEditing) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all"
      >
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all"
          maxLength={50}
          placeholder="Task title"
          autoFocus
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all resize-none"
          maxLength={200}
          placeholder="Description (optional)"
          rows={3}
        />
        <div className="mb-3">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Due Date
          </label>
          <input
            type="datetime-local"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <X size={16} />
          </button>
          <button
            onClick={handleSave}
            className="p-2 text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
          >
            <Check size={16} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-move"
    >
      <div className="flex items-start gap-2">
        <div className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 cursor-grab active:cursor-grabbing mt-1">
          <GripVertical size={16} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              {task.title}
            </h3>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {formatDate(task.timestamp)}
            </p>
            {task.dueDate && (
              <div
                className={`flex items-center gap-1 text-xs ${dueDateClasses[status]}`}
              >
                <Calendar size={12} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
