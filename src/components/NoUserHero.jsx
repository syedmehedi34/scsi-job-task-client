import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const NoUserHero = () => {
  return (
    <div className="min-h-screen simple-bg flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="mb-8 text-gray-800 dark:text-gray-50">
            <Lock className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Task Management
            </h1>
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-50 max-w-2xl mx-auto">
              This is a protected space. To access the full features and
              content, please log in to your account or register if you're new
              here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/auth/register">
              <button className="btn btn-success">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoUserHero;
