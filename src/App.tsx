import { CartProvider } from './Components/CartContext.tsx';
import ProductList from './Components/ProductList.tsx';
import ShoppingCart from './Components/ShoppingCart.tsx';

function App() {
  return (
    <CartProvider>
      <div className="lg:py-10 lg:px-14 sm:p-4 bg-rose-50 gap-7 App sm:flex-col">
        <div className="flex flex-col max-w-[1200px] mx-auto">
          <div className="flex justify-center flex-col gap-6 lg:flex-row">
            <div className="flex flex-col gap-8 ">
              <h1 className="text-rose-900 text-5xl sm:text-[42px] font-bold">Desserts</h1>
              <ProductList />
            </div>
            <ShoppingCart />
          </div>
          <footer className="attribution flex justify-center items-start mt-8 gap-1">
            <span>Challenge by</span>
            <a href="https://www.frontendmentor.io/?ref=challenge">Frontend Mentor</a>. 
            <span>Coded by</span>  
            <a href="https://www.linkedin.com/in/lucas-farias-213b0b234/"> Lucas Farias Soares</a>.
          </footer>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
