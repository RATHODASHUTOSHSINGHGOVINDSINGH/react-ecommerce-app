import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { db } from '../Firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  setDoc, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Subscribe to the Firestore "cartItems" collection for the authenticated user
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    const cartQuery = query(
      collection(db, 'cartItems'),
      where('userId', '==', user.id)
    );
    const unsubscribe = onSnapshot(cartQuery, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((docSnap) => {
        items.push(docSnap.data());
      });
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  // Add a product to the cart in Firestore (or update quantity if it exists)
  const addToCart = async (product, quantity = 1) => {
    if (!user) return;

    // Create a unique document id combining userId and product id
    const docId = `${user.id}_${product.id}`;
    // Find if item already exists in local state (from snapshot)
    const existingItem = cartItems.find(item => item.id === product.id);
    
    // If item exists, update the quantity, otherwise add a new doc
    if (existingItem) {
      await setDoc(doc(db, 'cartItems', docId), {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
      });
    } else {
      await setDoc(doc(db, 'cartItems', docId), {
        ...product,
        id: product.id,
        quantity,
        userId: user.id,
        image: product.image || (product.images && product.images[0]) || '',
      });
    }
  };

  // Update quantity for a given product
  const updateQuantity = async (id, newQuantity) => {
    if (!user) return;
    const docId = `${user.id}_${id}`;
    if (newQuantity === 0) {
      await removeFromCart(id);
      return;
    }
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
      await setDoc(doc(db, 'cartItems', docId), {
        ...existingItem,
        quantity: newQuantity,
      });
    }
  };

  // Remove a given product from the cart in Firestore
  const removeFromCart = async (id) => {
    if (!user) return;
    const docId = `${user.id}_${id}`;
    await deleteDoc(doc(db, 'cartItems', docId));
  };

  // Remove all cart items for this user
  const clearCart = async () => {
    if (!user) return;
    // Loop through current items and delete each one
    await Promise.all(cartItems.map(item => {
      const docId = `${user.id}_${item.id}`;
      return deleteDoc(doc(db, 'cartItems', docId));
    }));
  };

  // Calculate the total price of the cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Count the total items in the cart
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};