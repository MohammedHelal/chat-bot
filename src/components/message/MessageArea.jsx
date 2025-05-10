import { useState } from "react";
import MessageForm from "./MessageForm";
import AudioMessage from "./AudioMessage";

function MessageArea({ language, message, setMessage, chatLog, setChatLog }) {
  const [inputType, setInputType] = useState("text");
  return (
    <section className="message-area">
      <div className="flex ml-[10px]">
        <button
          className={`py-1 w-[35px] rounded-t-sm ${
            inputType === "text" ? "bg-[#004f61]" : "text-[#004f61]"
          } cursor-pointer`}
          onClick={() => {
            if (inputType !== "text") setInputType("text");
          }}
        >
          𓂃🖊
        </button>
        <button
          className={`py-1 w-[35px] rounded-t-sm ${
            inputType === "audio" ? "bg-[#004f61]" : "text-[#004f61]"
          } cursor-pointer`}
          onClick={() => {
            if (inputType !== "audio") setInputType("audio");
          }}
        >
          🎤︎
        </button>
      </div>
      {inputType === "text" ? (
        <MessageForm
          language={language}
          message={message}
          setMessage={setMessage}
          chatLog={chatLog}
          setChatLog={setChatLog}
        />
      ) : (
        <AudioMessage chatLog={chatLog} setChatLog={setChatLog} />
      )}
    </section>
  );
}

export default MessageArea;
