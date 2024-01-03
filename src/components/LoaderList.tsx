import { ChevronRightIcon } from "@heroicons/react/20/solid";

function CurrentItem() {
  return (
    <div className="flex items-center justify-between">
      {/* Long rectangle placeholder */}
      {/* <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div> */}
      {/* Short rectangle placeholder */}
      <div className="w-4 h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      {/* Circle placeholder */}

      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      <ChevronRightIcon
        className="h-5 w-5 flex-none text-gray-300"
        aria-hidden="true"
      />
    </div>
  );
}

function listExample() {
  return (
    <li className="animate-pulse relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-w-0 flex-auto">
        <div className="flex items-center gap-x-3">
          <div className="bg-gray-300 flex-none rounded-full p-1"></div>
          <div className=" flex flex-auto min-w-0">
            <h2 className=" min-w-0 text-sm font-semibold leading-6 text-gray-300 flex-auto overflow-hidden">
              <a href={"#"} className=" flex gap-x-2 items-center">
                <span className="rounded-full bg-gray-300 truncate">
                  휴대용 라이터
                </span>
              </a>
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 text-gray-300 rounded-full flex-none py-1 px-2 text-xs font-medium">
        기내휴대 X
      </div>
      <div className="bg-gray-300 text-gray-300 rounded-full flex-none py-1 px-2 text-xs font-medium">
        위탁수하물 X
      </div>
      <ChevronRightIcon
        className="h-5 w-5 flex-none text-gray-300 "
        aria-hidden="true"
      />
    </li>
  );
}

export function LoaderList() {
  return (
    <ul role="list" className="divide-y divide-white/5">
      {[0, 0, 0, 0, 0].map(() => listExample())}
    </ul>
  );
}

{
  /* <div
        role="status"
        className="max-w-md p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
      >
        <CurrentItem />

        <span className="sr-only">로딩 중...</span>
      </div> */
}
