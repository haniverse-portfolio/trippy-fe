import { useChatbotOpened } from "@/hooks/states";

export default function Home() {
  const { data: chatbotOpened, setData: setChatbotOpened } = useChatbotOpened();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="text-black">홈화면 제작중</p>
    </div>
  );
}
