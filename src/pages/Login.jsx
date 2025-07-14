import React, { useState, useEffect, useId } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { provider, auth } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailId = useId();
  const passwordId = useId();
  const [error, setError] = useState("");

  const db = getFirestore();
  

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data, e) => {
    e.preventDefault();
    // console.log("Form data:", data);  
    
    try {
      // Use the imported auth instead of creating a new one
      const userCredential = await signInWithEmailAndPassword(
        auth, // Use imported auth
        data.email,
        data.password
      );
      
      const userData = {
        id: userCredential.user.uid,
        name: userCredential.user.displayName || "User",
        email: userCredential.user.email,
      };
     // Show success toast notification
      toast.success(`Welcome back, ${userData.name}!`, {
        position: "top-right",
        autoClose: 3000,
      });

      login(userData);
      setError("");
      reset(); // Reset form data
      // Remove navigate from here - let useEffect handle it
    } catch (error) {
      setError(error.message);
       toast.error( error.message||"Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      })

      console.error("Login error:", error);
    }
    //   login({
    //     email: data.email,
    //     name: data.email.split("@")[0],
    //   });
    //   reset();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);
   

  const handleGoogleLogin = async () => {
    // Keep your comments as requested
    // const googleUser = {
    //   email: "user@gmail.com",
    //   name: "Google User",
    // };
    // login(googleUser);

    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        id: user.uid,
        name: user.displayName || "Google User",
        email: user.email,
      };
 // Show success toast notification
      toast.success(`Welcome back, ${userData.name}!`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Login with your auth context
      login(userData);

      // Store in Firestore if you want that functionality
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          provider: "google",
        });
      } catch (firestoreError) {
        console.error("Firestore error:", firestoreError);
        // Continue with login even if Firestore fails
      }

      reset(); // Reset form
      // No need to navigate here - your useEffect will handle it
    } catch (err) {
      setError(err.message);
      console.error("Google login error:", err);
       toast.error(err.message ||"Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      })
       console.error("Google login error:", err);
       
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor={emailId}
                className=" block text-sm font-medium text-gray-700 mb-2 "
              >
                Email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"  
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className=" block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id={passwordId}
                type="password"
                autoComplete="current-password"  
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 "
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center space-x-3 cursor-pointer"
            >
              <img
                src="./google-color-svgrepo-com.svg"
                height={22}
                width={22}
                alt="Google logo "
              ></img>
              <span>Login with Google</span>
            </button>
          </div>

           
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
