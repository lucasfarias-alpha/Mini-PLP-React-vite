import React, { useState, useEffect } from 'react';
import { useCart } from '../Contexts/CartContext.tsx';
import productsData from '../data/products.json'; 

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();

  useEffect(() => {
    setProducts(productsData); 
  }, []);

  
  const isProductInCart = (product: Product) => {
    return cart.some(cartItem => cartItem.product.name === product.name);
  };

  return (
    <div className="lg:flex lg:gap-6">
      <div className="product-list sm:flex md:grid md:grid-cols-2 lg:flex lg:flex-row flex-wrap gap-5 ">
        {products.map((product, index) => {
          const productInCart = isProductInCart(product);

          return (
            <div key={index} className="sm:w-full lg:max-w-[245px] transition-transform duration-300 ease-linear hover:translate-y-[-10px]">
              <div className="relative">
                <img
                  className={`rounded-xl ${productInCart ? "border-[3px] border-red" : ""} sm:w-full sm:max-h-[220px] md:max-h-full sm:object-cover`}
                  src={product.image.thumbnail}  
                  srcSet={`${product.image.mobile} 480w, ${product.image.tablet} 768w, ${product.image.desktop} 1200w`}
                  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
                  alt={product.name}
                />
               
                <div className="mt-4 absolute bottom-[-17px] left-[50%] translate-x-[-50%] max-w-44 w-full h-10 rounded-3xl">
                  {productInCart ? (
                    <div className="quantity-controls flex items-center justify-between gap-2 max-w-44 w-full h-10 bg-red px-4 rounded-3xl">
                     
                      <button
                        className="bg-gray-200 flex justify-center items-center rounded-[50%] w-[26px] h-[26px] bg-transparent border border-white group hover:bg-rose-50"
                        onClick={() => decrementQuantity(product)}
                      >
                        <img className="bg-transparent group-hover:invert group-hover:brightness-100" src="./assets/images/icon-decrement-quantity.svg" alt="Botão de diminuir itens no carrinho" aria-label="Botão de diminuir itens no carrinho" />
                      </button>
                      
                      <span className="text-white text-sm">{cart.find(item => item.product.name === product.name)?.quantity || 0}</span>
                     
                      <button
                        className="bg-gray-200 flex justify-center items-center rounded-[50%] w-[26px] h-[26px] bg-transparent border border-white group hover:bg-rose-50"
                        onClick={() => incrementQuantity(product)}
                      >
                        <img className="bg-transparent group-hover:invert group-hover:brightness-100" src="./assets/images/icon-increment-quantity.svg" alt="Botão de adicionar mais itens no carrinho" aria-label="Botão de adicionar mais itens no carrinho" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-2 max-w-44 w-full h-10 bg-white py-2 px-4 rounded-3xl border border-rose-500 text-rose-900 text-base font-semibold hover:text-red hover:border-red"
                      onClick={() => addToCart(product)}
                    >
                      <img src="./assets/images/icon-add-to-cart.svg" alt="Botão de adicionar ao carrinho" aria-label="Botão de adicionar ao carrinho" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
              <div className="product-details mt-8">
                <h2 className="text-rose-400 text-base font-normal">{product.category}</h2>
                <p className="text-rose-900 text-base font-bold">{product.name}</p>
                <p className="text-red text-base font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
