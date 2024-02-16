import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import "./App.css";
import { postsThunk } from "./store/features/postSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-stone-300">
      <div className="w-full block">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <main className="grow">
          <Outlet />
        </main>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  ) : null;
}

export default App;
