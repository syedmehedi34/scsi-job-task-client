import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useSecureAxios from "../hooks/useSecureAxios";
import { AuthContext } from "../providers/AuthProvider";

export const TaskCard = ({ task, isNew, category, allTasks, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });
  const [editTask, setEdit] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  const email = user?.email;
  // console.log(email);

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
    // If title is empty, do not save the task
    if (!data.title.trim() || !data.description.trim()) {
      return; // Simply return without making any changes if both title and description are empty
    }

    const newTask = {
      id: editTask?.id || Date.now().toString(), // Generate a new id if it's a new task
      title: data.title,
      description: data.description,
      category,
      dueDate: data.dueDate,
      createdTime: new Date().toLocaleDateString("sv-SE"),
      user: email,
    };

    let updatedTasks;

    if (editTask) {
      // If we are editing, update the existing task
      updatedTasks = allTasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
    } else {
      // If it's a new task, add it to the list
      updatedTasks = [...allTasks, newTask];
    }

    // Filter out tasks that have empty title or description (if any)
    updatedTasks = updatedTasks.filter(
      (task) => task.title.trim() !== "" && task.description.trim() !== ""
    );

    // Update the tasks state
    setTasks(updatedTasks);
    setIsEditing(false); // Exit the editing state

    // Reset the form state
    reset();

    // Try to save the task to the backend
    try {
      const res = await axiosSecure.patch("/tasks", { newTask });
      // console.log("Response:", res.data);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // handle edit task
  const handleEditTask = (task) => {
    setEdit(task);
    // console.log(task);
    setIsEditing(true);
  };

  // handle click cancel saving
  const handleCancelSaving = () => {
    const updatedTasks = allTasks.filter((task) => task.title.trim() !== "");
    setTasks(updatedTasks);
    setIsEditing(false);
    reset();
  };

  // handle delete task
  const handleDelete = async (taskId) => {
    // Update the tasks state locally
    const updatedTasks = allTasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // console.log("Task ID to delete:", taskId);

    const res = await axiosSecure.delete("/tasks", { data: { taskId } });
    // console.log("Deleted task:", res.data);
  };

  //
  //
  //
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
            defaultValue={editTask?.title}
            autoFocus
          />
          <textarea
            {...register("description")}
            className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all resize-none"
            maxLength={200}
            placeholder="Description (optional)"
            defaultValue={editTask?.description}
            rows={3}
          />

          {/* Due Date */}
          <input
            type="date"
            defaultValue={editTask?.dueDate}
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
    <div className="group">
      <div className="relative">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          className={`p-3 mb-2 bg-white dark:bg-gray-700 dark:border-gray-600 rounded shadow border border-white cursor-grab hover:shadow-lg transition-all group`}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-50/80">
            {task.title}
          </h3>
          <p className="font-light mt-2 mb-8 text-sm dark:text-gray-50/80">
            {task.description}
          </p>

          <div className="flex justify-between items-center">
            <p className="text-sm font-extralight text-gray-500 dark:text-gray-50/70">
              Created: {task?.createdTime}
            </p>
            <p
              className={`text-sm font-extralight text-gray-500  dark:text-gray-50/70 ${
                new Date(task?.dueDate) < new Date(task?.createdTime) &&
                task?.category !== "done"
                  ? "text-red-500 dark:text-red-400"
                  : ""
              }`}
            >
              Due: {task?.dueDate}
            </p>
          </div>

          {/* Edit and Delete Buttons */}
        </div>

        <div className=" absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ">
          <button
            onClick={() => handleEditTask(task)}
            className="p-1.5 text-gray-600 hover:text-gray-800  dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => handleDelete(task.id)}
            className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
