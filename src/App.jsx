import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Lazy-loaded pages
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const OurService = lazy(() => import("./pages/OurService"));
const Order = lazy(() => import("./pages/Order"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const Orders = lazy(() => import("./pages/Orders"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDashboardAddItem = lazy(() => import("./pages/AdminDashboardAddItem"));
const TestFirestore = lazy(() => import("./pages/TestFirestore"));

// Non-lazy (auth pages are small and load instantly)
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Loading fallback
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <p className="text-lg font-semibold">Loading...</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-yellow-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden pt-[65px]">
            <Navbar />

            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ourService" element={<OurService />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/test" element={<TestFirestore />} />

                  {/* Private Routes */}
                  <Route
                    path="/order"
                    element={
                      <PrivateRoute>
                        <Order />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <Admin />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      <PrivateRoute>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin-dashboard/add-item"
                    element={
                      <PrivateRoute>
                        <AdminDashboardAddItem />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
