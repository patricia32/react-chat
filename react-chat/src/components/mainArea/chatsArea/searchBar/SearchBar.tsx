import type { User } from "../../../../models/user";
import { UserCard } from "../../userCard/UserCard";
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
          usersSearch.map((user) => (
            <button className="search__dropdown__user">
              <UserCard user={user} size={"sm"} />
              <div>{user.name}</div>
            </button>
          ))
        ) : (
          <div>Looks like there's no one matching your search</div>
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
          placeholder="Search people..."
          className="search__wrapper-input"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {searchInput && displaySearchDropdown()}
    </div>
  );
};
