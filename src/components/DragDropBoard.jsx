import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const initialTasks = [
  { id: "1", title: "Task 1", category: "todo" },
  { id: "3", title: "Task 3", category: "progressing" },
];

// Draggable Card Component
const DraggableCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 mb-2 bg-white rounded shadow cursor-grab"
    >
      {task.title} <br />
      <span className="text-xs text-gray-500">({task.category})</span>
    </div>
  );
};

// Droppable Section Component
const DroppableSection = ({ category, tasks, onDrop }) => {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div
      ref={setNodeRef}
      className="w-1/2 p-4 border rounded-lg bg-gray-100 min-h-[100px]"
    >
      <h2 className="text-lg font-bold mb-4">{category}</h2>
      {tasks
        .filter((task) => task.category === category)
        .map((task) => (
          <DraggableCard key={task.id} task={task} />
        ))}
    </div>
  );
};

// Main Board Component
const DragDropBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTaskId = active.id;
    const newCategory = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, category: newCategory } : task
      )
    );

    console.log("Dropped in section:", newCategory); // ✅ Logs the new section name
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-4">
        <DroppableSection category="todo" tasks={tasks} />
        <DroppableSection category="progressing" tasks={tasks} />
      </div>
    </DndContext>
  );
};

export default DragDropBoard;
