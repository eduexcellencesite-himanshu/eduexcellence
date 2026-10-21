"use client";

export default function CommonTable({ title, columns, data }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E7E9F0] bg-white shadow-[0_20px_60px_rgba(0,0,0,.06)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EEF1F6] bg-gradient-to-r from-[#FFF8EF] to-white px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-[#FF9D29]" />

          <div>
            <h2 className="text-[28px] font-bold text-[#16223A]">
              {title}
            </h2>
            <p className="mt-1 text-[14px] text-[#6B7488]">
              Manage and track all records
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#FFE0B8] bg-white px-5 py-3 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#FF9D29]">
            Total Records : {data.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-[#07142D]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-[13px] font-semibold uppercase tracking-[1.5px] text-white"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#EEF1F6] transition-all duration-300 hover:bg-[#FFF8EF] hover:shadow-[inset_4px_0_0_#FF9D29] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFBFD]"
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-5 text-[14px] font-medium text-[#16223A]"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-[15px] text-[#6B7488]"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}