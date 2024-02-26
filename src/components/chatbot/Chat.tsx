import { useChatList, useChatbotOpened } from "@/hooks/states";
import Image from "next/image";

export default function Chat() {
  const { data: chatbotOpened, setData: setChatbotOpened } = useChatbotOpened();
  const { data: chatList, setData: setChatList } = useChatList();

  return (
    <div className=" h-[630px] rounded-t-[30px] overflow-scroll">
      <div className=" bg-white  ">
        <div className="flex items-center justify-center h-[60px] bg-white   sticky top-0">
          <div className="grid grid-cols-[60px_auto_60px] m-[10px] w-full h-[40px]">
            <div
              onClick={() => {
                setChatbotOpened(false);
              }}
              className="flex items-center justify-center w-[60px] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#F77F2F"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            <div className="">
              <div className="grid grid-cols-[36px_auto] gap-x-[2px]">
                <div className="flex justify-center items-center">
                  <Image width={30} height={30} alt="" src="/logo.png" />
                </div>
                <div>
                  <div className="text-[16px] font-bold ">트리피</div>
                  <div className="text-[12px] text-gray-400">
                    오전 10:00부터 운영해요
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-[60px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#F77F2F"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </div>
          </div>
        </div>
        {chatList.map((chat, index) => (
          <div key={index} className=" m-[20px]">
            <div>
              <div
                className={`items-end grid ${
                  chat.user === "sender"
                    ? "grid-cols-[auto_30px]"
                    : "grid-cols-[30px_auto]"
                } gap-x-[6px] h-full`}
              >
                <div
                  className={`${
                    chat.user === "sender" ? "block" : "hidden"
                  } bg-[#F1F1F1] h-full rounded-[15px] `}
                >
                  <p className="p-[12px]">{chat.content}</p>
                </div>
                <Image
                  width={30}
                  height={30}
                  alt=""
                  src={chat.user === "sender" ? "/user.png" : "/logo.png"}
                  className="rounded-[10px]"
                />
                <div
                  className={`${
                    chat.user === "sender" ? "hidden" : "block"
                  } bg-[#F1F1F1] h-full rounded-[15px] `}
                >
                  <p className="p-[12px]">{chat.content}</p>
                </div>
              </div>
              <div
                className={`flex items-center ${
                  chat.user === "sender" ? " justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`${
                    chat.user === "sender" ? " pr-[48px]" : "pl-[48px]"
                  } text-[12px] text-gray-400`}
                >
                  {chat.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// p-[14px]
