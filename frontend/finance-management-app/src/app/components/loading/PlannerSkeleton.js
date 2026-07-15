"use client";

const PlannerSkeleton = () => {

    return (

        <div className="animate-pulse p-6">

            <div className="h-10 w-64 bg-gray-300 rounded mb-8" />

            <div className="grid grid-cols-3 gap-6">

                {

                    [1, 2, 3].map(i =>

                        <div
                            key={i}
                            className="h-36 bg-gray-300 rounded-xl" />

                    )

                }

            </div>

            <div className="mt-10">

                <div className="h-8 w-52 bg-gray-300 rounded mb-6" />

                {

                    [1, 2].map(i =>

                        <div
                            key={i}
                            className="h-40 bg-gray-300 rounded-xl mb-6" />

                    )

                }

            </div>

            <div className="mt-10">

                <div className="h-8 w-52 bg-gray-300 rounded mb-6" />

                {

                    [1, 2].map(i =>

                        <div
                            key={i}
                            className="h-32 bg-gray-300 rounded-xl mb-6" />

                    )

                }

            </div>

        </div>

    )

}

export default PlannerSkeleton;