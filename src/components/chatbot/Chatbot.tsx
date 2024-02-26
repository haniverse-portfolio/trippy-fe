import { useChatbotOpened } from "@/hooks/states";

export default function Chatbot() {
  const { data: chatbotOpened, setData: setChatbotOpened } = useChatbotOpened();

  return (
    <div>
      <button
        onClick={() => {
          setChatbotOpened(true);
        }}
        className="cursor-pointer bg-[#F77F2F] z-50 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg fixed right-[30px] bottom-[30px]"
      >
        {/* 여기에 챗봇 아이콘 또는 텍스트를 넣을 수 있습니다. */}
        {/* 예: 아이콘 사용 예시 */}

        <svg
          width="36px"
          height="36px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5V20.7929C3 21.2383 3.53857 21.4614 3.85355 21.1464L7.70711 17.2929C7.89464 17.1054 8.149 17 8.41421 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 12C14.2005 12.6224 13.1502 13 12 13C10.8498 13 9.79952 12.6224 9 12"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 8.01953V8"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 8.01953V8"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        {/* 아이콘 대신 텍스트를 사용하려면 svg 대신 텍스트 요소를 넣으세요. */}
      </button>
    </div>
  );
}
