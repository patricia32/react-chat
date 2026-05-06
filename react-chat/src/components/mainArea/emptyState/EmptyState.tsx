import "./EmptyState.scss";
export const EmptyState = () => (
  <div className="emptyState">
    <img
      className="emptyState-icon"
      src="areaIcon.png"
      alt="No messages icon"
    />
    <div className="emptyState-title">Welcome to your messages!</div>
    <div className="emptyState-text">
      Select a chat or start a new conversation to see your messages here
    </div>
  </div>
);
