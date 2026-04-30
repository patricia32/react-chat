import "./ActiveFriendContainer.scss";

export const ActiveFriendContainer = () => {
  return (
    <div className="activeFriendContainer">
      <img
        className="activeFriendContainer-image"
        src="usersPhotos/primary.png"
        alt="Name photo"
      />
      <span className="activeFriendContainer-online"></span>
      <div className="activeFriendContainer-name">Name</div>
    </div>
  );
};
