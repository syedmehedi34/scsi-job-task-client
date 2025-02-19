import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../providers/ThemeContext";
// import { toast } from "react-toastify";
import { Trello, Sun, Moon, User as UserIcon, Clock } from "lucide-react";
import { ProfileModal } from "./ProfileModal";
import { ActivityLog } from "./ActivityLog";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  return (
    <div>
      <header className="bg-white/60  backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trello className="text-blue-600 dark:text-blue-500" size={28} />
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Task Management
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsActivityOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <Clock size={20} />
              </button>

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
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.displayName}
                    </span>
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                      />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => console.log("Redirect to login")}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <ActivityLog
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
      />
    </div>
  );
};

export default Navbar;
