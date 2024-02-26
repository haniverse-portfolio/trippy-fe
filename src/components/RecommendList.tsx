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
  clothes: "text-blue-500 bg-blue-100/10 ring-blue-500/20",
  cosmetics: "text-yellow-500 bg-yellow-100/10 ring-yellow-500/20",
  toiletries: "text-green-400 bg-green-400/10 ring-gray-400/20",
  necessity: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
  medicine: "text-violet-400 bg-violet-400/10 ring-violet-400/30",
  edible: "text-orange-400 bg-orange-400/10 ring-orange-400/30",
  electronics: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};

const converter: Record<string, string> = {
  necessity: "필수품",
  medicine: "의약품",
  edible: "식품",
  toiletries: "세면용품",
  clothes: "의류",
  cosmetics: "화장품",
  electronics: "전자기기",
};

const fetcher = (url: string) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nationName: "korea" }),
  };

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export function RecommendList() {
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();
  const { data: currentItem, setData: setCurrentItem } = useCurrentItem();

  // const { data, error } = useSWR(
  //   `http://13.124.243.62`,
  //   () => fetcher(`http://13.124.243.62`),
  //   {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: true,
  //     revalidateOnReconnect: true,
  //   }
  // );
  const data = [
    { name: "여권", tag: ["necessity"] },
    { name: "지갑", tag: ["necessity"] },
    { name: "비행기표", tag: ["necessity"] },
    { name: "휴대전화", tag: ["necessity"] },

    { name: "스킨/로션", tag: ["cosmetics"] },
    { name: "충전기", tag: ["necessity"] },
    { name: "칫솔/치약", tag: ["toiletries"] },
    { name: "면도기", tag: ["toiletries"] },
    { name: "속옷", tag: ["clothes"] },
    { name: "캐리어", tag: ["necessity"] },
    { name: "선글라스", tag: ["clothes"] },
    { name: "패딩", tag: ["clothes"] },
    { name: "폼클렌징", tag: ["toiletries"] },
    { name: "선크림", tag: ["cosmetics"] },
    { name: "무선이어폰", tag: ["electronics"] },
    { name: "컵라면", tag: ["edible"] },
    { name: "감기약", tag: ["medicine"] },
    { name: "양말", tag: ["clothes"] },
    { name: "물티슈", tag: ["cosmetics"] },
    { name: "샴푸", tag: ["toiletries"] },
    { name: "연고", tag: ["medicine"] },
    { name: "반창고", tag: ["medicine"] },
  ];

  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();

  return (
    <ul role="list" className="divide-y divide-white/5">
      {data.map((cur: any, _i: number) => {
        return (
          <li
            onClick={() => {
              // setItemSidebarOpened(true);
              // setCurrentItem(cur);
            }}
            key={_i}
            className="cursor-pointer hover:bg-gray-800 relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <p className="text-white">{_i + 1}</p>
                <div className="flex flex-auto min-w-0">
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-white flex-auto overflow-hidden">
                    <a href={"#"} className="flex gap-x-2 items-center">
                      <span className="truncate">{cur.name}</span>
                    </a>
                  </h2>
                </div>
              </div>
            </div>

            {cur.tag.map((tag: string, index: number) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    environments[tag],
                    "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {converter[tag]}
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
