import { useChatbotOpened } from "@/hooks/states";
import Image from "next/image";

export default function Chat() {
  const { data: chatbotOpened, setData: setChatbotOpened } = useChatbotOpened();

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
        {/* sender */}
        <div className=" m-[20px]">
          <div>
            <div className="items-end grid grid-cols-[30px_auto] gap-x-[6px] h-full">
              <Image
                width={30}
                height={30}
                alt=""
                src="/logo.png"
                className="rounded-[10px]"
              />
              <div className=" bg-[#F1F1F1] h-full rounded-[15px] ">
                <p className="p-[12px]">안녕로봇</p>
              </div>
            </div>
            <p className="pl-[48px] text-[12px] text-gray-400">오후 5:32</p>
          </div>
        </div>
        {/* Receiver */}
        <div className="  m-[20px]">
          <div>
            <div className="items-end grid grid-cols-[auto_30px] gap-x-[6px] h-full">
              <div className=" bg-[#F1F1F1] h-full rounded-[15px] ">
                <p className="p-[12px]">
                  All-In-One AI 메신저, 채널톡speech_balloon 채널톡의 소중한
                  고객님 yellow_heart 채널톡 사용 꿀팁honey_pot은 아래 가이드를
                  통해 확인 가능합니다. 가이드 외에도 도움이 될 컨텐츠들을
                  준비했으니 확인해주세요 smiling_face_with_3_hearts
                </p>
              </div>
              <Image
                width={30}
                height={30}
                alt=""
                src="/user.png"
                className="rounded-[10px]"
              />
            </div>
            <div className="flex justify-end">
              <p className="pr-[48px] text-[12px] text-gray-400">오후 5:32</p>
            </div>
          </div>
        </div>
        {/* sender */}
        <div className=" m-[20px]">
          <div>
            <div className="items-end grid grid-cols-[30px_auto] gap-x-[6px] h-full">
              <Image
                width={30}
                height={30}
                alt=""
                src="/logo.png"
                className="rounded-[10px]"
              />
              <div className=" bg-[#F1F1F1] h-full rounded-[15px] ">
                <p className="p-[12px]">
                  All-In-One AI 메신저, 채널톡speech_balloon 채널톡의 소중한
                  고객님 yellow_heart 채널톡 사용 꿀팁honey_pot은 아래 가이드를
                  통해 확인 가능합니다. 가이드 외에도 도움이 될 컨텐츠들을
                  준비했으니 확인해주세요 smiling_face_with_3_hearts
                </p>
              </div>
            </div>
            <p className="pl-[48px] text-[12px] text-gray-400">오후 5:32</p>
          </div>
        </div>
        {/* Receiver */}
        <div className="  m-[20px]">
          <div>
            <div className="items-end grid grid-cols-[auto_30px] gap-x-[6px] h-full">
              <div className=" bg-[#F1F1F1] h-full rounded-[15px] ">
                <p className="p-[12px]">
                  All-In-One AI 메신저, 채널톡speech_balloon 채널톡의 소중한
                  고객님 yellow_heart 채널톡 사용 꿀팁honey_pot은 아래 가이드를
                  통해 확인 가능합니다. 가이드 외에도 도움이 될 컨텐츠들을
                  준비했으니 확인해주세요 smiling_face_with_3_hearts
                </p>
              </div>
              <Image
                width={30}
                height={30}
                alt=""
                src="/user.png"
                className="rounded-[10px]"
              />
            </div>
            <div className="flex justify-end">
              <p className="pr-[48px] text-[12px] text-gray-400">오후 5:32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// p-[14px]
