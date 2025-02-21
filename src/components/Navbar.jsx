import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../providers/ThemeContext";
import { Trello, Sun, Moon, User as UserIcon, Clock } from "lucide-react";
import { ProfileModal } from "./ProfileModal";
import { ActivityLog } from "./ActivityLog";
import { Link, NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [userInfo] = useUser();
  // console.log(userInfo);

  const { isDark, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  return (
    <div>
      <div className="fixed w-full z-50 ">
        <div className="bg-white/60 dark:bg-gray-900/95   backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trello
                  className="text-blue-600 dark:text-blue-500"
                  size={28}
                />
                <Link to="/">
                  <h1 className="text-lg md:text-2xl  font-semibold text-gray-800 dark:text-gray-200">
                    Task Management
                  </h1>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                {/* {user && (
                  <button
                    onClick={() => setIsActivityOpen(true)}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <Clock size={20} />
                  </button>
                )} */}

                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* user portion */}
                <div className="flex items-center gap-3">
                  {user ? (
                    <>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 md:flex hidden">
                        {userInfo?.name}
                      </span>
                      <button
                        onClick={() => setIsProfileOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={userInfo?.photo}
                          alt={userInfo?.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                        />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Link to="/auth/login">
                        <button className="btn btn-primary  min-h-0 h-9 min-w-0  text-sm font-medium rounded-md transition-all">
                          Login
                        </button>
                      </Link>

                      <Link to="/auth/register">
                        <button className="btn min-h-0 h-9 min-w-0 btn-outline dark:bg-gray-800 dark:text-gray-100 dark:border-none  text-sm font-medium rounded-md transition-all">
                          Register
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user && (
        <>
          <ProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
          <ActivityLog
            isOpen={isActivityOpen}
            onClose={() => setIsActivityOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
