import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("user"));

  const navigate = useNavigate();

  function handlePasswordChange(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!currentPassword || !newPassword || !passwordConfirm) {
      alert("Fill out all fields");
      return;
    }
    if (!token) {
      alert("You are not logged in");
      return;
    }
    axios
      .patch(
        "http://localhost:3000/api/v1/user/update-my-password",
        {
          passwordCurrent: currentPassword,
          newPassword,
          passwordConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        localStorage.setItem("user", res.data.data.user.email);
        localStorage.setItem("name", res.data.data.user.name);
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You are not logged in");
      return;
    }
    axios.get("http://localhost:3000/api/v1/user/logout").then((res) => {
      console.log(res);

      if (res.data.status === "success") {
        window.setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        console.log("ERROR");
      }

      localStorage.clear("jwt");
      localStorage.clear("user");
      localStorage.clear("name");

      // navigate("/");
    });
  }

  function handleUpdateUser(e) {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out all fields");
      return;
    }
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You are not logged in");
      return;
    }
    axios
      .patch(
        "http://localhost:3000/api/v1/user/update-me",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Chaned User Data", res);
      });
  }

  return (
    <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Postavke</h2>
        <form className="space-y-6">
          {/* Account Settings Form */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Ime
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email addresa
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 mr-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={handleLogout}
            >
              Odjavi se
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handleUpdateUser}
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
            <label
              htmlFor="password-current"
              className="block text-sm font-medium text-gray-700"
            >
              Trenutni password
            </label>
            <input
              type="password"
              id="password-current"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              name="currentPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Novi password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name="newPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password-confirm"
              className="block text-sm font-medium text-gray-700"
            >
              Potvrdi password
            </label>
            <input
              type="password"
              id="password-confirm"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              name="passwordConfirm"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handlePasswordChange}
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
