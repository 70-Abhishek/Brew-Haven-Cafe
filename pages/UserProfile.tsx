import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import api from '../src/api/client';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface Profile {
  displayName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Loyalty {
  points: number;
  totalEarned: number;
}

interface OrderItem {
  name: string;
}

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
  loyaltyPointsEarned: number;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loyalty, setLoyalty] = useState<Loyalty | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setProfile(res.data.user);
      setLoyalty(res.data.loyalty);
      setOrders(res.data.orders);
      setDisplayName(res.data.user.displayName);
      setPhone(res.data.user.phone || '');
      setAddress(res.data.user.address || '');
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfile = async () => {
    try {
      await api.put('/profile', { displayName, phone, address });
      setEditing(false);
      fetchProfile();
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6">My Profile</h1>
      <div className="bg-white dark:bg-stone-800 rounded-2xl shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">
            {profile.displayName?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.displayName}</h2>
            <p className="text-sm text-stone-500">{profile.email}</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full p-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded-xl" />
            </div>
            <div className="flex gap-4">
              <button onClick={updateProfile} className="px-6 py-2 bg-amber-700 text-white rounded-xl">Save</button>
              <button onClick={() => setEditing(false)} className="px-6 py-2 bg-stone-200 rounded-xl">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2"><User className="w-4 h-4" /> {profile.displayName}</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {profile.email}</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {profile.phone || 'Not set'}</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {profile.address || 'Not set'}</div>
            <button onClick={() => setEditing(true)} className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-xl">Edit Profile</button>
          </div>
        )}
      </div>

      {/* Loyalty */}
      {loyalty && (
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200">
          <h3 className="font-bold text-lg">Loyalty Points</h3>
          <p className="text-3xl font-serif text-amber-700">{loyalty.points}</p>
          <p className="text-sm text-stone-500">Total earned: {loyalty.totalEarned}</p>
        </div>
      )}

      {/* Order History */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-stone-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="border rounded-xl p-4 bg-white dark:bg-stone-800 shadow">
                <div className="flex justify-between">
                  <span className="font-bold">Order #{order._id.slice(-6)}</span>
                  <span className="text-sm text-stone-500">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-sm">Total: ₹{order.total} | Status: {order.status}</div>
                <div className="text-xs text-stone-500">Items: {order.items.map(i => i.name).join(', ')}</div>
                {order.loyaltyPointsEarned > 0 && <div className="text-xs text-amber-600">+{order.loyaltyPointsEarned} points earned</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;