import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useSocket } from '../context/SocketContext';

// Helper to format date
const formatDate = (iso: string) => new Date(iso).toLocaleString();

const AdminDashboard = () => {
  const socket = useSocket();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data based on current tab
  const fetchData = async (tab: string) => {
    setLoading(true);
    try {
      switch (tab) {
        case 'orders':
          const { data: o } = await api.get('/admin/orders');
          setOrders(o);
          break;
        case 'reservations':
          const { data: r } = await api.get('/admin/reservations');
          setReservations(r);
          break;
        case 'reviews':
          const { data: rev } = await api.get('/admin/reviews');
          setReviews(rev);
          break;
        case 'users':
          const { data: u } = await api.get('/admin/users');
          setUsers(u);
          break;
        case 'menu':
          const { data: m } = await api.get('/admin/menu');
          setMenuItems(m);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when tab changes
  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  // --- Socket listeners with safety check ---
  useEffect(() => {
    // 🛡️ Guard against null socket
    if (!socket) return;

    const handleNewOrder = () => {
      if (activeTab === 'orders') fetchData('orders');
    };
    const handleStatusUpdate = () => {
      if (activeTab === 'orders') fetchData('orders');
    };

    socket.on('newOrder', handleNewOrder);
    socket.on('orderStatusUpdated', handleStatusUpdate);

    return () => {
      socket.off('newOrder', handleNewOrder);
      socket.off('orderStatusUpdated', handleStatusUpdate);
    };
  }, [socket, activeTab]); // Include socket and activeTab

  // ---------- Order actions ----------
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });
      fetchData('orders');
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // ---------- Reservation actions ----------
  const cancelReservation = async (id: string) => {
    if (!confirm('Cancel this reservation?')) return;
    try {
      await api.delete(`/admin/reservations/${id}`);
      fetchData('reservations');
    } catch (err) {
      alert('Failed to cancel reservation');
    }
  };

  // ---------- Review actions ----------
  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await api.delete(`/admin/reviews/${id}`);
      fetchData('reviews');
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  // ---------- User actions ----------
  const updateUserRole = async (id: string, role: string) => {
    try {
      await api.put(`/admin/users/${id}`, { role });
      fetchData('users');
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  // ---------- Menu actions ----------
  const [editingItem, setEditingItem] = useState<any>(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    category: 'coffee',
    description: '',
    price: 0,
    image: '',
    tags: [],
    isActive: true,
  });

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/admin/menu/${editingItem._id}`, menuForm);
      } else {
        await api.post('/admin/menu', menuForm);
      }
      fetchData('menu');
      setMenuForm({ name: '', category: 'coffee', description: '', price: 0, image: '', tags: [], isActive: true });
      setEditingItem(null);
    } catch (err) {
      alert('Failed to save menu item');
    }
  };

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Delete this menu item?')) return;
    try {
      await api.delete(`/admin/menu/${id}`);
      fetchData('menu');
    } catch (err) {
      alert('Failed to delete menu item');
    }
  };

  const editMenuItem = (item: any) => {
    setEditingItem(item);
    setMenuForm({ ...item });
  };

  // ---------- Render UI ----------
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6">Admin Dashboard</h1>
      <div className="flex gap-4 mb-6 border-b pb-2 flex-wrap">
        {['orders', 'reservations', 'reviews', 'users', 'menu'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              activeTab === tab ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading && <div className="text-center py-8">Loading...</div>}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order._id} className="border rounded-xl p-4 bg-white shadow">
              <div className="flex justify-between items-center">
                <span className="font-bold">Order #{order._id.slice(-6)}</span>
                <span>
                  {order.userName} - {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <span>Total: ₹{order.total}</span>
                <span className="ml-4">Status: <strong>{order.status}</strong></span>
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(order._id, status)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === status ? 'bg-amber-700 text-white' : 'bg-stone-200'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reservations Tab */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          {reservations.map((res: any) => (
            <div key={res._id} className="border rounded-xl p-4 bg-white shadow">
              <div className="flex justify-between">
                <span className="font-bold">{res.userName}</span>
                <span>
                  {res.date} at {res.time}
                </span>
              </div>
              <div className="text-sm">
                {res.guests} guests - {res.seatingArea}
              </div>
              <button
                onClick={() => cancelReservation(res._id)}
                className="text-red-500 text-sm mt-2"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review._id} className="border rounded-xl p-4 bg-white shadow">
              <div className="flex justify-between">
                <span className="font-bold">{review.userName}</span>
                <span className="text-amber-500">★ {review.rating}</span>
              </div>
              <p className="text-sm mt-1">{review.comment}</p>
              <button onClick={() => deleteReview(review._id)} className="text-red-500 text-sm mt-2">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {users.map((user: any) => (
            <div key={user._id} className="border rounded-xl p-4 bg-white shadow flex justify-between items-center">
              <div>
                <span className="font-bold">{user.displayName}</span>
                <span className="text-sm ml-4">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Role:</span>
                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menu Tab */}
      {activeTab === 'menu' && (
        <div>
          <div className="mb-6 p-4 border rounded-xl bg-white shadow">
            <h3 className="font-bold text-lg mb-4">{editingItem ? 'Edit' : 'Add'} Menu Item</h3>
            <form onSubmit={handleMenuSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={menuForm.name}
                onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                className="border rounded p-2"
                required
              />
              <select
                value={menuForm.category}
                onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                className="border rounded p-2"
              >
                {['coffee', 'fast_food', 'desserts', 'beverages', 'specials'].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                value={menuForm.description}
                onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                className="border rounded p-2 col-span-2"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={menuForm.price}
                onChange={(e) => setMenuForm({ ...menuForm, price: parseFloat(e.target.value) })}
                className="border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={menuForm.image}
                onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={menuForm.tags.join(', ')}
                onChange={(e) =>
                  setMenuForm({
                    ...menuForm,
                    tags: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="border rounded p-2"
              />
              <div className="flex items-center gap-2">
                <label>Active:</label>
                <input
                  type="checkbox"
                  checked={menuForm.isActive}
                  onChange={(e) => setMenuForm({ ...menuForm, isActive: e.target.checked })}
                />
              </div>
              <div className="col-span-2 flex gap-2">
                <button type="submit" className="px-4 py-2 bg-amber-700 text-white rounded-xl">
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setMenuForm({
                        name: '',
                        category: 'coffee',
                        description: '',
                        price: 0,
                        image: '',
                        tags: [],
                        isActive: true,
                      });
                    }}
                    className="px-4 py-2 bg-stone-300 rounded-xl"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuItems.map((item: any) => (
              <div key={item._id} className="border rounded-xl p-4 bg-white shadow">
                <div className="font-bold">{item.name}</div>
                <div className="text-sm">₹{item.price}</div>
                <div className="text-xs text-stone-500">{item.category}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => editMenuItem(item)} className="text-blue-500 text-sm">
                    Edit
                  </button>
                  <button onClick={() => deleteMenuItem(item._id)} className="text-red-500 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;