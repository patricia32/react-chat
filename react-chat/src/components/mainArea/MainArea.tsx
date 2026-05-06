import { ChatsArea } from "./chatsArea/ChatsArea";
import { EmptyState } from "./emptyState/EmptyState";
import "./MainArea.scss";

interface MainAreaProps {
  selectedField: string;
}
export const MainArea = ({ selectedField }: MainAreaProps) => {
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
