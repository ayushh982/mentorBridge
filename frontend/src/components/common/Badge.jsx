const Badge = ({
    children,
    color = "indigo",
}) => {

    const colors = {
        indigo: "bg-indigo-50 text-indigo-600",
        green: "bg-green-50 text-green-600",
        red: "bg-red-50 text-red-600",
        yellow: "bg-yellow-50 text-yellow-600",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${colors[color]}`}
        >
            {children}
        </span>
    );
};

export default Badge;