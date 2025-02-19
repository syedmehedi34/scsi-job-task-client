import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  const addActivity = (message) => {
    const activity = {
      id: crypto.randomUUID(),
      message,
      timestamp: new Date().toISOString(),
    };
    // console.log(activity);
    setActivityLog((prev) => [activity, ...prev].slice(0, 50)); // Keep last 50 activities
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    console.log(newTask);
    setTasks((prev) => [...prev, newTask]);
    addActivity(`Created task: ${task.title}`);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    addActivity(`Updated task: ${updatedTask.title}`);
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    addActivity(`Deleted task: ${task.title}`);
  };

  const moveTask = (taskId, newCategory, targetIndex) => {
    setTasks((prev) => {
      const taskToMove = prev.find((t) => t.id === taskId);
      if (!taskToMove) return prev;

      const tasksWithoutMoved = prev.filter((t) => t.id !== taskId);
      const updatedTask = { ...taskToMove, category: newCategory };

      const result = [...tasksWithoutMoved];
      result.splice(targetIndex, 0, updatedTask);

      addActivity(`Moved task "${taskToMove.title}" to ${newCategory}`);
      return result;
    });
  };

  const reorderTasks = (category, startIndex, endIndex) => {
    setTasks((prev) => {
      const categoryTasks = prev.filter((task) => task.category === category);
      const otherTasks = prev.filter((task) => task.category !== category);

      const [movedTask] = categoryTasks.splice(startIndex, 1);
      categoryTasks.splice(endIndex, 0, movedTask);

      addActivity(`Reordered task: ${movedTask.title}`);
      return [...otherTasks, ...categoryTasks];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activityLog,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
