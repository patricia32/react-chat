import "./MainMenu.scss";
import "../../utils/icon.scss";

import { faBoxArchive } from "@fortawesome/free-solid-svg-icons/faBoxArchive";
import {
  faPhone,
  faComment,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppStore } from "../../store/appStore";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export const MainMenu = () => {
  const selectedField = useAppStore((state) => state.selectedField);
  const setSelectedField = useAppStore((state) => state.setSelectedField);
  const [openMenu, setOpenMenu] = useState(false);

  const selectField = (field: string) => {
    if (selectedField === field) setSelectedField("");
    else setSelectedField(field);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const displayFieldItem = (field: string, icon: IconDefinition) => {
    return (
      <button
        onClick={() => selectField(field)}
        className={`item ${field === selectedField ? "active" : ""}`}
      >
        <div className="icon">
          <FontAwesomeIcon icon={icon} className="icon-item" />
        </div>
        <p>{field}</p>
      </button>
    );
  };

  return (
    <div className="menu">
      <div className={`menu__header ${openMenu ? "mobile" : ""}`}>
        <img
          className="menu__header-image"
          src="usersPhotos/primary.png"
          alt="Current user profile picture"
        />
        <div className="menu__header-name">John</div>
      </div>
      <div className="menu__hamburger" onClick={toggleMenu}>
        <MenuIcon />
      </div>
      <div className="menu__fields">
        {displayFieldItem("Chats", faComment)}
        {displayFieldItem("Calls", faPhone)}{" "}
        {displayFieldItem("Archive", faBoxArchive)}
      </div>
      {/* <div className={`${openMenu ? "open" : "close"}`}> */}
      <div className={`menu__fieldsMobile ${openMenu ? "open" : "close"}`}>
        {displayFieldItem("Chats", faComment)}
        {displayFieldItem("Calls", faPhone)}{" "}
        {displayFieldItem("Archive", faBoxArchive)}
      </div>
      {/* </div> */}
    </div>
  );
};
