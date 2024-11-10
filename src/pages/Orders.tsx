import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Package } from 'lucide-react';
import { ordersApi } from '../services/api';
import type { Order } from '../types';

function Orders() {
  const { data: orders, isLoading } = useQuery<Order[]>('orders', ordersApi.getAll);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-600">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Your Orders</h1>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'PPP')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
                <ul className="divide-y divide-gray-200">
                  {order.products.map((item) => (
                    <li key={item.productId} className="py-2">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            {item.quantity}x Product #{item.productId}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-2">
                {order.discountApplied > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount Applied</span>
                    <span className="text-green-600">-${order.discountApplied.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${order.finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Orders;