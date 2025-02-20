import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const TaskCard = ({
  task,
  isNew,
  category,
  tasks,
  setTasks,
  // register,
  // handleSubmit,
  // handleClickSave,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
      }
    : {};

  //? editing mode

  const [isEditing, setIsEditing] = useState(isNew);
  // console.log(isEditing);

  // ? Handle form submission
  const { handleSubmit, register, reset } = useForm();

  const handleClickSave = (data) => {
    console.log("Save task", data);
    const newTask = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      category,
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);
    setIsEditing(false);
    // reset();

    // todo: save the value to the database
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all"
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

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
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
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 mb-2 bg-white rounded shadow border cursor-grab hover:shadow-lg transition-all"
    >
      <h3 className="font-medium text-gray-800">{task.title}</h3>
      {/* <p className=" ">{task.description}</p> */}
    </div>
  );
};
