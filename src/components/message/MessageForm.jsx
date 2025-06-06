import React from "react";

function MessageForm({ language, message, setMessage, chatLog, setChatLog }) {
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

    setMessage("");
  }

  return (
    <form
      className={`message-form ${
        language === "AR" ? "arabic" : ""
      } rounded-b-[4px]`}
      onSubmit={submitHandler}
    >
      {language === "AR" && (
        <button type="submit" className="submit-btn ar-btn">
          <i className="fa-solid fa-paper-plane fa-lg"></i>
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
        <button type="submit" className="submit-btn en-btn">
          <i className="fa-solid fa-paper-plane fa-lg"></i>
        </button>
      )}
    </form>
  );
}

export default MessageForm;
