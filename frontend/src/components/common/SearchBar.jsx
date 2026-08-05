import { Search } from "lucide-react";

const SearchBar = ({
    value,
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <div className="relative">

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
            />

        </div>
    );
};

export default SearchBar;