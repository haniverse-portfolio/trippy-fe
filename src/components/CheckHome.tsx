"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  GiftIcon,
  ServerIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  CameraIcon,
  ChevronUpDownIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import { activityItems, banItems, uploadURL } from "@/constants/const";
import useSWR from "swr";
import { ForbidList } from "./ForbidList";
import {
  useCameraOpened,
  useCameraStarted,
  useCapturedImage,
  useCheckSidebarOpened,
  useItemSidebarOpened,
  useJourneyIndex,
  useJourneyList,
  useJourneyOpened,
  useMediaStream,
  useRankingFlag,
  useSearchKeyword,
  useSidebarIndex,
} from "@/hooks/states";
import { LoaderList } from "./LoaderList";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import Chatbot from "./chatbot/Chatbot";
import ChatbotDialog from "./chatbot/ChatbotDialog";
import ItemDrawer from "./ItemDrawer";
import { RecommendList } from "./RecommendList";
import { error } from "console";

const navigation = [
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "물품 검사", href: "#", icon: MagnifyingGlassIcon, current: true },
  { name: "물품 추천", href: "#", icon: HandThumbUpIcon, current: false },
  { name: "나의 물품", href: "#", icon: ArchiveBoxIcon, current: false },
  // { name: "Domains", href: "#", icon: GlobeAltIcon, current: false },
  // { name: "Usage", href: "#", icon: ChartBarSquareIcon, current: false },
  // { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CheckHome() {
  {
    /* common */
  }
  const [enterFlag, setEnterFlag] = useState(false);
  const { data: sidebarOpened, setData: setSidebarOpened } =
    useCheckSidebarOpened();
  {
    /* search */
  }
  const { data: searchKeyword, setData: setSearchKeyword } = useSearchKeyword();

  {
    /* camera */
  }
  const { data: isCameraOpened, setData: setCameraOpened } = useCameraOpened();
  const { data: mediaStream, setData: setMediaStream } = useMediaStream();
  const { data: isCameraStarted, setData: setIsCameraStarted } =
    useCameraStarted();
  {
    /* etc */
  }
  const { data: rankingFlag, setData: setRankingFlag } = useRankingFlag();
  const { data: itemSidebarOpened, setData: setItemSidebarOpened } =
    useItemSidebarOpened();
  const { data: sidebarIndex, setData: setSidebarIndex } = useSidebarIndex();
  {
    /* journey */
  }
  const { data: journeyList, setData: setJourneyList } = useJourneyList();
  const { data: journeyIndex, setData: setJourneyIndex } = useJourneyIndex();
  const { data: journeyOpened, setData: setJourneyOpened } = useJourneyOpened();

  const { data: capturedImage, setData: setCapturedImage } = useCapturedImage();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  //   intervalId2Ref.current = setInterval(function () {
  //     const blob = new Blob(chunks, { type: "video/webm" });
  //     scanWebSocketRef.current?.send(blob);
  //     chunks = [];
  //   }, 1000 / 5);
  // } catch (err) {
  //   console.error("Error accessing camera:", err);
  // }

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
      }
    }
  };
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null); // mediaStream 상태를 null로 설정
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
      return (
        <div
          style={{ height: "calc(100vh - 15rem)" }}
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
    }
    if (!data) {
      return (
        <div
          style={{ height: "calc(100vh - 15rem)" }}
          className="text-center text-gray-300 flex flex-col items-center justify-center gap-y-4"
        >
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-48 md:bg-gray-300 rounded sm:w-96 ">
              {/* dark:bg-gray-700 */}
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-300 text-center">이미지 인식 중...</p>
        </div>
      );
    }
    if (data.class_name === "") {
      return (
        <div
          style={{ height: "calc(100vh - 15rem)" }}
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
    // conf : 배열
    setSearchKeyword(data.class_name);
    return <></>;
  }
  const path = usePathname();
  if (enterFlag === false) {
    if (decodeURIComponent(path.split("/")[2]) !== "undefined")
      setSearchKeyword(decodeURIComponent(path.split("/")[2]));
    setEnterFlag(true);
  }

  useEffect(() => {
    setSearchKeyword("");
  }, [sidebarIndex]);

  return (
    <html className="h-full bg-gray-900">
      <ItemDrawer />
      <body className="h-full ">
        <Transition.Root show={sidebarOpened} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 xl:hidden"
            onClose={setSidebarOpened}
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
              <div className="fixed inset-0 " />
              {/* bg-gray-900/80 */}
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
                        onClick={() => setSidebarOpened(false)}
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

                  <div className="bg-gray-900 flex grow flex-col gap-y-5 overflow-y-auto  px-6 ring-1 ring-white/10">
                    <Link href="/" className="cursor-pointer">
                      <div className="flex h-16 shrink-0 items-center">
                        <svg
                          className="h-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 47 40"
                          fill="none"
                        >
                          <path
                            fill="#FB923C"
                            d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"
                          />
                          <defs>
                            <linearGradient
                              id="%%GRADIENT_ID%%"
                              x1="33.999"
                              x2="1"
                              y1="16.181"
                              y2="16.181"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="%%GRADIENT_TO%%" />
                              <stop offset="1" stop-color="%%GRADIENT_FROM%%" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </Link>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item, index) => (
                              <li
                                key={item.name}
                                onClick={() => {
                                  setSidebarIndex(index);
                                }}
                              >
                                <a
                                  href={item.href}
                                  className={classNames(
                                    sidebarIndex === index
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
                          <div className="h-[1px] my-[12px] bg-[#696F7C]" />
                          <button
                            onClick={() => {
                              setJourneyOpened(true);
                            }}
                            className="bg-[#F77F2F] my-[8px] w-full hover:bg-opacity-80 text-white  py-[8px] px-[16px] rounded-full mt-[4px]"
                          >
                            새 행선지 추가
                          </button>

                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {journeyList.map((journeyPair, index) => (
                              <li key={index}>
                                <a
                                  className={classNames(
                                    journeyIndex === index
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {index + 1}
                                  </span>
                                  <span className="truncate">
                                    {journeyPair.arriveCountry}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="/login"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                            <span className="sr-only">프로필</span>
                            <span aria-hidden="true">로그인</span>
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
            <Link href="/" className="cursor-pointer">
              <div className="flex h-16 shrink-0 items-center">
                <svg
                  className="h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 47 40"
                  fill="none"
                >
                  <path
                    fill="#FB923C"
                    d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"
                  />
                  <defs>
                    <linearGradient
                      id="%%GRADIENT_ID%%"
                      x1="33.999"
                      x2="1"
                      y1="16.181"
                      y2="16.181"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="%%GRADIENT_TO%%" />
                      <stop offset="1" stop-color="%%GRADIENT_FROM%%" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </Link>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item, _i) => (
                      <li
                        key={item.name}
                        onClick={() => {
                          setSidebarIndex(_i);
                        }}
                      >
                        <a
                          href={item.href}
                          className={classNames(
                            sidebarIndex === _i
                              ? " text-white hover:bg-gray-800"
                              : "text-gray-400 hover:text-white hover:bg-gray-800 ",
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
                  <div className="h-[1px] my-[12px] bg-[#696F7C]" />
                  <button
                    onClick={() => {
                      setJourneyOpened(true);
                    }}
                    className="bg-[#F77F2F] my-[8px] w-full hover:bg-opacity-80 text-white  py-[8px] px-[16px] rounded-full mt-[4px]"
                  >
                    새 행선지 추가
                  </button>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {journeyList.map((journeyPair, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setJourneyIndex(index);
                        }}
                      >
                        <a
                          className={classNames(
                            journeyIndex === index
                              ? "text-white bg-gray-800 "
                              : "text-gray-400 hover:text-white",
                            "group cursor-pointer flex gap-x-3 rounded-md p-2 hover:bg-gray-800  text-sm leading-6 font-semibold"
                          )}
                        >
                          <span
                            className={`${
                              journeyIndex === index ? "text-white" : ""
                            } flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-[0.625rem] font-medium text-gray-400 group-hover:text-white`}
                          >
                            {index + 1}
                          </span>
                          <span className="truncate">
                            🇰🇷 한국 &nbsp;→&nbsp; {journeyPair.arriveCountry}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="/login"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <span className="sr-only">프로필</span>
                    <span aria-hidden="true">로그인</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white xl:hidden"
              onClick={() => setSidebarOpened(true)}
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
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    value={searchKeyword}
                    onChange={(e) => {
                      if (e.currentTarget.value !== "") setCameraOpened(false);
                      setSearchKeyword(e.currentTarget.value);
                      setItemSidebarOpened(false);
                    }}
                    // onKeyUp={(e) => {
                    //   if (e.key === "Enter") {
                    //     e.preventDefault();
                    //     setSearchKeyword(e.currentTarget.value);
                    //   }
                    // }}
                    autoComplete="off"
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder={`${
                      sidebarIndex === 0 ? "반입" : "추천"
                    } 물품을 입력해보세요`}
                    // 반입 물품을 확인해보세요
                    // type="search"
                    // name="search"
                  />
                  {isCameraOpened === false ? (
                    <CameraIcon
                      onClick={async () => {
                        await setSearchKeyword("");
                        await setCameraOpened(true);
                        await startCamera();
                        await startCamera();
                      }}
                      className="cursor-pointer absolute inset-y-0 right-0 h-full w-5 text-gray-500"
                      // pointer-events-none
                      aria-hidden="true"
                    />
                  ) : (
                    <XMarkIcon
                      onClick={async () => {
                        await setSearchKeyword("");
                        await setCameraOpened(false);
                        await setIsCameraStarted(false);
                        await setItemSidebarOpened(false);
                        if (mediaStream !== null && mediaStream !== undefined)
                          mediaStream
                            .getTracks()
                            .forEach((track) => track.stop());
                        await setSearchKeyword("");
                        await setCameraOpened(false);
                        await setIsCameraStarted(false);
                        await setItemSidebarOpened(false);
                        if (mediaStream !== null && mediaStream !== undefined)
                          mediaStream
                            .getTracks()
                            .forEach((track) => track.stop());
                      }}
                      className="cursor-pointer absolute inset-y-0 right-10 h-full w-5 text-gray-500"
                      // pointer-events-none
                      aria-hidden="true"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
          {sidebarIndex === 0 && (
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
                  <div className={`${searchKeyword === "" ? "" : ""}`}>
                    {/* lg:block hidden */}
                    <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                      <div className="flex justify-start items-center">
                        <h1 className="text-base font-semibold leading-7 text-white">
                          반입 물품 검사
                        </h1>
                        <div className="ml-[16px] flex items-end justify-start">
                          <span
                            className={` text-white p-2 text-sm leading-6 font-semibold truncate ${
                              journeyList.length === 0 ? "hidden" : ""
                            }`}
                          >
                            🇰🇷 한국 &nbsp;→&nbsp;
                            {
                              (
                                journeyList[journeyIndex] || {
                                  arriveCountry: "",
                                }
                              ).arriveCountry
                            }{" "}
                          </span>
                        </div>
                      </div>

                      <Menu as="div" className="relative">
                        {/* <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                        정렬 기준
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button> */}
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
          )}

          {sidebarIndex === 1 && (
            <main className="lg:pr-96">
              <div>
                <div className={`${searchKeyword === "" ? "" : ""}`}>
                  {/* lg:block hidden */}
                  <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base font-semibold leading-7 text-white">
                      추천 물품 확인
                    </h1>

                    <Menu as="div" className="relative">
                      {/* <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                        정렬 기준
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button> */}
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
                                위험도
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </header>
                </div>
                <RecommendList />
              </div>
            </main>
          )}

          {/* Activity feed */}
          <aside className="lg:block hidden bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-white">
                {rankingFlag === false ? "아이템 랭킹" : "유저 랭킹"}
              </h2>
              <a
                href="#"
                onClick={() => {
                  setRankingFlag(!rankingFlag);
                }}
                className="text-sm font-semibold leading-6 text-orange-400"
              >
                {rankingFlag === false ? "유저 랭킹" : "아이템 랭킹"}
              </a>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {(rankingFlag === false ? activityItems : banItems).map(
                (item) => (
                  <li
                    key={item.commit}
                    className="cursor-pointer hover:bg-gray-800 px-4 py-4 sm:px-6 lg:px-8"
                    onClick={() => {
                      setSearchKeyword(item.user.name as any);
                      setSidebarIndex(0);
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
                )
              )}
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
