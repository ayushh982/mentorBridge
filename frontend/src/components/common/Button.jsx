const Button = ({
    children,
    type = "button",
    variant = "primary",
    className = "",
    ...props
}) => {

    const variants = {
        primary:
            "bg-indigo-600 text-white hover:bg-indigo-700",

        secondary:
            "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",

        danger:
            "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            type={type}
            className={`rounded-xl px-5 py-3 font-medium transition ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;