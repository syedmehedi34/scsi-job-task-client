import { useDraggable } from "@dnd-kit/core";

export const TaskCard = ({ task }) => {
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

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 mb-2 bg-white rounded shadow border cursor-grab hover:shadow-lg transition-all"
    >
      <h3 className="font-medium text-gray-800">{task.title}</h3>
      <span className="text-xs text-gray-500 capitalize">
        ({task.category})
      </span>
    </div>
  );
};
