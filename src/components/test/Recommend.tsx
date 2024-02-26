"use client";
import { useChatbotOpened } from "@/hooks/states";
import { useState } from "react";

export default function Recommend() {
  const [nation, setNation] = useState("");
  const [item, setItem] = useState("");
  const [forbidList, setForbidList] = useState([]);

  const fetcher = (url: string) =>
    fetch(url + nation + "/" + item, {
      method: "GET",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

  const getForbidList = () => {
    const url = "http://13.124.243.62/forbid/";

    fetcher(url)
      .then((response) => {
        console.log("Message sent successfully:", response);
        console.log(response.message);
        setForbidList(response.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div>
      <p>3</p>
      <input
        onChange={(e) => {
          setNation(e.target.value);
        }}
        placeholder="나라 입력"
      ></input>
      <input
        onChange={(e) => {
          setItem(e.target.value);
        }}
        placeholder="물품 입력"
      ></input>
      <button
        onClick={() => {
          getForbidList();
        }}
      >
        요청
      </button>
      {(forbidList || []).map((item, _i) => {
        return <div key={_i}>{item}</div>;
      })}
    </div>
  );
}
