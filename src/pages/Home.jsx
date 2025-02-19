import DragDropBoard from "../components/DragDropBoard";
import { TaskBoard } from "../components/TaskBoard";

const Home = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto my-10">
        {/* <TaskBoard></TaskBoard> */}
        <DragDropBoard />
      </div>
    </div>
  );
};

export default Home;
