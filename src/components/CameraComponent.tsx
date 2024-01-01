import { useCapturedImage, useMediaStream } from "@/hooks/states";
import React, { useState, useRef } from "react";

function CameraComponent() {
  const { data: mediaStream, setData: setMediaStream } = useMediaStream();
  const { data: capturedImage, setData: setCapturedImage } = useCapturedImage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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

  const handleButtonClick = () => {
    if (!isCameraStarted) {
      startCamera();
    } else {
      capturePhoto();
    }
  };

  return (
    <div className="App">
      <video ref={videoRef} autoPlay />
      <button
        className=" w-16 h-16 bg-white rounded-full mx-auto border-double border-2 border-gray-300"
        onClick={handleButtonClick}
      >
        {isCameraStarted ? "사진 찍기" : "카메라 시작"}
      </button>
      {/* {capturedImage && (
        <div>
          <h2>캡처된 이미지</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )} */}
    </div>
  );
}

export default CameraComponent;
