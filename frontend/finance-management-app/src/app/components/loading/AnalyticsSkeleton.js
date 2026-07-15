"use client";

const AnalyticsSkeleton=()=>{

return(

<div className="animate-pulse p-6">

<div className="h-9 w-72 bg-gray-300 rounded mb-8"/>

<div className="grid grid-cols-2 gap-6">

<div className="h-36 bg-gray-300 rounded-xl"/>

<div className="h-36 bg-gray-300 rounded-xl"/>

</div>

<div className="h-[320px] bg-gray-300 rounded-xl mt-8"/>

<div className="grid grid-cols-2 gap-6 mt-8">

<div className="h-[320px] bg-gray-300 rounded-xl"/>

<div className="h-[320px] bg-gray-300 rounded-xl"/>

</div>

<div className="h-44 bg-gray-300 rounded-xl mt-8"/>

</div>

)

}

export default AnalyticsSkeleton;