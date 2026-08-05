const Avatar = ({
    src,
    alt,
    size = "h-12 w-12",
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`${size} rounded-full object-cover`}
        />
    );
};

export default Avatar;