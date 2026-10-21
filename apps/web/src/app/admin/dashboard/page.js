"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";


export default function Dashboard() {
  return (
    <ProtectedRoute>
    <div>
      <h2 className="mb-6 text-3xl font-bold text-[#16223A]">
        Dashboard Overview
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Contacts
          </p>
          <h3 className="mt-2 text-4xl font-bold">
            128
          </h3>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>
          <h3 className="mt-2 text-4xl font-bold">
            25
          </h3>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Programs
          </p>
          <h3 className="mt-2 text-4xl font-bold">
            18
          </h3>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Events
          </p>
          <h3 className="mt-2 text-4xl font-bold">
            10
          </h3>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}