import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const BASE_URL = import.meta.env.BASE_URL;

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchMessages = async()=>{
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    console.log(targetUserId)
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.firstName,
        lastName: msg?.lastName,
        text: msg.text   
      }
    })
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchMessages();
  },[]);


  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });
    socket.on("messagesReceived", ({ firstName, lastName , text }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, lastName ,text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="mx-auto border m-5 h-[86vh] flex flex-col w-1/2">
      <h1 className="flex justify-center py-10 border h-0 text-2xl">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div class="chat-header">
                {`${msg.firstName} ${msg.lastName}` }
                <time class="text-xs opacity-50">12:45</time>
              </div>
              <div class="chat-bubble">{msg.text}</div>
              <div class="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className=" flex border-t border-gray-600">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="h-10 w-full bg-black"
          type="text"
        />
        <button
          onClick={sendMessage}
          className="ml-2 order-1 p-2 hover:bg-blue-400 hover:text-black border-1"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
