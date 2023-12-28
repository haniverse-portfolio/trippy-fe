"use client";
import CheckHome from "@/components/CheckHome";
import { avecURL } from "@/constants/const";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Bars3Icon,
  CameraIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
const fetcher = (url: string) =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const statuses: { [key: string]: string } = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};
const deployments = [
  {
    id: 1,
    href: "#",
    projectName: "지포라이터",
    teamName: "라이터",
    status: "offline",
    statusText: "1분 32초 전",
    description: "Deploys from GitHub",
    environment: "Carry",
  },
  // More deployments...
];
const environments: { [key: string]: string } = {
  Carry: "text-green-400 bg-green-400/10 ring-gray-400/20",
  Baggage: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
};
export function ForbidList({ keyword }: { keyword: string }) {
  const { data, error } = useSWR(avecURL + keyword, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  // refreshInterval: 1000,
  if (keyword === "")
    return <div className="text-white">반입 물품을 입력해주세요.</div>;

  if (error) {
    console.error("Fetch error:", error);
    return <div>에러</div>;
  }
  // 로딩
  if (!data) {
    return <div className="text-white">로딩 중</div>;
  }
  console.log(data);
  return (
    <ul role="list" className="divide-y divide-white/5">
      {data.map((cur: any) => (
        <li
          key={0}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div
                className={classNames(
                  statuses["online"],
                  "flex-none rounded-full p-1"
                )}
              >
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <a href={"#"} className="flex gap-x-2">
                  <span className="truncate">{cur.name}</span>
                  <span className="text-gray-400">/</span>
                  <span className="whitespace-nowrap"></span>
                  <span className="absolute inset-0" />
                </a>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">{cur.specialRule}</p>
              {/* <svg
             viewBox="0 0 2 2"
             className="h-0.5 w-0.5 flex-none fill-gray-300"
           >
             <circle cx={1} cy={1} r={1} />
           </svg> */}
              {/* <p className="whitespace-nowrap">
             {deployment.statusText}
           </p> */}
            </div>
          </div>
          {cur.forbidRule.map((curcur: any) => (
            <div
              key={0}
              className={classNames(
                environments[
                  curcur[curcur.length - 1] === "X" ? "Baggage" : "Carry"
                ],
                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {curcur}
            </div>
          ))}
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}
