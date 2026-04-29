import "./MainMenu.css";

export const MainMenu = () => {
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
    </div>
  );
};
