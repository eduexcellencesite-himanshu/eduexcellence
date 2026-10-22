"use client";

import { useEffect, useState } from "react";
import CommonTable from "../commonTable";

export default function Registration() {
  const [registrations, setRegistrations] =
    useState([]);
const [selectedRegistration, setSelectedRegistration] = useState(null);
const [open, setOpen] = useState(false);

const handleView = (row) => {
  setSelectedRegistration(row);
  setOpen(true);
};
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRegistrations = async (
    currentPage
  ) => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/registrations?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setRegistrations(
          data.registrations || []
        );
        setPages(data.pages || 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations(page);
  }, [page]);

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
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "school",
    label: "School",
  },
  {
    key: "designation",
    label: "Designation",
  },
  {
    key: "state",
    label: "State",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "track",
    label: "Track",
  },
  {
    key: "program",
    label: "Program",
  },
  {
    key: "action",
    label: "Action",
    render: (row) => (
      <button
        onClick={() => handleView(row)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View
      </button>
    ),
  },
];
const tableData = registrations.map((item) => ({
  id: item._id,
  salutation: item.salutation,
  
  name: `${item.firstName || ""} ${item.lastName || ""}`,
  email: item.email,
  mobile: item.mobile,
  school: item.school,
  designation: item.designation,
  state: item.state,
  city: item.city,
  program: item.program,
  track: item.track || "-",
  interestedCountries:
    item.interestedCountries?.join(", ") || "-",
  internationalPrograms:
    item.internationalPrograms ? "Yes" : "No",
  createdAt: new Date(item.createdAt).toLocaleString(),
}));

  return (
    <div>
      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center">
          Loading...
        </div>
      ) : (
        <CommonTable
          title="Registration Enquiries"
          columns={columns}
          data={tableData}
        />
      )}

      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            { length: pages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setPage(index + 1)
                }
                className={`rounded-lg px-4 py-2 ${
                  page === index + 1
                    ? "bg-[#FF9D29] text-white"
                    : "border"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={page === pages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


      {open && selectedRegistration && (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
    <div className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Registration Details
        </h2>

        <button
          onClick={() => setOpen(false)}
          className="text-3xl text-gray-500 hover:text-black"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold">
           {selectedRegistration.salutation}  {selectedRegistration.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">
            {selectedRegistration.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Mobile</p>
          <p className="font-semibold">
            {selectedRegistration.mobile}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">School</p>
          <p className="font-semibold">
            {selectedRegistration.school}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Designation</p>
          <p className="font-semibold">
            {selectedRegistration.designation}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">State</p>
          <p className="font-semibold">
            {selectedRegistration.state}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">City</p>
          <p className="font-semibold">
            {selectedRegistration.city}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Program</p>
          <p className="font-semibold">
            {selectedRegistration.program}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Track</p>
          <p className="font-semibold">
            {selectedRegistration.track}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Interested Countries
          </p>
          <p className="font-semibold">
            {selectedRegistration.interestedCountries}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            International Programs
          </p>
          <p className="font-semibold">
            {selectedRegistration.internationalPrograms}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Created At
          </p>
          <p className="font-semibold">
            {selectedRegistration.createdAt}
          </p>
        </div>

      </div>

      <div className="mt-8 text-right">
        <button
          onClick={() => setOpen(false)}
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