import { useContext } from "react";
import { TaskBoard } from "../components/TaskBoard";
import { AuthContext } from "../providers/AuthProvider";
import NoUserHero from "../components/NoUserHero";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="w-11/12 mx-auto my-10">
        {user ? (
          <TaskBoard />
        ) : (
          <>
            <NoUserHero />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
