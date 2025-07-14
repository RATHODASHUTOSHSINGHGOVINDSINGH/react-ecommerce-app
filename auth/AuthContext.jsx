import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../src/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();
const db = getFirestore();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // useEffect(() => {
  //   const savedUser = localStorage.getItem('user');
  //   const savedLoginStatus = localStorage.getItem('isLoggedIn');
    
  //   if (savedUser && savedLoginStatus === 'true') {
  //     setUser(JSON.parse(savedUser));
  //     setIsLoggedIn(true);
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || 'User',
              email: userData.email || firebaseUser.email,
            });
            setIsLoggedIn(true);
          } else {
            // Create user in Firestore if they don't exist
            const newUser = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email,
              createdAt: new Date().toISOString()
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email,
            });
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error getting user data:", error);
        }
      } else {
        // User is signed out
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

  
    return () => unsubscribe();
  }, []);

  // const login = (userData) => {
  //   setIsLoggedIn(true);
  //   setUser(userData);
     
  //   localStorage.setItem('user', JSON.stringify(userData));
  //   localStorage.setItem('isLoggedIn', 'true');
  // };

  const login = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
    // Store user data in Firestore
    try {
      await setDoc(doc(db, 'users', userData.id), {
        uid: userData.id,
        name: userData.name,
        email: userData.email,
        lastLogin: new Date().toISOString()
      }, { merge: true }); // merge: true updates fields without overwriting the entire document
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   setUser(null);
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('isLoggedIn');
  // };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    loading
  };

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
