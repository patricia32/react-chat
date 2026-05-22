import { MainArea } from "../components/mainArea/MainArea";
import { MainMenu } from "../components/mainMenu/MainMenu";

import "./MainPage.scss";

export const MainPage = () => {
  return (
    <div className="container">
      <MainMenu />
      <MainArea />
    </div>
  );
};
