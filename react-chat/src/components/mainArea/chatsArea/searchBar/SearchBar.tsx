import type { User } from "../../../../models/user";
import "./SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  usersSearch: User[];
  searchLoading: boolean;
  searchError: boolean;
}
export const SearchBar = ({
  searchInput,
  setSearchInput,
  usersSearch,
  searchLoading,
  searchError,
}: SearchBarProps) => {
  const displaySearchDropdown = () => {
    return (
      <div className="search__dropdown">
        {searchLoading ? (
          "Loading..."
        ) : searchError ? (
          "Something went wrong"
        ) : usersSearch.length > 0 ? (
          usersSearch.map((user) => <div>{user.name}</div>)
        ) : (
          <div>No results</div>
        )}
      </div>
    );
  };
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
      {searchInput && displaySearchDropdown()}
    </div>
  );
};
