import "./MainMenu.scss";

import { faBoxArchive } from "@fortawesome/free-solid-svg-icons/faBoxArchive";
import {
  faPhone,
  faComment,
  faCommentDots,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../utils/icon";

interface MainMenuProps {
  selectedField: string;
  setSelectedField: (value: string) => void;
}
export const MainMenu = ({
  setSelectedField,
  selectedField,
}: MainMenuProps) => {
  const selectField = (field: string) => {
    if (selectedField === field) setSelectedField("");
    else setSelectedField(field);
  };

  const displayFieldItem = (field: string, icon: IconDefinition) => {
    return (
      <button
        onClick={() => selectField(field)}
        className={`menu__fields__item ${
          field === selectedField ? "active" : ""
        }`}
      >
        <Icon icon={icon} />
        <p>{field}</p>
      </button>
    );
  };

  return (
    <div className="menu">
      <div className="menu__header">
        <img
          className="menu__header-image"
          src="usersPhotos/primary.png"
          alt="Current user profile picture"
        />
        <div className="menu__header-name">John</div>
      </div>
      <div className="menu__fields">
        {displayFieldItem("Chats", faComment)}
        {displayFieldItem("Calls", faPhone)}{" "}
        {displayFieldItem("Message requests", faCommentDots)}{" "}
        {displayFieldItem("Archive", faBoxArchive)}
      </div>
    </div>
  );
};
