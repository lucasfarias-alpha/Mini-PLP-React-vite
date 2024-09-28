import React, { createContext, useContext, useState, ReactNode } from 'react';


interface Product {
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}


const CartContext = createContext<CartContextType | undefined>(undefined);


export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.product.name === product.name);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.name !== product.name));
  };

 
  const incrementQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  
  const decrementQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove o produto se a quantidade for 0
    );
  };

  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
