import { useChatbotOpened } from "@/hooks/states";

export default function Setting() {
  const { data: chatbotOpened, setData: setChatbotOpened } = useChatbotOpened();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="text-black">설정 화면 제작중</p>
    </div>
  );
}
