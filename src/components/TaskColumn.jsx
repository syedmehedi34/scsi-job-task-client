import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Plus, ListTodo, Timer, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import { useForm } from "react-hook-form";

export const TaskColumn = ({ title, category, tasks, setTasks, allTasks }) => {
  const { setNodeRef } = useDroppable({ id: category });
  const ICON_MAP = {
    "To Do": <ListTodo className="mr-2 text-blue-500" size={20} />,
    "In Progress": <Timer className="mr-2 text-yellow-500" size={20} />,
    Done: <CheckCircle2 className="mr-2 text-green-500" size={20} />,
  };

  const { handleSubmit, register, reset } = useForm();

  // ?  Handle adding a new task
  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: "",
      description: "",
      category,
    };
    console.log(newTask);

    setTasks([...allTasks, newTask]);
  };

  // // ? Handle form submission
  // const handleClickSave = (data) => {
  //   console.log("Save task", data);
  //   const newTask = {
  //     id: Date.now().toString(),
  //     title: data.title,
  //     description: data.description,
  //     category,
  //   };
  //   console.log(newTask);

  //   // todo: save the value to the database

  //   // reset();
  // };

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-50/50 p-4 rounded-xl shadow-sm border border-gray-200/50 min-h-[500px] w-full"
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold mb-4 flex items-center">
          <p>{ICON_MAP[title] || null}</p>
          <p>{title}</p>
          <p className="text-sm text-gray-400 ml-2"> ({tasks.length})</p>
        </div>

        {/* Add task button */}
        <div
          className="hover:bg-blue-50 p-2 rounded-full cursor-pointer"
          onClick={handleAddTask}
        >
          <Plus size={20} />
        </div>
      </div>

      {/* Render Task Cards */}
      {tasks
        .filter((task) => task.category === category)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            allTasks={allTasks}
            isNew={task.title === ""}
            category={category}
            tasks={tasks}
            setTasks={setTasks}
            // register={register}
            // handleSubmit={handleSubmit}
            // handleClickSave={handleClickSave}
          />
        ))}
    </motion.div>
  );
};
