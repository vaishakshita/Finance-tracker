"use client";

const TransactionSkeleton = () => {

    return (

        <div className="animate-pulse p-6">

            <div className="flex justify-between">

                <div className="h-9 w-48 bg-gray-300 rounded" />

                <div className="h-10 w-48 bg-gray-300 rounded" />

            </div>

            <div className="h-12 w-80 bg-gray-300 rounded mt-8" />

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div className="h-36 bg-gray-300 rounded-xl" />

                <div className="h-36 bg-gray-300 rounded-xl" />

            </div>

            <div className="mt-8">

                {

                    [1, 2, 3, 4, 5].map(i =>

                        <div
                            key={i}
                            className="h-24 bg-gray-300 rounded-xl mb-4" />

                    )

                }

            </div>

        </div>

    )

}

export default TransactionSkeleton;