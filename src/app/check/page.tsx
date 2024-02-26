"use client";
import Chatbot from "@/components/chatbot/Chatbot";
import ChatbotDialog from "@/components/chatbot/ChatbotDialog";
import JourneyDialog from "@/components/chatbot/JourneyDialog";
import CheckHome from "@/components/CheckHome";
import { avecURL } from "@/constants/const";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

export default function Check() {
  return (
    <>
      <CheckHome />
      <Chatbot />
      <ChatbotDialog />
      <JourneyDialog />
    </>
  );
}
