import React from "react";
import useSWR from "swr";
import {
  useCurrentItem,
  useItemSidebarOpened,
  useSearchKeyword,
} from "@/hooks/states";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { avecURL } from "@/constants/const";
import { LoaderList } from "./LoaderList";

// 상태별 스타일
const statuses: { [key: string]: string } = {
  offline: "text-yellow-500 bg-yellow-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};

// 환경별 스타일
const environments: { [key: string]: string } = {
  Yes: "text-green-400 bg-green-400/10 ring-gray-400/20",
  No: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
  Special: "text-violet-400 bg-violet-400/10 ring-violet-400/30",
  Approve: "text-orange-400 bg-orange-400/10 ring-orange-400/30",
};

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
function filterRules(rules: string[]): string[] {
  const priorityRules = rules.filter(
    (rule) => rule.includes("O") || rule.includes("X")
  );
  const otherRules = rules.filter((rule) => !priorityRules.includes(rule));

  return [...priorityRules, ...otherRules].slice(0, 2);
}
export function ForbidList() {
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();
  const { data: currentItem, setData: setCurrentItem } = useCurrentItem();
  const { data, error } = useSWR(avecURL + searchKeyword, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();

  if (searchKeyword === "")
    return (
      <div
        style={{ height: "calc(100vh - 9rem)" }}
        className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <p className="text-gray-300 text-center">반입 물품을 입력해주세요.</p>
      </div>
    );

  if (error)
    return (
      <div
        style={{ height: "calc(100vh - 9rem)" }}
        className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
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
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>

        <p className="text-gray-300 text-center">
          잘못된 결과를 받았습니다. 다시 시도해주세요.
        </p>
      </div>
    );

  if (!data) return <LoaderList />;
  if (data.length === 0) {
    return (
      <div
        style={{ height: "calc(100vh - 9rem)" }}
        className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
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
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>

        <p className="text-gray-300 text-center">검색 결과가 없습니다.</p>
      </div>
    );
  }
  return (
    <ul role="list" className="divide-y divide-white/5">
      {data.map((cur: any) => {
        // "X"의 개수에 따라 상태 설정
        const xCount = cur.forbidRule.reduce((count: number, rule: string) => {
          return rule.endsWith("X") ? count + 1 : count;
        }, 0);

        let statusKey: string;
        if (xCount === 0) {
          statusKey = "online";
        } else if (xCount === 1) {
          statusKey = "offline";
        } else {
          statusKey = "error";
        }

        return (
          <li
            onClick={() => {
              setItemSidebarOpened(true);
              setCurrentItem(cur);
            }}
            key={cur.id}
            className="cursor-pointer hover:bg-gray-800 relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div
                  className={classNames(
                    statuses[statusKey], // 동적 상태 적용
                    "flex-none rounded-full p-1"
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <div className="flex flex-auto min-w-0">
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-white flex-auto overflow-hidden">
                    <a href={"#"} className="flex gap-x-2 items-center">
                      <span className="truncate">{cur.korName}</span>
                    </a>
                  </h2>
                </div>
              </div>
            </div>

            {filterRules(cur.forbidRule).map((rule: string, index: number) => {
              const lastChar = rule[rule.length - 1];
              let classNameKey =
                lastChar === "O"
                  ? "Yes"
                  : lastChar === "X"
                  ? "No"
                  : rule === "특별조항"
                  ? "Special"
                  : "Approve";

              return (
                <div
                  key={index}
                  className={classNames(
                    environments[classNameKey],
                    "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {rule}
                </div>
              );
            })}

            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </li>
        );
      })}
    </ul>
  );
}
