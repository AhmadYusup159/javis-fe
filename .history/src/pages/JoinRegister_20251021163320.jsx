import DarkModeToggle from "@/components/DarkModeToggle";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail } from "@/utils/validateEmail";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email))
      newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registration failed.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>

      <Card
        data-testid="register-card"
        className={`w-full max-w-md shadow-2xl border-0 animate-fade-in backdrop-blur-sm ${
          isDark ? "bg-slate-800/90 text-white" : "bg-white/90"
        }`}
      >
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create account
          </CardTitle>
          <CardDescription
            className={isDark ? "text-gray-300" : "text-gray-600"}
          >
            Fill in the details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className={isDark ? "text-gray-200" : "text-gray-700"}
              >
                Full name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={`transition-all duration-200 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                } ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300"
                }`}
                data-testid="register-name-input"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={isDark ? "text-gray-200" : "text-gray-700"}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                } ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300"
                }`}
                data-testid="register-email-input"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={isDark ? "text-gray-200" : "text-gray-700"}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className={`pr-10 transition-all duration-200 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } ${
                    isDark
                      ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                  data-testid="register-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="register-submit-button"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span>Registering...</span>
                </div>
              ) : (
                <span>Register</span>
              )}
            </Button>

            <div className="text-center">
              <p
                className={
                  isDark ? "text-gray-300 text-sm" : "text-gray-600 text-sm"
                }
              >
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
