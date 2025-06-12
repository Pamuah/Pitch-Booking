import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Search,
} from "lucide-react";

const ReviewsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Alex Johnson",
      rating: 5,
      comment: "Great facilities and well-maintained pitches!",
      date: "2 days ago",
      status: "approved",
    },
    {
      id: 2,
      user: "Sarah Williams",
      rating: 4,
      comment: "Good experience but changing rooms could be cleaner",
      date: "5 days ago",
      status: "pending",
    },
    {
      id: 3,
      user: "Michael Brown",
      rating: 5,
      comment: "Perfect for our weekly games. Will book again!",
      date: "1 week ago",
      status: "approved",
    },
    {
      id: 4,
      user: "Emily Davis",
      rating: 3,
      comment: "The pitch was great, but the booking process was confusing.",
      date: "1 week ago",
      status: "rejected",
    },
    {
      id: 5,
      user: "David Wilson",
      rating: 4,
      comment: "Overall a good experience. The staff were very helpful.",
      date: "2 weeks ago",
      status: "approved",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === "approved" && review.status !== "approved") {
      return false;
    }
    if (activeFilter === "pending" && review.status !== "pending") {
      return false;
    }
    if (activeFilter === "rejected" && review.status !== "rejected") {
      return false;
    }
    const searchRegex = new RegExp(searchQuery, "i");
    return searchRegex.test(review.user) || searchRegex.test(review.comment);
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">
                Reviews Management
              </h1>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "all"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Reviews
                </button>
                <button
                  onClick={() => setActiveFilter("approved")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "approved"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setActiveFilter("pending")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "pending"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveFilter("rejected")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === "rejected"
                      ? "bg-green-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="w-full bg-gray-100 text-gray-800 border-0 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Comment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {review.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {review.comment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} className="inline-block mr-2" />
                Previous
              </button>
              <div className="text-sm text-gray-500">
                <span>Page</span>
                <span className="font-medium">{currentPage}</span>
                <span>of</span>
                <span className="font-medium">{totalPages}</span>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight size={16} className="inline-block ml-2" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default ReviewsPage;