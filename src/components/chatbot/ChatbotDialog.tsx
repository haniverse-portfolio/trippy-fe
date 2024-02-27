"use strict";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  useChatContent,
  useChatList,
  useChatbotIndex,
  useChatbotOpened,
} from "@/hooks/states";
import ChatbotHome from "./Home";
import Home from "./Home";
import Chat from "./Chat";
import Setting from "./Setting";
import useSWR from "swr";

export default function ChatbotDialog() {
  const { data: chatList, setData: setChatList } = useChatList();
  const { data: chatbotOpened, setData: setChatbotOpened } = useChatbotOpened();
  const { data: chatbotIndex, setData: setChatbotIndex } = useChatbotIndex();
  const { data: chatContent, setData: setChatContent } = useChatContent();
  const [textareaLocked, setTextareaLocked] = useState(false);

  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ question: chatContent }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  const formatTime = (date: any) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${ampm} ${formattedHours}:${formattedMinutes}`;
  };
  const postMessage = () => {
    const url = "http://13.124.243.62/chatbot/";
    fetcher(url)
      .then((response) => {
        console.log("Message sent successfully:", response);
        console.log(response.message);
        const currentDate = formatTime(new Date()); // 현재 날짜와 시간을 ISO 형식으로 가져옴
        const newMessage = {
          user: "receiver",
          content: response.answer,
          date: currentDate,
        };
        setChatList((prevChatList) => [...(prevChatList || []), newMessage]); // 채팅 리스트에 새로운 메시지 추가
        setChatContent("");
        setTextareaLocked(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setTextareaLocked(false);
      });
  };

  return (
    <div className="z-50">
      <Transition.Root show={chatbotOpened} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setChatbotOpened}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className=" fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex h-full justify-end items-end text-center  ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden   text-left shadow-xl transition-all  ">
                  <div className="bg-white w-[400px] max-h-[690px]  rounded-[30px] mr-[30px] ">
                    <div className=" h-[630px]">
                      {chatbotIndex === 0 ? <Home /> : <></>}
                      {chatbotIndex === 1 ? <Chat /> : <></>}
                      {chatbotIndex === 2 ? <Setting /> : <></>}
                    </div>
                    {chatbotIndex === 1 ? (
                      <div className="grid grid-cols-[320px_auto] rounded-[20px] bg-white">
                        <textarea
                          disabled={textareaLocked}
                          // onKeyDown={(e) => {
                          //   if (chatContent.trim() === "") return;
                          //   if (e.key === "Enter") {
                          //     e.preventDefault();
                          //     e.stopPropagation();
                          //     setTimeout(postMessage, 0);
                          //   }
                          // }}
                          className="focus:ring-0 w-full resize-none border-0 mx-[10px]  mb-[10px] rounded-[20px] bg-[#F0EFF0]"
                          placeholder="메시지를 입력해주세요"
                          value={chatContent}
                          onChange={(e) => {
                            setChatContent(e.target.value);
                          }}
                        />
                        {/* 전송 */}
                        <button
                          disabled={textareaLocked || chatContent.trim() === ""}
                          onClick={() => {
                            if (chatContent.trim() === "") return;
                            setTextareaLocked(true);
                            const currentDate = formatTime(new Date()); // 현재 날짜와 시간을 ISO 형식으로 가져옴
                            const newMessage = {
                              user: "sender",
                              content: chatContent,
                              date: currentDate,
                            };
                            setChatList((prevChatList) => [
                              ...(prevChatList || []),
                              newMessage,
                            ]); // 채팅 리스트에 새로운 메시지 추가
                            postMessage(); // 메시지 전송
                          }}
                          className="flex items-center justify-center cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke={
                              textareaLocked || chatContent.trim() === ""
                                ? "#C6CAD1"
                                : "#F77F2F"
                            }
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="h-[60px] bg-orange-300 rounded-b-[30px] ">
                        <div className="grid grid-cols-3 ">
                          <div
                            onClick={() => {
                              setChatbotIndex(0);
                            }}
                            className="flex items-center justify-center"
                          >
                            홈
                          </div>
                          <div
                            onClick={() => {
                              setChatbotIndex(1);
                            }}
                            className="flex items-center justify-center"
                          >
                            대화
                          </div>
                          <div
                            onClick={() => {
                              setChatbotIndex(2);
                            }}
                            className="flex items-center justify-center"
                          >
                            설정
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-[120px]">
                    <button
                      onClick={() => setChatbotOpened(false)}
                      className="cursor-pointer bg-[#F77F2F] z-50 flex h-16 w-16 items-center justify-center rounded-full  text-white shadow-lg fixed right-[30px] bottom-[30px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
