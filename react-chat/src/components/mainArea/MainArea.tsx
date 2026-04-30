import "./MainArea.scss";

interface MainAreaProps {
  selectedField: string;
}
export const MainArea = ({ selectedField }: MainAreaProps) => {
  const EmptyState = () => (
    <>
      <img className="area-icon" src="areaIcon.png" alt="No messages icon" />
      <div className="area-title">Welcome to your messages!</div>
      <div className="area-text">
        Select a chat or start a new conversation to see your messages here
      </div>
    </>
  );

  const contentSwitch = () => {
    switch (selectedField) {
      case "":
        return <EmptyState />;
    }
  };

  return <div className="area">{contentSwitch()}</div>;
};
