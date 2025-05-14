"use client";
import { useState, useEffect, useRef } from "react";

function AudioMessage({ chatLog, setChatLog }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

  useEffect(() => {
    if (!audioStream) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setAudioStream(stream);
          const mediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(mediaRecorder);
          let audio;

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audio = [event.data];
            }
          };

          mediaRecorder.onstop = () => {
            const b = new Blob(audio, { type: "audio/wav" });
            setAudioBlob(b);
            console.log(typeof b);
          };
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [audioStream]);

  const handleToggleRecording = (event) => {
    event.preventDefault();
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    setAudioBlob(null);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        if (prevTime >= RECORDING_MAX_DURATION - 1) {
          stopRecording();
          return RECORDING_MAX_DURATION;
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

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

      arr[arr.length - 1].message.push(audioBlob);
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
          message: [audioBlob],
        },
      ]);
    }

    setAudioBlob(null);
    setRecordingTime(0);
  }

  return (
    <form
      className="recorder p-[10px] rounded-b-[4px]"
      onSubmit={submitHandler}
    >
      <button
        onClick={handleToggleRecording}
        className={`bg-red-400 hover:opacity-80 text-white font-bold w-[30px] h-[30px] mr-3 rounded-full cursor-pointer`}
      >
        {isRecording ? (
          <>
            <span className={`${isRecording && "animate-pulse"}`}>⏹</span>
          </>
        ) : (
          "🎤︎︎"
        )}
      </button>
      {audioBlob ? (
        <audio controls>
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
        </audio>
      ) : (
        <div className="w-[75%]">
          <div className="relative w-full h-[39px] flex items-center rounded-sm px-[8px] bg-[#b9e1ea]">
            <div
              className={`absolute h-[39px] left-0 top-0 bg-[#004f61a6] rounded-l-sm`}
              style={{
                width: `${(recordingTime / RECORDING_MAX_DURATION) * 100}%`,
              }}
            ></div>
            <h1 className="text-3xl text-[#004f61] mx-auto">
              {isRecording ? formatTime(recordingTime) : "00:00"}
            </h1>
          </div>
        </div>
      )}
      <button type="submit" className="submit-btn">
        <i className="fa-solid fa-paper-plane fa-lg"></i>
      </button>
    </form>
  );
}

export default AudioMessage;
