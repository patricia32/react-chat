import { ChatsArea } from "./chatsArea/ChatsArea";
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
      case /^chat:{\/[A-Za-z0-9]+$|/.test(selectedField):
        console.log(selectedField + "heh");
        return <EmptyState />;
      default:
        return <EmptyState />;
    }
  };

  return <div className="area">{contentSwitch()}</div>;
};
