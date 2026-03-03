import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  //handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("All Fields Are Required");
      return;
    }
    try {
      setLoading(false);
      //API  call
      await handleLogin(formData);
      toast.success("User Logged In Successfully");

      setFormData({
        email: "",
        password: "",
      });

      //Redirect to home Page
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {/* Login Card */}
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            Login to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your Email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white rounded-lg hover:bg-green-600 w-full h-12 text-lg font-semibold transition disabled:opacity-70"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
