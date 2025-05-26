import React, { useState } from 'react';

const initialProfile = {
  username: 'Morty Smith',
  email: 'Professor , Chercheur',
  password: 'password123',
  phone: '+213 123 456 789',
  role: 'Professor , Chercheur',
  urls: ['https://LinkedIn.com', 'http://twitter.com/shadcn'],
  emailNotifications: true,
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordToggle = () => setShowPassword((prev) => !prev);

  const handleUrlChange = (idx: number, value: string) => {
    setProfile((prev) => {
      const urls = [...prev.urls];
      urls[idx] = value;
      return { ...prev, urls };
    });
  };

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      setProfile((prev) => ({ ...prev, urls: [...prev.urls, newUrl.trim()] }));
      setNewUrl('');
    }
  };

  const handleRemoveUrl = (idx: number) => {
    setProfile((prev) => {
      const urls = prev.urls.filter((_, i) => i !== idx);
      return { ...prev, urls };
    });
  };

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend
    alert('Profile updated!');
  };

  const handleLogout = () => {
    // TODO: Integrate with backend
    alert('Logged out!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between min-h-screen">
        <div>
          <div className="flex items-center gap-2 px-6 py-6 border-b">
            <div className="bg-blue-600 rounded p-1">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#fff"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="8" width="10" height="8" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M9 16v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2" stroke="#2563eb" strokeWidth="2"/></svg>
            </div>
            <span className="font-bold text-lg">TimeSwap</span>
          </div>
          <nav className="mt-6">
            <ul>
              <li>
                <a href="/dashboard" className="flex items-center px-6 py-3 hover:bg-gray-100">
                  <span className="material-icons mr-3">home</span> Home
                </a>
              </li>
              <li>
                <a href="/dashboard/swap" className="flex items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600">
                  <span className="material-icons mr-3">swap_horiz</span> Swap Request
                </a>
              </li>
              <li>
                <a href="/dashboard/notifications" className="flex items-center px-6 py-3 hover:bg-gray-100">
                  <span className="material-icons mr-3">notifications</span> Notifications
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">12</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 border-t">
          <span className="material-icons mr-3">logout</span> Log out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <form onSubmit={handleEditProfile} className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-1">Profile and Settings</h2>
          <p className="text-gray-500 mb-6">Manage your account settings and set e-mail preferences.</p>

          <div className="mb-4">
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 pr-10"
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="absolute right-2 top-8 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? (
                <span className="material-icons">visibility_off</span>
              ) : (
                <span className="material-icons">visibility</span>
              )}
            </button>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Role/Title</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">URLs</label>
            <div className="space-y-2">
              {profile.urls.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={e => handleUrlChange(idx, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveUrl(idx)}
                    className="text-red-500 px-2"
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add URL"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Add URL
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">Notification settings</label>
            <div className="flex items-center gap-4 mt-2">
              <span>Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={profile.emailNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:bg-blue-600 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleLogout}
              className="border border-red-500 text-red-600 px-4 py-2 rounded hover:bg-red-50"
            >
              Log out
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit profile
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
