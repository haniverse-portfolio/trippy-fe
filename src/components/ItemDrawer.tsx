import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CurrencyEuroIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { useCurrentItem, useItemSidebarOpened } from "@/hooks/states";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const environments: { [key: string]: string } = {
  Yes: "text-green-400 bg-green-400/10 ring-gray-400/20",
  No: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
  Special: "text-violet-400 bg-violet-400/10 ring-violet-400/30",
  Approve: "text-orange-400 bg-orange-400/10 ring-orange-400/30",
};
function filterRules(rules: string[]): string[] {
  const priorityRules = rules.filter(
    (rule) => rule.includes("O") || rule.includes("X")
  );
  const otherRules = rules.filter((rule) => !priorityRules.includes(rule));

  return [...priorityRules, ...otherRules].slice(0, 2);
}
export default function ItemDrawer() {
  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();
  const { data: currentItem, setData: setCurrentItem } = useCurrentItem();

  const statuses: { [key: string]: string } = {
    offline: "text-yellow-500 bg-yellow-100/10",
    online: "text-green-400 bg-green-400/10",
    error: "text-rose-400 bg-rose-400/10",
  };

  return (
    <Transition.Root show={itemSidebarOpened} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setItemSidebarOpened}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen lg:max-w-sm">
                  <div className="mt-[64px] flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl border-l border-white/5">
                    <div className="items-center justify-between border-b border-white/5  px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="text-base font-semibold leading-6 text-white"
                        >
                          상세 정보 확인
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md text-gray-400 hover:text-gray-500"
                            onClick={() => setItemSidebarOpened(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">패널 닫기</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="relative h-40 sm:h-56 overflow-x-auto flex flex-row bg-white">
                            {Array.isArray((currentItem as any).exampleImg) &&
                              (currentItem as any).exampleImg.map(
                                (imgUrl: string, index: number) => (
                                  <img
                                    key={index}
                                    className="object-contain max-h-full w-auto h-full" // 이미지가 부모의 높이에 맞춰져서 너비가 자동 조절되도록 설정
                                    src={imgUrl}
                                    alt={`이미지 ${index + 1}`}
                                  />
                                )
                              )}
                          </div>

                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                                    {(currentItem as any)?.korName ?? ""}
                                  </h3>
                                </div>
                                {/* <p className="text-sm text-gray-500">
                                  @ashleyporter
                                </p> */}
                              </div>
                              <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                <button
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  담기
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  공유하기
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div>
                            <dt
                              onClick={() => {
                                console.log((currentItem as any)?.forbidRule);
                              }}
                              className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
                            >
                              금지 규칙
                            </dt>
                            <dd className="text-sm sm:col-span-2 text-left">
                              <li className="relative flex items-center space-x-4 py-2 justify-start">
                                {Array.isArray(
                                  (currentItem as any)?.forbidRule
                                ) &&
                                  filterRules(
                                    (currentItem as any)?.forbidRule
                                  ).map((rule: string, index: number) => {
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
                              </li>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              특수 규칙
                            </dt>
                            <dd className="mt-1 text-sm text-gray-400 sm:col-span-2">
                              <p>
                                {(currentItem as any)?.specialRule === ""
                                  ? "없음"
                                  : (currentItem as any)?.specialRule ?? "없음"}
                              </p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
