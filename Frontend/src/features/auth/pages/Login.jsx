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

      //Redirect to Interview Page
      navigate("/interview");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
  <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-black px-4">

    {/* Login Card */}
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-300 text-sm">
          Login to your SkillScan AI account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-70"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>

      {/* Footer */}
      <p className="text-sm text-gray-300 text-center mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-pink-400 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </div>

  </main>
);
};

export default Login;
