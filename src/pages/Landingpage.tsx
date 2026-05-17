import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DarkModeToggle } from "@components/common/index";
import { useAuth } from "@hooks/index";
import { BarChart, Lock, Users2 } from "lucide-react";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      description: "Full platform access with team and lead management capabilities",
      features: ["Full Access", "Team Management", "Advanced Analytics"],
    },
    {
      id: "sales",
      title: "Sales Agent",
      description: "Manage assigned leads, track progress, and close deals efficiently",
      features: ["Lead Management", "Progress Tracking", "Performance Analytics"],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-slate-900 font-bold text-lg">LD</span>
            </div>
            <span className="text-xl font-semibold text-slate-900 dark:text-white">
              Leads Dashboard
            </span>
          </div>
          <DarkModeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            Manage Your Sales Leads Efficiently
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 transition-colors duration-300">
            A professional platform designed for teams to organize, track, and manage sales leads with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg font-semibold transition-colors duration-300"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="secondary"
              className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-semibold transition-colors duration-300"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              Select Your Role
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">
              Choose the account type that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg"
              >
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                  {role.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">
                  {role.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {role.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    onClick={() => navigate(`/login?role=${role.id}`)}
                    className="w-full px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate(`/register?role=${role.id}`)}
                    variant="secondary"
                    className="w-full px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-16 transition-colors duration-300">
            Why Choose Leads Dashboard?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
                <span className="text-2xl"><BarChart/></span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                Track Performance
              </h3>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Monitor lead status, conversion rates, and team performance with comprehensive analytics.
              </p>
            </div>

            <div className="p-8">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
                <span className="text-2xl"><Users2/></span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                Team Collaboration
              </h3>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Work seamlessly with your team, share updates, and stay aligned on all lead activities.
              </p>
            </div>

            <div className="p-8">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
                <span className="text-2xl"><Lock/></span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                Secure & Reliable
              </h3>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Enterprise-grade security to protect your business data and lead information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-300">
            Try the Platform
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">
              Use these demo credentials to explore the platform:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors duration-300">Email</p>
                <code className="block bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-lg text-slate-900 dark:text-white font-mono text-sm transition-colors duration-300">
                  admin@example.com
                </code>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 transition-colors duration-300">Password</p>
                <code className="block bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-lg text-slate-900 dark:text-white font-mono text-sm transition-colors duration-300">
                  123456
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
            © 2024 Leads Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
