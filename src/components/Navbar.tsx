import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, Users, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            E-Commerce
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Products
            </Link>

            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <div className="flex items-center space-x-4">
                    <Link to="/admin" className="text-gray-600 hover:text-gray-800">
                      <LayoutDashboard className="w-5 h-5" />
                    </Link>
                    <Link to="/admin/products" className="text-gray-600 hover:text-gray-800">
                      <Package className="w-5 h-5" />
                    </Link>
                    <Link to="/admin/users" className="text-gray-600 hover:text-gray-800">
                      <Users className="w-5 h-5" />
                    </Link>
                  </div>
                )}

                <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                
                <Link to="/orders" className="text-gray-600 hover:text-gray-800">
                  <Package className="w-5 h-5" />
                </Link>

                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{user.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;