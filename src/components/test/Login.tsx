"use client";
import { useRouter } from "next/navigation";
import { useChatbotOpened } from "@/hooks/states";
import { useEffect, useState } from "react";

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
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div>
      <p>4</p>
      <hr className="h-[60px]"></hr>
      <p>아래 토큰이 있습니다.</p>
      {token && <p>{token}</p>}
      <div className="mt-[120px]"></div>
      <input
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="아이디"
      />
      <input
        placeholder="비밀번호"
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <button
        className="w-16 h-16 bg-orange-300"
        onClick={() => {
          postLogin();
        }}
      >
        로그인
      </button>
      <button
        className="w-16 h-16 bg-yellow-300"
        onClick={() => {
          router.push("http://13.124.243.62/auth/login/kakao");
          getKakaoLogin();
        }}
      >
        카카오 로그인
      </button>
    </div>
  );
}
