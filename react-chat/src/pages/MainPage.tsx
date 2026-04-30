import { useState } from "react";
import { MainArea } from "../components/mainArea/MainArea";
import { MainMenu } from "../components/mainMenu/MainMenu";

import "./MainPage.css";

export const MainPage = () => {
  const [selectedField, setSelectedField] = useState<string>("");

  return (
    <div className="container">
      <MainMenu
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <MainArea selectedField={selectedField} />
    </div>
  );
};
