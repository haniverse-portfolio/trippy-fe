"use client";
import { useChatbotOpened } from "@/hooks/states";
import { use, useState } from "react";

export default function Chat() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  return (
    <div>
      <p>5</p>
      {(chatList || []).map((item, _i) => {
        return <div key={_i}>{item}</div>;
      })}
      <textarea
        onChange={(e) => {
          setChat(e.target.value);
        }}
        placeholder="내용을 입력하세요"
      ></textarea>

      <button
        className="w-16 h-16 bg-green-300"
        onClick={() => {
          // getForbidList();
        }}
      >
        요청
      </button>
    </div>
  );
}
