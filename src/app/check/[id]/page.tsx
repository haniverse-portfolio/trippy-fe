"use client";
import CheckHome from "@/components/CheckHome";
import { avecURL } from "@/constants/const";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

export default function Check() {
  return <CheckHome />;
}
