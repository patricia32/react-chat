import "./SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = () => {
  return (
    <div className="search">
      <SearchIcon
        className="search-icon"
        sx={{ color: "var(--text-secondary)" }}
      />
      <input
        placeholder="Search messages or people..."
        className="search-input"
      />
    </div>
  );
};
