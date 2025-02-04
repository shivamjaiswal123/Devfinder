import { Bell, Search, User } from "lucide-react";

export default function Appbar() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo on the left */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold font-heading text-gray-100">
              DevConnect
            </span>
          </div>

          <div className="flex-1 flex justify-center mx-4 ">
            <div className="relative w-full max-w-xs hidden sm:flex">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                className="pl-10 bg-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400 w-full"
                type="search"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <button className="text-gray-400 hover:text-gray-100 transition">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-400 hover:text-gray-100 transition">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
