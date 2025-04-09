import React from "react";

function MessageArea({ language, message, setMessage, chatLog, setChatLog }) {
  function messageChangeHandler(e) {
    let value = e.target.value;
    setMessage(value);
  }

  function onEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      submitHandler(e);
    }
  }

  function submitHandler(e) {
    e.preventDefault();

    let timestamp = Date.now(); // This would be the timestamp you want to format
    timestamp = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);

    if (chatLog.length > 0 && chatLog[chatLog.length - 1].name === "user") {
      let arr = [...chatLog];

      arr[arr.length - 1].message.push(message);
      arr[arr.length - 1].date = timestamp.split(", ")[0];
      arr[arr.length - 1].time = timestamp.split(", ")[1];

      setChatLog(arr);
    } else {
      if (chatLog.length >= 10) {
        let arr = [...chatLog];
        arr.shift();
        arr.push({
          name: "user",
          date: timestamp.split(", ")[0],
          time: timestamp.split(", ")[1],
          message: message,
        });
        setChatLog(arr);
      } else {
        setChatLog((prevState) => [
          ...prevState,
          {
            name: "user",
            date: timestamp.split(", ")[0],
            time: timestamp.split(", ")[1],
            message: [message],
          },
        ]);
      }
    }

    setMessage("");
  }
  return (
    <section className="message-area">
      <form
        className={`message-form ${language === "AR" ? "arabic" : ""}`}
        onSubmit={submitHandler}
      >
        {language === "AR" && (
          <button type="submit" className="message-form-submit-btn">
            <i className="fa-solid fa-paper-plane fa-xl"></i>
          </button>
        )}
        <textarea
          id="message"
          name="message"
          rows="2"
          cols="40"
          placeholder={`${language === "EN" ? "Write a message" : "أكتب سؤال"}`}
          value={message}
          onChange={messageChangeHandler}
          onKeyDown={onEnterPress}
        ></textarea>
        {language === "EN" && (
          <button type="submit" className="message-form-submit-btn">
            <i className="fa-solid fa-paper-plane fa-xl"></i>
          </button>
        )}
      </form>
    </section>
  );
}

export default MessageArea;
