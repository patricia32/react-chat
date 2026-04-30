import { ChatsArea } from "./chatsArea/ChatsArea";
import "./MainArea.scss";

interface MainAreaProps {
  selectedField: string;
}
export const MainArea = ({ selectedField }: MainAreaProps) => {
  const EmptyState = () => (
    <div className="area__wrapper">
      <img
        className="area__wrapper-icon"
        src="areaIcon.png"
        alt="No messages icon"
      />
      <div className="area__wrapper-title">Welcome to your messages!</div>
      <div className="area__wrapper-text">
        Select a chat or start a new conversation to see your messages here
      </div>
    </div>
  );

  const contentSwitch = () => {
    switch (selectedField) {
      case "Chats":
        return <ChatsArea />;
      default:
        return <EmptyState />;
    }
  };

  return <div className="area">{contentSwitch()}</div>;
};
