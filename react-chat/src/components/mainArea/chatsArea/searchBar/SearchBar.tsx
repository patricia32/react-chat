import "./SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
}
export const SearchBar = ({ searchInput, setSearchInput }: SearchBarProps) => {
  return (
    <div className="search">
      <div className={`search__wrapper  ${searchInput ? "highlight" : ""}`}>
        <SearchIcon
          className="search__wrapper-icon"
          sx={{ color: "var(--text-secondary)" }}
        />
        <input
          placeholder="Search messages or people..."
          className="search__wrapper-input"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {searchInput && <div className="search__dropdown"></div>}
    </div>
  );
};
