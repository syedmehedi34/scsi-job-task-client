import { useContext, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { signInUser, signInWithGoogle, setUser, setLoginMail, setLoading } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(""); // State for error message

  // Demo credentials
  const demoCredentials = {
    email: "mehedi@scsi.com",
    password: "mehedi@SCSI_123",
  };

  // Handle demo login - autofill email and password
  const handleDemoLogin = () => {
    // Autofill email and password
    document.querySelector("input[name='email']").value = demoCredentials.email;
    document.querySelector("input[name='password']").value =
      demoCredentials.password;
  };

  // Sign in function using email and password
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoginMail(email);

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        e.target.reset();
        setError(""); // Clear error on successful login
        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
        console.error("ERROR", error.message);
        e.target.password.value = "";
      });
  };

  // Sign in using Google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
        //?
        // console.log(result.user);
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
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
          }
        });
        //?

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Failed to sign in with Google. Please try again.");
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 2000,
          pauseOnHover: true,
        });
        console.error("ERROR", error.message);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center my-24">
        <div className="card bg-base-100 dark:bg-gray-800 dark:border-gray-600 w-full max-w-lg shrink-0 p-10 mt-0 border shadow-lg">
          <h2 className="text-2xl font-semibold text-center">
            Login to your account
          </h2>
          <p className="text-center mt-2">
            <button onClick={handleDemoLogin} className="btn min-h-0 h-10">
              Demo Login
            </button>
          </p>

          <form onSubmit={handleLogin} className="card-body pb-3">
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
              {error && (
                <p className="text-red-500 text-sm my-4 font-semibold">
                  {error}
                </p>
              )}
              <label className="label">
                <Link
                  to="/reset-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral">Login</button>
            </div>
          </form>
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 btn btn-neutral mx-8 mb-5"
          >
            <GrGoogle />
            <span>Login with Google</span>
          </div>
          <p className="text-center font-semibold">
            Don’t Have An Account?{" "}
            <Link className="text-red-500" to="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
