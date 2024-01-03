import React from "react";
import useSWR from "swr";
import {
  useCurrentItem,
  useItemSidebarOpened,
  useSearchKeyword,
} from "@/hooks/states";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { avecURL } from "@/constants/const";

// 상태별 스타일
const statuses: { [key: string]: string } = {
  offline: "text-yellow-500 bg-yellow-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};

// 환경별 스타일
const environments: { [key: string]: string } = {
  Carry: "text-green-400 bg-green-400/10 ring-gray-400/20",
  Baggage: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
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
      <div className="text-white hidden lg:block">
        반입 물품을 입력해주세요.
      </div>
    );

  if (error) return <div className="text-white">에러</div>;

  if (!data) return <div className="text-white">로딩 중</div>;
  if (data.length === 0) {
    return <div className="text-white">검색 결과가 없습니다.</div>;
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
            className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
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

            {cur.forbidRule.map((rule: string, index: number) => (
              <div
                key={index}
                className={classNames(
                  environments[
                    rule[rule.length - 1] === "X" ? "Baggage" : "Carry"
                  ],
                  "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {rule}
              </div>
            ))}
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
