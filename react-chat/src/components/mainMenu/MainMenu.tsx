import "./MainMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faComment,
  faCommentDots,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons/faBoxArchive";

export const MainMenu = () => {
  const displayFieldItem = (title: string, icon: IconDefinition) => {
    return (
      <button className="menu__fields__item">
        <FontAwesomeIcon icon={icon} className="menu__fields__item-icon" />
        <p>{title}</p>
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
