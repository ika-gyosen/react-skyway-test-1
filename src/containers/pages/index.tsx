import React, { useEffect, useState } from "react";
import Peer from "skyway-js";

// const peer = new Peer({ key: "7f6811d4-2b08-4bd7-8be8-cd036923e473" });

function ChatApp() {
  const [peerId, setPeerId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setuserName] = useState("");
  const [roomName, setroomName] = useState("new room");
  const [roomName2, setroomName2] = useState("new room");
  const [message, setMessage] = useState<string[]>([]);
  // console.log(peer);
  useEffect(() => {
    const peer = new Peer({ key: "7f6811d4-2b08-4bd7-8be8-cd036923e473" });
    peer.on("open", () => {
      console.log("id", peer.id);
      setPeerId(peer.id);
      setIsOpen(peer.open);

      if (roomName2.length > 0) {
        const room = peer.joinRoom(roomName2, { mode: "mesh" });
        room.on(
          "data",
          ({
            data,
            src,
          }: {
            data: { user: string; text: string };
            src: string;
          }) => {
            console.log("test", data, message);
            const newArray = [...message, data.text];
            setMessage(newArray);
            console.log("zzzzzzzzzz", message);
          }
        );
      }
    });
  }, [message, roomName2]);

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(e.target.value);
  };

  const roomNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setroomName(e.target.value);
  };

  const joinHandler = () => {
    // const roomHandler = (room: any) => {
    //   room.on(
    //     "data",
    //     ({
    //       data,
    //       src,
    //     }: {
    //       data: { user: string; text: string };
    //       src: string;
    //     }) => {
    //       console.log("test", data, message);
    //       setMessage([...message, data.text]);
    //       console.log("zzzzzzzzzz", message);
    //     }
    //   );
    // };
    // const roomItem = peer.joinRoom(roomName, { mode: "mesh" });
    // roomHandler(roomItem);
    setroomName2(roomName);
  };

  return (
    <div>
      {isOpen ? `Chat app id:${peerId}` : "chatroom error"}
      <div>
        <label>
          user name
          <input
            type="text"
            onChange={(e) => {
              userNameHandler(e);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          room name
          <input
            type="text"
            onChange={(e) => {
              roomNameHandler(e);
            }}
          />
        </label>
      </div>
      <button
        onClick={() => {
          joinHandler();
        }}
      >
        join
      </button>
      <div>
        {message.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default ChatApp;
