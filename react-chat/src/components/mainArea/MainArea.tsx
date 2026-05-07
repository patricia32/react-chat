import { ChatsArea } from "./chatsArea/ChatsArea";
import { ChatWindow } from "./chatsArea/chatWindow/ChatWindow";
import { EmptyState } from "./emptyState/EmptyState";
import "./MainArea.scss";

interface MainAreaProps {
  selectedField: string;
  setSelectedField: (value: string) => void;
}
export const MainArea = ({
  selectedField,
  setSelectedField,
}: MainAreaProps) => {
  const contentSwitch = () => {
    switch (true) {
      case selectedField === "Chats":
        return <ChatsArea setSelectedField={setSelectedField} />;
      case /^chat\/:[^:]+$/.test(selectedField): {
        const chatId: string = selectedField.split("/:")[1] ?? "";

        if (chatId)
          return (
            <ChatWindow chatId={chatId} setSelectedField={setSelectedField} />
          );
        return;
      }
      default:
        return <EmptyState />;
    }
  };

  return <div className="area">{contentSwitch()}</div>;
};
