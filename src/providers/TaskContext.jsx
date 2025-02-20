import React, { createContext, useContext, useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const initialTasks = [
    { id: "1", title: "Task 1", category: "todo" },
    { id: "2", title: "Task 2", category: "inProgress" },
    { id: "3", title: "Task 3", category: "done" },
  ];
  //?
  const [allTasks, loadingTasks, refetchTasks] = useTasks();
  console.log(allTasks);
  //?
  const [tasks, setTasks] = useState(allTasks);
  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);
  console.log(tasks);

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

    // todo - update the task in the database
  };

  return (
    <TaskContext.Provider
      value={{
        // isEditing,
        // setIsEditing,
        tasks,
        setTasks,
        // handleAddTask,
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
