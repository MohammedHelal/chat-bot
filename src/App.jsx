import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import MessageArea from "./components/MessageArea";

import robotAction from "./robotAction";
import "./App.css";

function App() {
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("EN");
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      name: "robot",
      date: 0,
      time: 0,
      message: [
        language === "EN"
          ? "Hello I'm Masaakin's AI chat bot Steve, I'm happy to answer any questions you have. How may I help you?"
          : "مرحبا بك أنا سيف، الذكاء الإصطناعي لشركة مساكن، كيف يمكنني أن أخدمك؟",
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chatLog"));

    if (chats) {
      setChatLog(chats);
    }

    function readCookie(name) {
      let key = name + "=";
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
          return cookie.substring(key.length, cookie.length);
        }
      }
      return null;
    }

    let cookieSessionId = readCookie("sessionkey");
    console.log(cookieSessionId);

    if (cookieSessionId) {
      setSessionId(cookieSessionId);
    } else {
      let uuid = uuidv4();
      console.log("new uuid: " + uuid);

      function createCookie(key, value, date) {
        const expiration = new Date(date).toUTCString();
        console.log(expiration);

        const cookie = key + "=" + value + ";expires=" + expiration + ";";
        document.cookie = cookie;
      }

      let date = new Date();
      let newDate = new Date(date.setMonth(date.getMonth() + 6));

      createCookie("sessionkey", uuid, newDate);
    }
  }, []);

  useEffect(() => {
    if (chatLog.length <= 1) {
      setChatLog([
        {
          name: "robot",
          date: 0,
          time: 0,
          message: [
            language === "EN"
              ? "Hello I'm Masaakin's AI chat bot Steve, I'm happy to answer any questions you have. How may I help you?"
              : "مرحبا أنا سيف، الذكاء الإصطناعي لشركة مساكن، كيف يمكنني أن أخدمك؟",
          ],
        },
      ]);
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem("chatLog", JSON.stringify(chatLog));

    if (chatLog.length > 0 && chatLog[chatLog.length - 1].name === "user") {
      robotAction(chatLog, setChatLog, setLoading, sessionId);
    }
  }, [chatLog]);

  return (
    <div className={`main ${language === "AR" ? "arabic" : ""}`}>
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <ChatArea
          language={language}
          loading={loading}
          message={message}
          chatLog={chatLog}
        />
        <MessageArea
          language={language}
          message={message}
          setMessage={setMessage}
          chatLog={chatLog}
          setChatLog={setChatLog}
        />
      </main>
    </div>
  );
}

export default App;

/*
language === "EN"
? "Hello I'm Masaakin's AI chat bot Steve, I'm happy to answer any questions you have. How may I help you?"
: "مرحبا أنا سيف الذكاء الإصطناعي لشركة مساكن, كيف يمكنني أن أساعدك؟",
]

*/
