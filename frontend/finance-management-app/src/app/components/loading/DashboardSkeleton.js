"use client";

const DashboardSkeleton = () => {
  return (
    <div className="ml-0 md:ml-12 p-6 animate-pulse">

      <div className="h-10 w-64 bg-gray-300 rounded mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-5 h-44">

            <div className="h-5 w-32 bg-gray-300 rounded" />

            <div className="h-10 w-24 bg-gray-200 rounded mt-6" />

            <div className="h-4 w-40 bg-gray-200 rounded mt-10" />

          </div>
        ))}

      </div>

      <div className="mt-10">

        <div className="h-7 w-48 bg-gray-300 rounded mb-6" />

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow h-20 mb-4" />
        ))}

      </div>

    </div>
  )
}

export default DashboardSkeleton;