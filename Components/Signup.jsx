import React, { useState, useId, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../auth/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../src/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup = () => {
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
  const nameId = useId();
  const [error, setError] = useState('');

  const db = getFirestore();
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log('Form data:', data);
    
    try {
      // Create new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
      
      const userData = {
        id: userCredential.user.uid,
        name: data.name,
        email: userCredential.user.email,
      };
      
      // Store user data in Firestore
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: data.name,
          provider: 'email',
          createdAt: new Date().toISOString()
        });
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        toast.error('Failed to save user data. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      
      // Login with the context
      login(userData);
        // Show success notification
      toast.success(
        "Account created successfully! ",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      setError('');
      reset();
    } catch (error) {
        // Show error notification
      toast.error(
        error.message || "Failed to create account. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
         console.error('Signup error:', error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in instead.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create an Account
            </h1>
            <p className="text-gray-600">Sign up to start shopping</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id={nameId}
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={passwordId} className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id={passwordId}
                type="password"
                autoComplete="password"  
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
