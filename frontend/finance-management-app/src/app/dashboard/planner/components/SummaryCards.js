import React from 'react'

const SummaryCards = ({totalSaved, totalTarget, activeGoals}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
      
      {/* total saved */}
      <div className='bg-white rounded-2xl shadow-md p-5 border border-purple-400'>
        <p className='text-gray-500 text-sm'>Total saved</p>
        <h2 className='text-3xl font-bold text-purple-600 mt-2'>₹{totalSaved.toLocaleString()}</h2>
      </div>

      {/* active Goals */}
      <div className='bg-white rounded-2xl shadow-md p-5 border border-purple-400'>
        <p className='text-gray-500 text-sm'>Active goals</p>
        <h2 className='text-3xl font-bold text-purple-600 mt-2'>{activeGoals}</h2>
      </div>

      {/* Total target */}
      <div className='bg-white rounded-2xl shadow-md p-5 border border-purple-400'>
        <p className='text-gray-500 text-sm'>Total target</p>
        <h2 className='text-3xl font-bold text-purple-600 mt-2'>₹{totalTarget.toLocaleString()}</h2>
      </div>
    </div>
  )
}

export default SummaryCards
