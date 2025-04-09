import React from "react";
import robot from "../assets/robot-waving-2.jpg";

function Header({ language, setLanguage }) {
  return (
    <header>
      <div className="title-flex">
        <img src={robot} className="robot" alt="robot waving profile pic" />
        <h4>{language === "EN" ? "AI bot Steve" : "الذكاء الإصطناعي سيف"}</h4>
      </div>

      <button
        className="lang"
        onClick={() => setLanguage(language === "EN" ? "AR" : "EN")}
      >
        {language}
      </button>
    </header>
  );
}

export default Header;
