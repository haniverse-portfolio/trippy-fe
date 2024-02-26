"use client";
import { useRef, useEffect, useState } from "react";

const Scanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const AIvideoRef = useRef<HTMLImageElement>(null);
  const scannedElementRef = useRef<HTMLDivElement>(null);

  const [scanWebsocket, setScanWebsocket] = useState<WebSocket | null>(null);
  const [intervalId1, setIntervalId1] = useState<NodeJS.Timeout | null>(null);
  const [intervalId2, setIntervalId2] = useState<NodeJS.Timeout | null>(null);
  const [scannedObject, setScannedObject] = useState<string>("");

  useEffect(() => {
    return () => {
      clearInterval(intervalId1!);
      clearInterval(intervalId2!);
      if (scanWebsocket) {
        scanWebsocket.close();
      }
    };
  }, []);

  const stopStreaming = () => {
    clearInterval(intervalId1!);
    clearInterval(intervalId2!);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => {
          track.stop();
        });
    }
    if (AIvideoRef.current) {
      AIvideoRef.current.src = "";
    }
    if (scanWebsocket) {
      scanWebsocket.close();
    }
  };

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 640 },
      });
      videoRef.current!.srcObject = stream;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      const chunks: Blob[] = [];

      const ws = new WebSocket("ws://165.246.80.7:8000/uploadvideo");
      ws.onopen = () => {
        console.log("WebSocket connected");
        setScanWebsocket(ws);
      };

      ws.onmessage = (event) => {
        const msg = event.data;
        if (typeof msg === "string") {
          console.log(msg);
          setScannedObject(msg);
        } else {
          const blob = new Blob([event.data], { type: "image/mp4" });
          const stream = URL.createObjectURL(blob);
          AIvideoRef.current!.src = stream;
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        clearInterval(intervalId1!);
        clearInterval(intervalId2!);
        setScannedObject("");
        setScanWebsocket(null);
      };

      setIntervalId1(
        setInterval(() => {
          context.drawImage(
            videoRef.current!,
            0,
            0,
            canvas.width,
            canvas.height
          );
          canvas.toBlob((blob) => {
            chunks.push(blob!);
          }, "image/jpeg");
        }, 1000 / 40)
      );

      setIntervalId2(
        setInterval(() => {
          alert("send");
          const blob = new Blob(chunks, { type: "video/webm" });
          scanWebsocket?.send(blob);
          chunks.length = 0;
        }, 1000 / 5)
      );
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Trippy Scanner</h1>
      <video ref={videoRef} autoPlay className="mb-4"></video>
      <img ref={AIvideoRef} className="mb-4" />
      <div ref={scannedElementRef}></div>
      <div className="flex">
        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={startStreaming}
        >
          Start Streaming
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={stopStreaming}
        >
          Stop Streaming
        </button>
      </div>
    </div>
  );
};

export default Scanner;
