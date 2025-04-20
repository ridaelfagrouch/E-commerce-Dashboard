import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResponsiveLoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@shopdash.com");
  const [password, setPassword] = useState("2025ShopDash");
  const [isLoading, setIsLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    // Trigger entrance animations after component mounts
    setAnimateIn(true);

    // Set up responsive window resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      console.log("Login attempt with:", { email, password });
      setIsLoading(false);
    }, 1500);
    navigate("/dashboard");
  };

  // Decorative background shapes
  const BackgroundShapes = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-16 -left-16 w-32 md:w-64 h-32 md:h-64 rounded-full bg-indigo-500 opacity-10"></div>
      <div className="absolute top-1/4 -right-16 w-40 md:w-80 h-40 md:h-80 rounded-full bg-indigo-600 opacity-10"></div>
      <div className="absolute bottom-0 left-1/4 w-20 md:w-40 h-20 md:h-40 rounded-full bg-indigo-400 opacity-10"></div>
    </div>
  );

  // Is mobile view?
  const isMobile = windowWidth < 1024;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 overflow-hidden relative">
      {/* Hero panel - Full width on mobile, Left side on desktop */}
      <div
        className={`${
          isMobile ? "h-48 sm:h-64" : "hidden"
        } lg:flex lg:w-1/2 bg-indigo-700 flex-col justify-center items-center text-white p-4 sm:p-8 lg:p-12 relative transition-all duration-1000 ease-out ${
          animateIn
            ? "translate-y-0 lg:translate-x-0"
            : "-translate-y-full lg:-translate-x-full"
        }`}
      >
        <BackgroundShapes />

        <div
          className="flex items-center mb-2 lg:mb-8 transition-all duration-700 ease-out delay-300 transform scale-0 opacity-0 z-[99999]"
          style={{
            transform: animateIn ? "scale(1)" : "scale(0)",
            opacity: animateIn ? 1 : 0,
          }}
        >
          <ShoppingBag className="h-6 sm:h-8 lg:h-12 w-6 sm:w-8 lg:w-12 mr-2 lg:mr-4" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ">
            ShopDash
          </h1>
        </div>

        {/* Only show on larger screens */}
        <div className="hidden lg:block w-full">
          <h2
            className={`text-3xl font-bold mb-6 transition-all duration-700 delay-500 transform ${
              animateIn
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Welcome back!
          </h2>

          <p
            className={`text-xl mb-12 text-center max-w-md transition-all duration-700 delay-700 transform ${
              animateIn
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Manage your store, track sales, and grow your business all in one
            place.
          </p>

          {/* Animated stats preview - desktop only */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div
              className={`bg-indigo-600/50 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all duration-500 delay-900 transform ${
                animateIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-400/30 flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-indigo-200 font-medium">Today's Revenue</p>
              </div>
              <p className="text-2xl font-bold">$1,245.89</p>
              <p className="text-indigo-200 text-sm mt-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                8.2% vs yesterday
              </p>
            </div>

            <div
              className={`bg-indigo-600/50 backdrop-blur-md p-6 rounded-xl shadow-lg transition-all duration-500 delay-1000 transform ${
                animateIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-400/30 flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-indigo-200 font-medium">Orders Completed</p>
              </div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-indigo-200 text-sm mt-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                4.7% vs yesterday
              </p>
            </div>
          </div>
        </div>

        {/* Animated floating elements */}
        <div className="absolute bottom-10 right-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 opacity-20 rounded-lg border border-indigo-300 animate-float1"></div>
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 opacity-20 rounded-full border border-indigo-300 animate-float2"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 opacity-20 rounded-lg border border-indigo-300 animate-float3"></div>

        <style>{`
          @keyframes float1 {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
          }
          @keyframes float2 {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(-15deg);
            }
          }
          @keyframes float3 {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(5deg);
            }
          }
          .animate-float1 {
            animation: float1 8s ease-in-out infinite;
          }
          .animate-float2 {
            animation: float2 9s ease-in-out infinite 1s;
          }
          .animate-float3 {
            animation: float3 7s ease-in-out infinite 2s;
          }
        `}</style>
      </div>

      {/* Login form container - Full width with padding adjustments */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-6 md:p-8 py-10">
        <div
          className={`w-full max-w-md transition-all duration-1000 transform ${
            animateIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className={`flex items-center justify-center mb-8`}>
            <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-700 mr-2" />
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">
              ShopDash
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Please enter your details to sign in
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 group">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-6 group">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-700 text-sm font-medium">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-700 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-200 mb-4 flex items-center justify-center relative overflow-hidden group text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-xs sm:text-sm text-gray-500">
                  OR
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center group text-sm sm:text-base px-4"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="mr-1">Continue with Google</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200" />
                </button>

                {/* Show Apple sign in only if enough vertical space (hide on very small screens) */}
                <button
                  type="button"
                  className="w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200 flex items-center justify-center group text-sm sm:text-base px-4"
                >
                  <svg
                    fill="#ffffff"
                    viewBox="-52.01 0 560.035 560.035"
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path>
                    </g>
                  </svg>
                  <span className="mr-1">Continue with Apple</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
