import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Icon.scss";

interface IconProps {
  icon: IconDefinition;
  onClick?: () => void;
}
export const Icon = ({ icon, onClick = () => {} }: IconProps) => {
  return (
    <button className="icon" onClick={() => onClick()}>
      <FontAwesomeIcon icon={icon} className="icon-item" />
    </button>
  );
};
