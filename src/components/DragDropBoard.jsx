import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialTasks = [
  { id: "1", title: "Task 1", category: "todo" },
  { id: "2", title: "Task 2", category: "todo" },
  { id: "3", title: "Task 3", category: "progressing" },
  { id: "4", title: "Task 4", category: "progressing" },
];

const SortableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 mb-2 bg-white rounded shadow cursor-grab touch-none"
    >
      {task.title}
    </div>
  );
};

const DroppableSection = ({ category, tasks }) => {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div
      ref={setNodeRef}
      className="w-1/2 p-4 border rounded-lg bg-gray-100 min-h-[200px]"
    >
      <h2 className="text-lg font-bold mb-4">{category}</h2>
      <SortableContext items={tasks} strategy={rectSortingStrategy}>
        {tasks.map((task) => (
          <SortableTask key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

const DragDropBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Add support for both touch and mouse sensors
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // Prevent accidental drags
        tolerance: 5, // Allow some movement before activation
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTaskId = active.id;
    const sourceTask = tasks.find((task) => task.id === draggedTaskId);
    const newCategory = over.id;

    if (!sourceTask) return;

    if (sourceTask.category !== newCategory) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === draggedTaskId ? { ...task, category: newCategory } : task
        )
      );
    } else {
      const filteredTasks = tasks.filter(
        (task) => task.category === newCategory
      );
      const oldIndex = filteredTasks.findIndex(
        (task) => task.id === draggedTaskId
      );
      const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        const categoryTasks = arrayMove(filteredTasks, oldIndex, newIndex);
        categoryTasks.forEach((task, i) => {
          const index = newTasks.findIndex((t) => t.id === task.id);
          newTasks[index] = task;
        });
        return newTasks;
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors} // Enable touch support
    >
      <div className="flex gap-6 p-4">
        <DroppableSection
          category="todo"
          tasks={tasks.filter((task) => task.category === "todo")}
        />
        <DroppableSection
          category="progressing"
          tasks={tasks.filter((task) => task.category === "progressing")}
        />
      </div>
    </DndContext>
  );
};

export default DragDropBoard;
