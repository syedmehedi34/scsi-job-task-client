import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { GrGoogle } from "react-icons/gr";
import { use } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const navigate = useNavigate();
  const { createNewUser, setUser, updateUser, signInWithGoogle } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  // sign up using mail
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();

    // get the data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    // Validate password
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include an uppercase and a lowercase letter."
      );
      return;
    }

    // Clear any previous error if validation passes
    setError("");

    // create user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Congratulations! Successfully created a new account", {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        // Update user profile using updateUser
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            //?
            const user = {
              name,
              email,
              photo,
              userId: Date.now().toString(16),
            };
            axiosPublic.post("/users", user).then((res) => {
              if (res.data.insertedId) {
                // console.log(res.data.insertedId);
                toast.success(
                  "Congratulations! Successfully created a new account",
                  {
                    position: "top-left",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                  }
                );
                navigate("/");
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to create account. Please try again."); // Handle user creation error
      });
  };

  // sign up using google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Congratulations! Successfully created a new account", {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Failed to sign in with Google. Please try again.");
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.error("ERROR", error.message);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center my-24">
        <div className="card border bg-base-100  dark:bg-gray-800 dark:border-gray-600 w-full max-w-lg shrink-0 shadow-lg p-10">
          <div>
            <h2 className="text-2xl font-semibold text-center">
              Register your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="card-body pb-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered dark:bg-gray-700"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo-url"
                className="input input-bordered dark:bg-gray-700"
                required
              />
            </div>

            {/* Email input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered dark:bg-gray-700"
                required
              />
            </div>

            {/* Password input with validation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full dark:bg-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {passwordVisible ? (
                    <IoIosEye size={24} />
                  ) : (
                    <IoIosEyeOff size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Show validation error */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="form-control mt-6">
              <button className="btn btn-neutral">Register</button>
            </div>
          </form>

          {/*  */}
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 btn btn-neutral mx-8 mb-5"
          >
            <GrGoogle />
            <span>Login with Google</span>
          </div>
          {/*  */}

          <p className="text-center font-semibold">
            Already Have An Account ?{" "}
            <Link className="text-red-500" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
