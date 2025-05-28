export default async function robotAction(
  chatLog,
  setChatLog,
  setLoading,
  sessionId
) {
  setLoading(true);
  setTimeout(async () => {
    let timestamp = Date.now();
    timestamp = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);

    let detectAudio = chatLog[chatLog.length - 1].message.filter(
      (mes) => mes instanceof Blob
    );

    if (detectAudio.length <= 0) {
      let messageToSend = await chatLog[chatLog.length - 1].message.join(", ");
      //console.log(detectAudio.length <= 0);
      //
      //
      await fetch(
        "https://moah.app.n8n.cloud/webhook/88709e48-ff6c-4417-a555-d6f095d42382",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat: messageToSend,
            id: sessionId,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setChatLog((prevState) => [
            ...prevState,
            {
              name: "robot",
              date: timestamp.split(", ")[0],
              time: timestamp.split(", ")[1],
              message: [data.output],
            },
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const formData = new FormData();
      formData.append("audio_data", detectAudio[0], "voice-note.wav");
      formData.append("type", "audio/wav");
      formData.append("id", sessionId);

      console.log(formData);

      await fetch(
        "https://moah.app.n8n.cloud/webhook/88709e48-ff6c-4417-a555-d6f095d42382",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setChatLog((prevState) => [
            ...prevState,
            {
              name: "robot",
              date: timestamp.split(", ")[0],
              time: timestamp.split(", ")[1],
              message: [data.output],
            },
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setLoading(false);
  }, 1000);
}
