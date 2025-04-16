import robot from "../assets/robot-waving-2.jpg";
import user from "../assets/user-profile.jpg";
import textLoading from "../assets/text-loading-animation.gif";

function ChatArea({ language, loading, message, chatLog }) {
  return (
    <section className="chat-area">
      {chatLog.map((message) => {
        return (
          <div
            key={message.time}
            className={`chat-element ${
              message.name === "user" ? "element-user" : "element-khalifa"
            }`}
          >
            <img
              src={message.name === "user" ? user : robot}
              className={`chat-profile ${
                message.name === "user" ? "user-img" : "robot-img"
              }`}
              alt={`${
                message.name === "user"
                  ? "user profile pic"
                  : "robot profile pic"
              } `}
            />
            <div
              className={`chat-wrapper ${
                message.name === "user" ? "user-wrapper" : ""
              }`}
            >
              {message.message.map((chats, index) => (
                <div
                  key={index}
                  className={`chat ${
                    message.name === "user" ? "user" : "khalifa"
                  }`}
                >
                  <p>{chats}</p>
                </div>
              ))}
              <div
                className={`name-timestamp ${
                  language === "AR" ? "arabic" : ""
                }`}
              >
                {language === "EN" && (
                  <p>{message.name === "user" ? "User" : "Khalifa"}</p>
                )}
                <p>{message.time === 0 ? "" : message.time}</p>
                {language === "AR" && (
                  <p>{message.name === "user" ? "المستخدم" : "خليفة"}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {loading && (
        <div key={message.time} className={`chat-element`}>
          <img
            src={robot}
            className={`chat-profile robot-img`}
            alt={`robot profile pic`}
          />
          <div className={`chat-wrapper`}>
            <div className={`chat khalifa loading`}>
              <img src={textLoading} className="loading-gif" alt="loading..." />
            </div>
            <p className="name-timestamp">
              {language === "EN" ? " Khalifa" : "خليفة"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ChatArea;
