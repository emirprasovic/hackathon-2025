export default function ProfilePage() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/green2.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <nav className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-green-600"
                >
                  <span className="mr-2">⚙️</span>
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="/my-bookings"
                  className="flex items-center text-gray-700 hover:text-green-600"
                >
                  <span className="mr-2">💼</span>
                  <span>My donations</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-green-600"
                >
                  <span className="mr-2">⭐</span>
                  <span>My contribution</span>
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Admin
              </h5>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">🗺️</span>
                    <span>Manage donations</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">👥</span>
                    <span>Manage users</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">⭐</span>
                    <span>Manage discounts</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">💼</span>
                    <span>Manage organizations</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">
                Your account settings
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value="John Doe"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value="john@example.com"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="img/users/user.jpg"
                    alt="User photo"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer text-sm text-green-600 hover:text-green-700"
                    >
                      Choose New Photo
                    </label>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save settings
                  </button>
                </div>
              </form>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Password change</h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="password-current"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current password
                  </label>
                  <input
                    type="password"
                    id="password-current"
                    placeholder="••••••••"
                    required
                    minLength="8"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    minLength="8"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password-confirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="password-confirm"
                    placeholder="••••••••"
                    required
                    minLength="8"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
