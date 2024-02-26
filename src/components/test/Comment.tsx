"use client";
import { useChatbotOpened } from "@/hooks/states";
import { useEffect, useState } from "react";

export default function Comment() {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [itemId, setItemId] = useState(800);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ubm5iQGdtYWlsLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MDg5NTA3MzIsImV4cCI6MTcwODk1MTAzMn0.rxXsIcuXIwdtJc1h4jsE-3NE8mpMEiuhTYM84RgjUwI"
  );
  const [commentId, setCommentId] = useState(6);

  const getFetcher = (url: string) =>
    fetch(url + itemId, {
      method: "GET",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

  const getCommentList = () => {
    const url = "http://13.124.243.62/comment";
    getFetcher(url)
      .then((response) => {
        console.log("Get Comment Success", response);
        console.log(response.message);
        setCommentList(response.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const postFetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId: itemId, content: comment }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

  const postComment = () => {
    const url = "http://13.124.243.62/comment";
    postFetcher(url)
      .then((response) => {
        console.log("Message sent successfully:", response);
        console.log(response.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const updateFetcher = (url: string) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: itemId,
        content: comment,
        commentId: commentId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

  const updateComment = () => {
    const url = "http://13.124.243.62/comment";
    updateFetcher(url)
      .then((response) => {
        console.log("Message sent successfully:", response);
        console.log(response.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const deleteFetcher = (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: itemId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

  const deleteComment = () => {
    const url = "http://13.124.243.62/comment";
    updateFetcher(url)
      .then((response) => {
        console.log("Message sent successfully:", response);
        console.log(response.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <div>
      <p>2</p>
      <hr className="h-[60px]"></hr>
      <p>아래 댓글이 있습니다.</p>
      <div className="mt-[120px]">
        {(commentList || []).map((item, _i) => {
          return <div key={_i}>{item}</div>;
        })}
      </div>
      <div>
        <textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="댓글 입력하셈"
        ></textarea>
        <button
          className="w-16 h-16 bg-green-300"
          onClick={() => {
            postComment();
          }}
        >
          전송
        </button>
      </div>
      <div>
        <textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="댓글 입력하셈"
        ></textarea>
        <button
          className="w-16 h-16 bg-green-300"
          onClick={() => {
            updateComment();
          }}
        >
          전송
        </button>
      </div>
      <div>
        <button
          className="h-16 w-16 bg-red-300"
          onClick={() => {
            deleteComment();
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
