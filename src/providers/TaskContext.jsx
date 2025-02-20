import React, { createContext, useContext, useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";
import useSecureAxios from "../hooks/useSecureAxios";
// import { AuthContext } from "./AuthProvider";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [allTasks, loadingTasks, refetchTasks] = useTasks();
  const axiosSecure = useSecureAxios();

  const [tasks, setTasks] = useState(allTasks);
  useEffect(() => {
    setTasks(allTasks);
    // refetchTasks();
  }, [allTasks]);

  // drag control
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newCategory = over.id;

    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );
    // console.log("Dropped in section:", newCategory);

    // Send the update request to the backend
    const res = await axiosSecure.patch("/drag_tasks", {
      taskId,
      newCategory,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        handleDragEnd,
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
