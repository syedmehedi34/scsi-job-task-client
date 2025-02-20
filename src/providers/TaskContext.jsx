import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const initialTasks = [
    { _id: "1", title: "Task 1", category: "todo" },
    { _id: "2", title: "Task 2", category: "inProgress" },
    { _id: "3", title: "Task 3", category: "done" },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  // const [isEditing, setIsEditing] = useState(false);
  // const handleAddTask = () => {
  //   const newTask = {
  //     id: Date.now().toString(),
  //     title: "",
  //     description: "",
  //     category,
  //   };
  //   console.log(newTask);

  //   // Update the task list by adding the new task
  //   setTasks([...tasks, newTask]); // Add the new task to the existing task list
  // };

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
