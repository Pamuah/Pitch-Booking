import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Menu,
  MessageSquare,
  Search,
  User,
  X,
  MoreHorizontal,
  Home,
  Calendar,
  Star,
  Settings,
  Users,
  HelpCircle,
  LogOut,
  PieChart,
  FileText,
  BarChart2,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

// Utility function (replace if you have a global version)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// === Breadcrumb components ===
const Breadcrumb = React.forwardRef(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// Sidebar component
const Sidebar = ({ isOpen }) => {
  return (
    <aside
  className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 transition-all duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="h-full overflow-y-auto py-4">
    <nav className="space-y-4 px-3">
      {/* MAIN SECTION */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">Main</h2>
        <Link
          to="/admindashboard"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/bookings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <Calendar size={18} />
          <span>Bookings</span>
        </Link>
        <Link
          to="/admin/pitches"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <Calendar size={18} />
          <span>Pitches</span>
        </Link>
        <Link
          to="/admin/revenue"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <BarChart2 size={18} />
          <span>Revenue</span>
        </Link>
        <Link
          to="/admin/reviews"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <Star size={18} />
          <span>Reviews</span>
        </Link>
      </div>

      {/* REPORT SECTION */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">Reports</h2>
        <Link
          to="/admin/analytics"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <PieChart size={18} />
          <span>Analytics</span>
        </Link>
        <Link
          to="/admin/report"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <FileText size={18} />
          <span>Report</span>
        </Link>
      </div>

      {/* USER SECTION */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">User</h2>
        <Link
          to="/admin/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        <Link
          to="/admin/help"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-300 text-gray-700 hover:text-black"
        >
          <HelpCircle size={18} />
          <span>Help Center</span>
        </Link>
      </div>

      <div className="border-t pt-3 mt-4">
        <Link
          to="/adminlogin"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-black text-red-600 hover:text-white"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  </div>
</aside>

  );
};

// === Main AdminLayout ===
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getBreadcrumbTitle = () => {
    const path = location.pathname;
    if (path === "/admindashboard") return "Dashboard";
    if (path === "/admin/pitches") return "Manage Pitches";
    if (path === "/admin/bookings") return "Booking Management";
    if (path === "/admin/reviews") return "Reviews Management";
    if (path === "/admin/settings") return "Settings";
    return "";
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="text-gray-600 hover:text-black">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/admindashboard">
              <h1 className="text-2xl font-bold" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                PitchBooking
              </h1>
            </Link>
          </div>


          <div className="flex items-center space-x-6">
            <button className="relative">
              <Bell size={20} className="text-gray-600 hover:text-black" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            <button className="relative">
              <MessageSquare size={20} className="text-gray-600 hover:text-black" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-black" />
              </div>
              <span className="text-sm hidden md:inline-block">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Section */}
      <div className="bg-gray-50 py-2 px-6 border-b border-gray-200">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/admindashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;