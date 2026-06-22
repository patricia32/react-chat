import { useAppStore } from "../../store/appStore";
import { ChatsArea } from "./chatsArea/ChatsArea";
import { ChatWindow } from "./chatsArea/chatWindow/ChatWindow";
import { InfoArea } from "./infoArea/InfoArea";
import "./MainArea.scss";

export const MainArea = () => {
  const selectedField = useAppStore((state) => state.selectedField);

  const contentSwitch = () => {
    switch (true) {
      case selectedField === "Chats":
        return <ChatsArea />;
      case /^chat\/:[^:]+$/.test(selectedField): {
        const chat_id: string = selectedField.split("/:")[1] ?? "";

        if (chat_id) return <ChatWindow chat_id={chat_id} />;
        return;
      }
      default:
        return (
          <InfoArea
            imagePath="areaIcon.png"
            title="Welcome to your messages!"
            content=" Select a chat or start a new conversation to see your messages here"
          />
        );
    }
  };

  return <div className="area">{contentSwitch()}</div>;
};
