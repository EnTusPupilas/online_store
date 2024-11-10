import React from 'react';
import { useQuery } from 'react-query';
import { BarChart3, Users, Package, ShoppingCart } from 'lucide-react';
import { adminApi } from '../../services/api';

function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery('admin-stats', adminApi.getStats);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue.toFixed(2)}`,
      icon: BarChart3,
      color: 'bg-green-500',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {stats?.topProducts.map((product: { id: string; imageUrl: string; name: string; totalSold: number; revenue: number }) => (
              <div key={product.id} className="flex items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.totalSold} units sold</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.revenue.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Top Customers</h2>
          <div className="space-y-4">
            {stats?.topCustomers.map((customer: { id: string; name: string; totalOrders: number; totalSpent: number }) => (
              <div key={customer.id} className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.totalOrders} orders</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;