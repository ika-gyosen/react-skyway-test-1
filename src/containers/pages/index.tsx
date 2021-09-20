import Chat from "components/Chat";
import RoomName from "components/RoomName";
import SendMessage from "components/SendMessage";
import Status from "components/Status";
import UserName from "components/UserName";
import React, { useEffect, useRef, useState } from "react";
import Peer from "skyway-js";
  
function ChatApp() {
  const [peerId, setPeerId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setuserName] = useState("");
  const [roomName, setroomName] = useState("new room");
  const [sendMessage,setSendMessage] = useState("");
  const [message, setMessage] = useState<string[]>([]);

  const usePeer = () => {
    const peerRef = useRef<Peer>()
    return peerRef.current = new Peer({ key: "7f6811d4-2b08-4bd7-8be8-cd036923e473" });
  }
    const peer = usePeer();
    const room = useRef<MeshRoom>()

  // console.log(peer);
  useEffect(() => {
    peer.on("open", () => {
      console.log("id", peer.id);
      setPeerId(peer.id);
      setIsOpen(peer.open);
    });
  }, []);

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(e.target.value);
  };

  const roomNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setroomName(e.target.value);
  };

  const sendMessageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSendMessage(e.target.value);
  };

  const joinHandler = () => {
    const roomHandler = () => {
      if(room.current && room.current.on){
      room.current.on(
        "data",
        ({
          data,
          src,
        }: {
          data: { user: string; text: string };
          src: string;
        }) => {
          console.log("test", data, message);
          setMessage((prev) => [...prev, data.text]);
          console.log("zzzzzzzzzz", message);
        }
      );

      // 自分以外がログインした。
      room.current.on("peerJoin", (newUserId:string)=>{
        console.log("peerJoin id: ",newUserId)
      })

      // 別のユーザーが退室した。
      room.current.on("peerLeave", (leaveUserId:string)=>{
        console.log("peerLeave id: ",leaveUserId)

      })
    }
    };
    room.current = peer.joinRoom<any>(roomName, { mode: "mesh" });

  };

  const sendHandler = () =>{
    console.log("test room",room)
    if(room.current && room.current.send){
      console.log("送信中",sendMessage)
      room.current.send({user:peerId,text:sendMessage})
    }
  }
  
  return (
    <div>
      <Status peerId={peerId}/>
      <UserName >
      <input
            type="text"
            onChange={(e) => {
              userNameHandler(e);
            }}
          />
      </UserName>

  <div>
    <RoomName>
      <input
            type="text"
            onChange={(e) => {
              roomNameHandler(e);
            }}
          />
    </RoomName>
    <button onClick={() => {
          joinHandler();
    }}>
      join
    </button>  
    <button>leave</button>
  </div>
  <Chat data= {message}/>
      <div>
        {message.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <SendMessage>
    <textarea
    onChange={(e) => {
              sendMessageHandler(e);
            }} />
  </SendMessage>
  <button onClick={() => {
    console.log("押したよ")
          sendHandler();
    }}>send</button>
    </div>
  );

}

export default ChatApp; 
