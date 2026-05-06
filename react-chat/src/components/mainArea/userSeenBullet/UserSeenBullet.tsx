import "./UserSeenBullet.scss";

interface UserSeenBulletProps {
  userId: string;
}
export const UserSeenBullet = ({ userId }: UserSeenBulletProps) => {
  return (
    <div className="userSeenBullet">
      <img
        className="userSeenBullet-image"
        src={`usersPhotos/${userId}.png`}
        onError={(e) => {
          e.currentTarget.src = "/usersPhotos/default.png";
        }}
        alt="User photo"
      />
    </div>
  );
};
