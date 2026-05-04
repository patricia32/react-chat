import "./ActiveFriendContainer.scss";

interface ActiveFriendContainerProps {
  name: string;
  imagePath: string;
}
export const ActiveFriendContainer = ({
  name,
  imagePath,
}: ActiveFriendContainerProps) => {
  return (
    <div className="activeFriendContainer">
      <img
        className="activeFriendContainer-image"
        src={imagePath === "" ? "usersPhotos/default.png" : imagePath}
        alt="Name photo"
      />
      <span className="activeFriendContainer-online"></span>
      <div className="activeFriendContainer-name">{name}</div>
    </div>
  );
};
