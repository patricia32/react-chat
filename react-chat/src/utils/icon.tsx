import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./icon.scss";

interface IconProps {
  icon: IconDefinition;
}
export const Icon = ({ icon }: IconProps) => {
  return (
    <div className="icon">
      <FontAwesomeIcon icon={icon} className="icon-item" />
    </div>
  );
};
