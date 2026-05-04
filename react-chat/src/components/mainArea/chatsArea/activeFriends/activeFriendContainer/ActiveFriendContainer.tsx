import "./ActiveFriendContainer.scss";

interface ActiveFriendContainerProps {
  id: string;
  name: string;
}
export const ActiveFriendContainer = ({
  id,
  name,
}: ActiveFriendContainerProps) => {
  return (
    <div className="activeFriendContainer">
      <div className="activeFriendContainer__container">
        <img
          className="activeFriendContainer__container-image"
          src={`usersPhotos/${id}.png`}
          onError={(e) => {
            e.currentTarget.src = "/usersPhotos/default.png";
          }}
          alt="Name photo"
        />
      </div>

      <span className="activeFriendContainer-online"></span>
      <div className="activeFriendContainer-name">{name}</div>
    </div>
  );
};
