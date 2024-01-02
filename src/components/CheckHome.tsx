import { Fragment, useRef, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { ServerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  CameraIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import { activityItems, teams, uploadURL } from "@/constants/const";
import useSWR from "swr";
import { ForbidList } from "./ForbidList";
import {
  useCameraOpened,
  useCameraStarted,
  useCapturedImage,
  useCheckSidebarOpened,
  useMediaStream,
  useSearchKeyword,
} from "@/hooks/states";

const statuses: { [key: string]: string } = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};
const environments: { [key: string]: string } = {
  Carry: "text-green-400 bg-green-400/10 ring-gray-400/20",
  Baggage: "text-rose-400 bg-rose-400/10 ring-rose-400/30",
};
const navigation = [
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "물품 확인", href: "#", icon: ServerIcon, current: true },
  // { name: "Activity", href: "#", icon: SignalIcon, current: false },
  // { name: "Domains", href: "#", icon: GlobeAltIcon, current: false },
  // { name: "Usage", href: "#", icon: ChartBarSquareIcon, current: false },
  // { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CheckHome() {
  const { data: sidebarOpen, setData: setSidebarOpen } =
    useCheckSidebarOpened();
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();
  const { data: isCameraOpened, setData: setCameraOpened } = useCameraOpened();

  const { data: mediaStream, setData: setMediaStream } = useMediaStream();
  const { data: capturedImage, setData: setCapturedImage } = useCapturedImage();
  const { data: isCameraStarted, setData: setIsCameraStarted } =
    useCameraStarted();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setMediaStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise<void>((resolve) => {
          videoRef.current!.onloadedmetadata = () => resolve();
        });
      }

      setIsCameraStarted(true);
    } catch (error) {
      console.error("카메라 액세스 실패:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && isCameraStarted) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const capturedImageDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(capturedImageDataUrl);
        // 카메라 스트림 종료
        if (mediaStream !== null && mediaStream !== undefined)
          mediaStream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleButtonClick = async () => {
    capturePhoto();
    await setIsCameraStarted(false);
  };

  const fetcher = async (args: [string, string]): Promise<any> => {
    const [url, capturedImage] = args;
    if (!capturedImage) return null;

    // Base64 이미지 데이터를 Blob으로 변환
    const response = await fetch(capturedImage);
    const blob = await response.blob();
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("file", file);

    // POST 요청을 URL로 보냄
    const fetchResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!fetchResponse.ok) {
      throw new Error("Network response was not ok");
    }
    return fetchResponse.json();
  };

  function CameraSection() {
    const { data: capturedImage } = useCapturedImage(); // capturedImage 상태
    const { data, error } = useSWR(
      capturedImage ? [uploadURL, capturedImage] : null, // 키에 capturedImage 포함
      fetcher,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

    if (error) {
      console.error("Fetch error:", error);
      return <div className="text-white">카메라 에러</div>;
    }
    if (!data) {
      return <div className="text-white">AI 서버 분석 중</div>;
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
                    <span className="truncate">{cur.korName}</span>
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

  return (
    <html className="h-full bg-gray-900">
      {/* <CameraDrawer /> */}
      <body className="h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            여행 목록
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-800"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <span className="sr-only">프로필</span>
                            <span aria-hidden="true">임준현</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    여행 목록
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">프로필</span>
                    <span aria-hidden="true">임준현</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  {/* <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  /> */}
                  <input type="text" className="hidden" />
                  <input
                    value={searchKeyword}
                    onChange={(e) => {
                      if (e.currentTarget.value !== "") setCameraOpened(false);
                      setSearchKeyword(e.currentTarget.value);
                    }}
                    // onKeyUp={(e) => {
                    //   if (e.key === "Enter") {
                    //     e.preventDefault();
                    //     setSearchKeyword(e.currentTarget.value);
                    //   }
                    // }}
                    autoComplete="off"
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="반입 물품을 확인해보세요"
                    // type="search"
                    // name="search"
                  />
                  <CameraIcon
                    onClick={async () => {
                      await setSearchKeyword("");
                      await setCameraOpened(true);
                      await startCamera();
                      await startCamera();
                    }}
                    className="cursor-pointer absolute inset-y-0 right-10 h-full w-5 text-gray-500"
                    // pointer-events-none
                    aria-hidden="true"
                  />
                  <PhotoIcon
                    onClick={() => {
                      alert("사진 불러오기");
                    }}
                    className="cursor-pointer absolute inset-y-0 right-0 h-full w-5 text-gray-500"
                    // pointer-events-none
                    aria-hidden="true"
                  />
                </div>
              </form>
            </div>
          </div>

          <main className="lg:pr-96">
            {isCameraOpened === true && searchKeyword === "" ? (
              isCameraStarted === true ? (
                <div
                  className="bg-black relative"
                  style={{ height: "calc(100vh - 4rem)" }}
                >
                  <div className="flex h-full items-center justify-center">
                    <video
                      className="w-full max-h-full object-contain"
                      ref={videoRef}
                      autoPlay
                      playsInline
                    />
                  </div>

                  <button
                    className="cursor-pointer absolute bottom-20 w-24 h-24 bg-white rounded-full mx-auto border-double border-2 border-gray-300 left-1/2 transform -translate-x-1/2"
                    onClick={handleButtonClick}
                  >
                    <CameraIcon
                      className="cursor-pointer w-10 m-auto text-gray-400"
                      // pointer-events-none
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : (
                <CameraSection />
              )
            ) : (
              <div>
                <div
                  className={`${searchKeyword === "" ? "lg:block hidden" : ""}`}
                >
                  <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base font-semibold leading-7 text-white">
                      반입 물품 확인
                    </h1>

                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                        정렬 기준
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                이름
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                날짜순
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                위험도
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </header>
                </div>
                <ForbidList />
              </div>
            )}
          </main>

          {/* Activity feed */}
          <aside className="md:block hidden bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-white">
                검색 랭킹
              </h2>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-indigo-400"
              >
                모두 보기
              </a>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {activityItems.map((item) => (
                <li
                  key={item.commit}
                  className="cursur-pointer px-4 py-4 sm:px-6 lg:px-8"
                  onClick={() => {
                    setSearchKeyword(item.user.name as any);
                    setCameraOpened(false);
                  }}
                >
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item.user.imageUrl}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-gray-800"
                    />
                    <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                      {item.user.name}
                    </h3>
                    <time
                      dateTime={item.dateTime}
                      className="flex-none text-xs text-gray-600"
                    >
                      {item.date}
                    </time>
                  </div>
                  {/* <p className="mt-3 truncate text-sm text-gray-500">
                    Pushed to{" "}
                    <span className="text-gray-400">{item.projectName}</span> (
                    <span className="font-mono text-gray-400">
                      {item.commit}
                    </span>{" "}
                    on <span className="text-gray-400">{item.branch}</span>)
                  </p> */}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </body>
    </html>
  );
}

{
  /* {capturedImage && (
        <div>
          <h2>캡처된 이미지</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )} */
}
