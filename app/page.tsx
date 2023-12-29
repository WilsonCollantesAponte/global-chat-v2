"use client";
import { io } from "socket.io-client";
import { FormEvent, useEffect, useState } from "react";

interface message {
  body: string;
  from: string;
}

const socket = io("https://global-chat-uxv7.onrender.com/");

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<message>>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMessage: message = {
      body: message,
      from: "Me",
    };

    setMessage("");

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  }

  useEffect(() => {
    socket.on("message", recivedMessage);

    return () => {
      socket.off("message", recivedMessage);
    };
  }, []);

  function recivedMessage(message: message) {
    setMessages((state) => [...state, message]);
  }

  return (
    <div className="bg-zinc-700 flex flex-col h-screen py-1.5 px-2.5">
      <div className=" text-white overflow-auto">
        {messages.map((message, index) => (
          <div
            className={` w-2/3 rounded-xl mt-1.5
          ${message.from === "Me" ? " bg-blue-600 ml-auto" : "bg-black/70"}
          `}
            key={index}
          >
            <span className="py-1 px-2 relative break-all flex flex-col">
              <span className=" font-extrabold italic">{message.from}</span>
              <span className=" ml-auto text-sm">{message.body}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex-grow flex mt-3">
        <form className=" w-full flex self-end" onSubmit={handleSubmit}>
          <input
            value={message}
            className="rounded-md w-full"
            type="text"
            placeholder="To send here..."
            onChange={(event) => setMessage(event.target.value)}
          />
          <button className=" text-white px-1.5">Send</button>
          <img className=" h-12" src="/MatiMati_crop.jpg" alt="" />
        </form>
      </div>

      <div className=" mt-2 flex flex-col justify-center items-center">
        <div className=" text-4xl text-white italic my-3.5">
          Wilson's global chat
        </div>
        {/* <img className=" w-1/3 rounded-full" src="/MatiMati_crop.jpg" alt="" /> */}
      </div>
    </div>
  );
}
