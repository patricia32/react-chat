import "./infoArea.scss";

interface InfoAreaProps {
  imagePath: string;
  title: string;
  content: string;
}
export const InfoArea = ({ imagePath, title, content }: InfoAreaProps) => (
  <div className="infoArea">
    <img className="infoArea-icon" src={imagePath} alt="No messages icon" />
    <div className="infoArea-title">{title}</div>
    <div className="infoArea-text">{content}</div>
  </div>
);
