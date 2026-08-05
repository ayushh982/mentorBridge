const Textarea = ({
    label,
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

            <textarea
                rows={5}
                {...props}
                className={`w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600 ${className}`}
            />

        </div>
    );
};

export default Textarea;