const Input = ({
    label,
    error,
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

            <input
                {...props}
                className={`w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600 ${className}`}
            />

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;