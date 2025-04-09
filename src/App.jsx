import { useState, useEffect } from "react";

import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import MessageArea from "./components/MessageArea";

import robotAction from "./robotAction";
import "./App.css";

function App() {
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
          : "مرحبا أنا سيف، الذكاء الإصطناعي لشركة مساكن، كيف يمكنني أن أخدمك؟",
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chatLog"));

    if (chats) {
      setChatLog(chats);
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
      robotAction(chatLog, setChatLog, setLoading);
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
