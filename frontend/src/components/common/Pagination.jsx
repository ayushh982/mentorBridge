const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    return (
        <div className="mt-10 flex justify-center gap-3">

            {Array.from({ length: totalPages }).map((_, index) => (

                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`h-10 w-10 rounded-xl ${
                        currentPage === index + 1
                            ? "bg-indigo-600 text-white"
                            : "border border-gray-200"
                    }`}
                >
                    {index + 1}
                </button>

            ))}

        </div>
    );
};

export default Pagination;