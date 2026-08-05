const Select = ({
    label,
    children,
    className = "",
    ...props
}) => {
    return (
        <div>

            {label && (
                <label className="mb-2 block font-medium">
                    {label}
                </label>
            )}

            <select
                {...props}
                className={`w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600 ${className}`}
            >
                {children}
            </select>

        </div>
    );
};

export default Select;