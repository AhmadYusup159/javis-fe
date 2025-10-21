import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Loader2, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState(""); // added
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/dashboard",
          {
            withCredentials: true,
          }
        );

        // BE returns { message: `Selamat datang, ${req.user.email}!` }
        setWelcomeMessage(response.data?.message || "");
        // keep user state if backend also returns user info
        setUser(response.data?.user || null);
      } catch (error) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Card */}
          <Card
            data-testid="dashboard-card"
            className={`shadow-2xl border-0 backdrop-blur-sm animate-fade-in ${
              isDark ? "bg-slate-800/90 text-white" : "bg-white/90"
            }`}
          >
            <CardHeader className="border-b border-opacity-20 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-2xl md:text-3xl font-bold truncate">
                      Hallo!
                    </CardTitle>
                    <p
                      data-testid="username-display"
                      className={`mt-1 text-sm md:text-lg truncate ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {welcomeMessage || user?.username || "User"}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <Button
                    data-testid="logout-button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    variant="outline"
                    className={`w-full md:w-auto justify-center gap-2 transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "border-slate-600 hover:bg-slate-700 text-white"
                        : "hover:bg-red-50 hover:border-red-300"
                    }`}
                  >
                    {loggingOut ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Logging out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div
                  className={`p-6 rounded-lg border ${
                    isDark
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDark ? "text-blue-400" : "text-blue-900"
                    }`}
                  >
                    Dashboard Overview
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                    You are successfully logged in and authenticated. This is
                    your protected dashboard area.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Card
                    className={`${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          24
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Tasks
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          12
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Projects
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${
                            isDark ? "text-green-400" : "text-green-600"
                          }`}
                        >
                          8
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
