"use client";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [token, setToken] = useState("");

  const getKakaoFetcher = (url: string) => {
    return fetch(url, {
      method: "GET",
    }).then((response) => {
      const token = response.headers.get("accessToken");
      if (token) {
        setToken(token);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  };
  const getKakaoLogin = () => {
    const url = "http://13.124.243.62/auth/login/kakao";
    getKakaoFetcher(url)
      .then((response) => {
        console.log("Get Comment Success", response);
        console.log(response.message);
        setToken(response.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const postFetcher = (url: string) => {
    const token = btoa(`${id}:${pwd}`); // id와 pwd를 Base64로 인코딩하여 토큰 생성
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Basic ${token}`, // Basic 인증 헤더 추가
      },
    }).then((response) => {
      const token = response.headers.get("accessToken");
      if (token) {
        setToken(token);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  };

  const postLogin = () => {
    const url = "http://13.124.243.62/auth/login/email";
    // "http://165.246.80.7:3000/auth/login/email";
    //http://13.124.243.62/comment
    postFetcher(url)
      .then((response) => {
        console.log("Get Comment Success", response);
        console.log(response.message);
        setToken(response.message);
        router.push("/check");
      })
      .catch((error) => {
        alert("아이디와 비밀번호를 확인해주세요.");
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="relative isolate bg-gray-900" style={{ height: "100vh" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 ">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2 ">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                />
              </svg>
              <div
                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              트리피 로그인
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              트리피를 이용하여 여행을 좀 더 편하고 안전하게 즐겨보세요. 간편한
              사진 촬영을 통해 항공기 반입물품을 인식합니다. 반입 금지 물품을
              확인하고 편리한 여행을 경험할 수 있도록 팀 트리피가 도와줄게요.
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">주소</span>
                  <BuildingOffice2Icon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  인천광역시 미추홀구
                  <br />
                  인하로 100
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">전화번호</span>
                  <PhoneIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a className="hover:text-white" href="tel:+1 (555) 234-5678">
                    010-0000-0000
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">이메일</span>
                  <EnvelopeIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-white"
                    href="mailto:hello@example.com"
                  >
                    test@example.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <form className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <div className="mt-2.5">
                  <input
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                    placeholder="아이디"
                    type="id"
                    name="id"
                    id="id"
                    className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2.5">
                  <input
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    placeholder="비밀번호"
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </form>

            <div className="mt-8">
              <button
                onClick={async () => {
                  postLogin();
                }}
                type="submit"
                className="w-full rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                트리피 로그인
              </button>
              <div className="h-[1px] my-[24px] bg-[#696F7C]" />
              <button
                onClick={() => {
                  router.push("http://13.124.243.62/auth/login/kakao");
                  // getKakaoLogin();
                }}
                type="submit"
                className="w-full rounded-md bg-[#FED609] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FED609]"
              >
                카카오 로그인
              </button>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
