interface ChatWindowProps {
  chatId: string;
}
export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  return <div>chat {chatId}</div>;
};
