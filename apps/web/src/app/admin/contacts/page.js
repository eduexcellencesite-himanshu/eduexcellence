"use client";
 
import { useEffect, useState } from "react";
import CommonTable from "../commonTable";
export default function Contacts() {
const [contacts, setContacts] = useState([]);
const [page, setPage] = useState(1);
const [pages, setPages] = useState(1);
const [loading, setLoading] = useState(false);
const [selectedContact, setSelectedContact] = useState(null);
const [open, setOpen] = useState(false);
 
const handleView = (row) => {
  setSelectedContact(row);
  setOpen(true);
};
const fetchContacts = async (currentPage) => {
  try {
    setLoading(true);
 
    const token = localStorage.getItem("token");
 
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/contacts?page=${currentPage}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 
    const data = await response.json();
 
  if (data.success) {
  setContacts(data.contacts || []);
  setPages(data.pages || 1);
}
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
 
useEffect(() => {
fetchContacts(page);
}, [page]);
const columns = [
  {
    key: "fullName",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Phone",
  },
  {
    key: "institution",
    label: "Institution",
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
const tableData = contacts.map((item) => ({
  id: item._id,
  salutation: item.salutation || "-",
  fullName: item.fullName || "-",
  email: item.email || "-",
  phone: item.phone || "-",
  institution: item.institution || "-",
  designation: item.designation || "-",
  state: item.state || "-",
  city: item.city || "-",
  message: item.message || "-",
  createdAt: new Date(item.createdAt).toLocaleString(),
}));
{loading ? (
  <div className="rounded-3xl bg-white p-10 text-center">
    Loading...
  </div>
) : (
  <CommonTable
    title="Contact Enquiries"
    columns={columns}
    data={tableData}
  />
)}
return (
  <div>
    {loading ? (
      <div className="rounded-3xl bg-white p-10 text-center">
        Loading...
      </div>
    ) : (
      <CommonTable
        title="Contact Enquiries"
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
 
 
    {open && selectedContact && (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
    <div className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
 
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Contact Details
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
          <p className="text-sm text-gray-500">Salutation</p>
          <p className="font-semibold">{selectedContact.salutation}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-semibold">{selectedContact.fullName}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{selectedContact.email}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-semibold">{selectedContact.phone}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">Institution</p>
          <p className="font-semibold">{selectedContact.institution}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">Designation</p>
          <p className="font-semibold">{selectedContact.designation}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">State</p>
          <p className="font-semibold">{selectedContact.state}</p>
        </div>
 
        <div>
          <p className="text-sm text-gray-500">City</p>
          <p className="font-semibold">{selectedContact.city}</p>
        </div>
 
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Message</p>
          <p className="rounded-lg bg-gray-50 p-3">
            {selectedContact.message}
          </p>
        </div>
 
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Created At</p>
          <p className="font-semibold">{selectedContact.createdAt}</p>
        </div>
 
      </div>
 
      <div className="mt-6 text-right">
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