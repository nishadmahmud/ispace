"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compare, setCompare] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("ispace_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("ispace_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem("ispace_compare");
      if (savedCompare) setCompare(JSON.parse(savedCompare));
    } catch (e) {
      console.error("Failed to load store data from localStorage", e);
    }
    setMounted(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("ispace_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("ispace_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("ispace_compare", JSON.stringify(compare));
    } catch (e) {}
  }, [compare, mounted]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product, options = {}, qty = 1) => {
    const color = options.color || (product.colors && product.colors[0]?.name) || "Standard";
    const storage = options.storage || (product.storage && product.storage[0]?.size) || "Standard";
    const sim = options.sim || (product.simOptions && product.simOptions[0]) || "";
    const priceOffset = options.priceOffset || 0;
    const finalPrice = product.price + priceOffset;

    const cartKey = `${product.id}-${color}-${storage}-${sim}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          product,
          options: { color, storage, sim },
          unitPrice: finalPrice,
          qty,
          addedAt: Date.now()
        }
      ];
    });

    showToast(`Added ${product.name} (${storage}) to your Bag!`);
    setIsCartOpen(true);
  };

  const updateCartQty = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
    showToast("Item removed from Bag", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, "info");
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist! ❤️`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  const addToCompare = (product) => {
    if (compare.some((p) => p.id === product.id)) {
      showToast("Already in comparison list", "info");
      return;
    }
    if (compare.length >= 4) {
      showToast("You can compare up to 4 gadgets at once", "warning");
      return;
    }
    setCompare((prev) => [...prev, product]);
    showToast(`Added ${product.name} to comparison!`);
  };

  const removeFromCompare = (productId) => {
    setCompare((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInCompare = (productId) => {
    return compare.some((p) => p.id === productId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compare,
        addToCompare,
        removeFromCompare,
        isInCompare,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
