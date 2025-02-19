/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, Mail, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed  backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed right-4 top-16 z-50 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Profile
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {user?.displayName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{user?.displayName}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <User size={16} />
                  <span className="text-sm">{user?.displayName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail size={16} />
                  <span className="text-sm">{user?.email}</span>
                </div>
              </div>

              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
