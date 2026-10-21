
"use client";

import { useCallback, useEffect, useState } from "react";
import CommonTable from "../commonTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Partnership() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [open, setOpen] = useState(false);

  // Safely format dates to prevent "Invalid Date".
  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch partnership enquiries from the backend.
  const fetchInquiries = useCallback(async (currentPage) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setInquiries([]);
        setPages(1);
        setError("Authentication token not found. Please log in again.");
        return;
      }

      if (!API_URL) {
        setError("API URL is missing. Please configure NEXT_PUBLIC_API_URL.");
        setInquiries([]);
        return;
      }

      const response = await fetch(
        `${API_URL}/partnership-inquiries/admin?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed with status ${response.status}`
        );
      }

      if (!data.success) {
        throw new Error(
          data.message || "Failed to fetch partnership inquiries."
        );
      }

      const items =
        data.inquiries ||
        data.partnershipInquiries ||
        data.data ||
        [];

      setInquiries(Array.isArray(items) ? items : []);
      setPages(Math.max(1, Number(data.pages) || 1));
    } catch (err) {
      console.error("Fetch partnership enquiries error:", err);
      setError(
        err.message || "Something went wrong while fetching inquiries."
      );
      setInquiries([]);
      setPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries(page);
  }, [page, fetchInquiries]);

  // Open details modal.
  const handleView = (row) => {
    setSelectedInquiry(row);
    setOpen(true);
  };

  // Close details modal.
  const closeModal = () => {
    setOpen(false);
    setSelectedInquiry(null);
  };

  // Table columns.
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "organisation",
      label: "Organisation",
    },
    {
      key: "interest",
      label: "Interest",
      render: (row) =>
        row.interest ? (
          <span className="whitespace-nowrap rounded-full bg-[#FFF3E2] px-3 py-1 text-sm font-medium text-[#C66B0A]">
            {row.interest}
          </span>
        ) : (
          "-"
        ),
    },
    {
      key: "message",
      label: "Message",
      render: (row) => {
        const message = row.message || "-";

        return (
          <span
            className="block max-w-[150px] truncate"
            title={message}
          >
            {message.length > 10
              ? `${message.slice(0, 10)}...`
              : message}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm capitalize text-orange-800">
          {(row.status || "new").replaceAll("_", " ")}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Submitted At",
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <button
          type="button"
          onClick={() => handleView(row)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          View
        </button>
      ),
    },
  ];

  // Map API response to table rows.
  const tableData = inquiries.map((item) => ({
    id: item._id,
    name: item.name || "-",
    email: item.email || "-",
    phone: item.phone || "",
    organisation: item.organisation || "-",
    interest: item.interest || "",
    message: item.message || "-",
    status: item.status || "new",
    source: item.source || "-",
    pageUrl: item.pageUrl || "-",
    adminNotes: item.adminNotes || "",
    createdAt: formatDate(item.createdAt),
  }));

  return (
    <div className="space-y-5">
      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => fetchInquiries(page)}
            className="shrink-0 rounded-lg border border-red-300 px-3 py-1 hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {/* Enquiries table */}
      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center">
          Loading partnership inquiries...
        </div>
      ) : (
        <CommonTable
          title="Partnership Enquiries"
          columns={columns}
          data={tableData}
        />
      )}

      {!loading && !error && inquiries.length === 0 && (
        <p className="text-center text-gray-500">
          No partnership enquiries found.
        </p>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: pages }, (_, index) => (
            <button
              type="button"
              key={index}
              disabled={loading}
              onClick={() => setPage(index + 1)}
              className={`rounded-lg px-4 py-2 ${
                page === index + 1
                  ? "bg-[#FF9D29] text-white"
                  : "border"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            disabled={page === pages || loading}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Enquiry details modal */}
      {open && selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="partnership-modal-title"
            className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2
                id="partnership-modal-title"
                className="text-xl font-bold sm:text-2xl"
              >
                Partnership Enquiry Details
              </h2>

              <button
                type="button"
                aria-label="Close dialog"
                onClick={closeModal}
                className="text-3xl text-gray-500 hover:text-black"
              >
                &times;
              </button>
            </div>
  
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                ["Name", selectedInquiry.name],
                ["Email", selectedInquiry.email],
                ["Phone", selectedInquiry.phone],
                ["Organisation", selectedInquiry.organisation],
                ["Interest", selectedInquiry.interest],
                ["Status", selectedInquiry.status || "new"],
                ["Source", selectedInquiry.source],
                ["Submitted At", formatDate(selectedInquiry.createdAt)],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="mt-1 break-words font-semibold">
                    {value || "-"}
                  </p>
                </div>
              ))}
              
               
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Message</p>
                <div className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-4">
                  {selectedInquiry.message || "-"}
                </div>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Page URL</p>
                <p className="mt-1 break-all font-medium">
                  {selectedInquiry.pageUrl || "-"}
                </p>
              </div>

              {/* <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Admin Notes</p>
                <div className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-4">
                  {selectedInquiry.adminNotes || "-"}
                </div>
              </div> */}
            </div>

            <div className="mt-8 text-right">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg bg-[#FF9D29] px-6 py-2 text-white hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
