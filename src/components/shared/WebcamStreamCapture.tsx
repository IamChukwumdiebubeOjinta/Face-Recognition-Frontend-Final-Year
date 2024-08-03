import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Camera, CameraOff, EllipsisVertical } from "lucide-react";
import { toast } from "react-hot-toast";
import * as faceapi from "face-api.js";

interface WebcamStreamCaptureProps {
  toggleDrawer: () => void;
  initialIsActive: boolean;
  onFaceVerified?: (result: unknown | null) => void;
}

export const WebcamStreamCapture: React.FC<WebcamStreamCaptureProps> = ({
  toggleDrawer,
  initialIsActive,
  onFaceVerified = () => {},
}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isCapturing, setIsCapturing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );
  const [faceDetected, setFaceDetected] = useState(false);
  const [unrecognizedCount, setUnrecognizedCount] = useState(0);

  const detectFace = useCallback(async () => {
    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      if (video && video.readyState === 4) {
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        faceapi.matchDimensions(canvas, displaySize);

        // Detect faces with TinyFaceDetectorOptions
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        );
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (resizedDetections.length > 0) {
          setFaceDetected(true);
          const color = verificationResult === "Face verified" ? "green" : "red";
          faceapi.draw.drawDetections(canvas, resizedDetections, { boxColor: color });
        } else {
          setFaceDetected(false);
        }
      }
    }
  }, [verificationResult]);

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const base64Data = imageSrc.split(",")[1];
          const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(
            (res) => res.blob()
          );

          const formData = new FormData();
          formData.append("file", blob, "webcam.jpg");

          const response = await axios.post(
            `${import.meta.env.VITE_API_URI}verify_face`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            const clientData = response.data;
            setVerificationResult("Face verified");
            onFaceVerified(clientData)
            setUnrecognizedCount(0);
          } else {
            setVerificationResult("Face not recognized");
            setUnrecognizedCount((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Error sending frame:", error);
          setVerificationResult("Error during verification");
          setUnrecognizedCount((prev) => prev + 1);
        }
      }
    }
  }, []);

  useEffect(() => {
    let captureInterval: NodeJS.Timeout | null = null;
    let detectionInterval: NodeJS.Timeout | null = null;

    if (isActive && isCapturing) {
      captureInterval = setInterval(capture, 5000); // Capture frame every 5 seconds
      detectionInterval = setInterval(detectFace, 100); // Detect face every 100ms
    }

    return () => {
      if (captureInterval) clearInterval(captureInterval);
      if (detectionInterval) clearInterval(detectionInterval);
    };
  }, [isActive, isCapturing, capture, detectFace]);

  useEffect(() => {
    if (unrecognizedCount >= 2) {
      // 2 * 5 seconds = 10 seconds
      toast.error("Unable to recognize face for 10 seconds", {
        duration: 3000,
        position: "top-center",
      });
      setUnrecognizedCount(0);
    }
  }, [unrecognizedCount]);

  const toggleCamera = useCallback(() => {
    setIsActive((prev) => !prev);
    setIsCapturing((prev) => !prev);
    setVerificationResult(null);
    setUnrecognizedCount(0);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-4">
      {isActive ? (
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg shadow-lg max-w-[32rem] min-h-[24rem]"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg max-w-[32rem] min-h-[24rem]">
          <p className="text-gray-500">Camera is off</p>
        </div>
      )}
      <div className="absolute flex space-x-4 transform -translate-x-1/2 bottom-4 left-1/2">
        <button
          onClick={toggleCamera}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          {isActive ? (
            <CameraOff className="w-6 h-6 text-gray-600" />
          ) : (
            <Camera className="w-6 h-6 text-gray-600" />
          )}
        </button>
        <button
          onClick={toggleDrawer}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          <EllipsisVertical className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {verificationResult && faceDetected && (
        <div className="absolute p-2 transform -translate-x-1/2 bg-white rounded-lg shadow-md top-4 left-1/2">
          <p>{verificationResult}</p>
        </div>
      )}
    </div>
  );
};
