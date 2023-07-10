import React from "react"

const Pagination = ({ currentPage, onPageChange }) => {
    const handleNext = () => {
      onPageChange(currentPage + 1);
    };

    const handlePrevious = () => {
      onPageChange(currentPage - 1);
    };
   return (
      <div className="flex bg-white rounded-lg font-[Poppins]">
         <button onClick={handlePrevious} className="h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
         </button>

         <button onClick={handleNext} className="h-12 border-2  border-indigo-600
               px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
         </button>
      </div>
   )
}

export default Pagination