import { ChevronRightIcon } from "@heroicons/react/20/solid";

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
      {[0, 0, 0, 0, 0, 0, 0].map(() => listExample())}
    </ul>
  );
}
