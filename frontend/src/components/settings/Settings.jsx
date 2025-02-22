const Settings = () => {
  return (
    <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Your account settings</h2>
        <form className="space-y-6">
          {/* Account Settings Form */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Ime
            </label>
            <input
              type="text"
              id="name"
              defaultValue="John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email addresa
            </label>
            <input
              type="email"
              id="email"
              defaultValue="john@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="text-right">
          <button
              type="submit"
              className="px-4 py-2 mr-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Odjavi se
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Sačuvaj postavke
            </button>
          </div>
        </form>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* Password Change Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Promjena passworda</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="password-current" className="block text-sm font-medium text-gray-700">
              Trenutni password
            </label>
            <input
              type="password"
              id="password-current"
              placeholder="••••••••"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Novi password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
              Potvrdi password
            </label>
            <input
              type="password"
              id="password-confirm"
              placeholder="••••••••"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Sačuvaj password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;