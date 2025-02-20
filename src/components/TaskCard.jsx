import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSecureAxios from "../hooks/useSecureAxios";

export const TaskCard = ({ task, isNew, category, allTasks, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const axiosSecure = useSecureAxios();
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
      }
    : {};

  const [isEditing, setIsEditing] = useState(isNew);

  const { handleSubmit, register, reset } = useForm();

  // handle click save
  const handleClickSave = async (data) => {
    const newTask = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      category,
      dueDate: data.dueDate,
    };

    const updatedTasks = allTasks.filter((task) => task.title.trim() !== "");
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
    setIsEditing(false);
    reset();

    try {
      const res = await axiosSecure.patch("/tasks", { newTask });
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error saving task:", error);
      // You can show a user-friendly message here
    }
  };

  // handle click cancel saving
  const handleCancelSaving = () => {
    const updatedTasks = allTasks.filter((task) => task.title.trim() !== "");
    setTasks(updatedTasks);
    setIsEditing(false);
    reset();
  };

  //?
  const handleEditTask = (task) => {
    console.log(task); // Log to make sure task is passed properly
    setIsEditing(true); // This will trigger the edit form to show up
  };

  //?

  if (isEditing) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white mb-2 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all"
      >
        {/* Form Submission */}
        <form onSubmit={handleSubmit(handleClickSave)}>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all"
            maxLength={50}
            placeholder="Task title"
            autoFocus
          />
          <textarea
            {...register("description")}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all resize-none"
            maxLength={200}
            placeholder="Description (optional)"
            rows={3}
          />

          {/* Due Date */}
          <input
            type="date"
            {...register("dueDate")}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => handleCancelSaving()}
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <X size={16} />
            </button>
            <button
              type="submit"
              className="p-2 text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
            >
              <Check size={16} />
            </button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <div className="group relative">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className=" p-3 mb-2 bg-white rounded shadow border border-white cursor-grab hover:shadow-lg transition-all group"
      >
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="font-light mt-2 mb-8 text-sm">{task.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-sm font-extralight text-gray-500">
            Due: {task.dueDate}
          </p>
          <p className="text-sm font-extralight text-gray-500">
            Due: {task.dueDate}
          </p>
        </div>

        {/* Edit and Delete Buttons */}
      </div>

      <div className=" absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ">
        <button
          onClick={() => handleEditTask(task)}
          className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          <Pencil size={14} />
        </button>

        <button
          // onClick={() => deleteTask(task.id)}
          className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
