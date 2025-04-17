import robot from "../assets/robot-waving-2.jpg";
import user from "../assets/user-profile.jpg";
import textLoading from "../assets/text-loading-animation.gif";

function ChatArea({ language, loading, chatLog }) {
  return (
    <section className="chat-area">
      {chatLog.map((chat) => {
        return (
          <div
            key={chat.time}
            className={`chat-element ${
              chat.name === "user" ? "element-user" : "element-khalifa"
            }`}
          >
            <img
              src={chat.name === "user" ? user : robot}
              className={`chat-profile ${
                chat.name === "user" ? "user-img" : "robot-img"
              }`}
              alt={`${
                chat.name === "user" ? "user profile pic" : "robot profile pic"
              } `}
            />
            <div
              className={`chat-wrapper ${
                chat.name === "user" ? "user-wrapper" : ""
              }`}
            >
              {chat.message.map((chats, index) => (
                <div
                  key={index}
                  className={`chat ${
                    chat.name === "user" ? "user" : "khalifa"
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
                  <p>{chat.name === "user" ? "User" : "Khalifa"}</p>
                )}
                <p>{chat.time === 0 ? "" : chat.time}</p>
                {language === "AR" && (
                  <p>{chat.name === "user" ? "المستخدم" : "خليفة"}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {loading && (
        <div className={`chat-element`}>
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
