import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axiosInstance from "../../api/axiosInstance";

export default function AttendanceScanner() {

  const [message, setMessage] = useState("");
  const [scanStatus, setScanStatus] = useState("");
const isProcessingRef = useRef(false);
const lastScanRef = useRef(null);

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(

      async (decodedText) => {
        console.log("QR DETECTED:", decodedText);
        setScanStatus("QR Detected");

if (decodedText === lastScanRef.current) {
  return;
}

if (isProcessingRef.current) {
  return;
}

lastScanRef.current = decodedText;
isProcessingRef.current = true;
setScanStatus("Checking Attendance...");
try {

          const response =
            await axiosInstance.post(
              "/member-attendance/scan",
              {
                memberId: decodedText
              }
            );

          setScanStatus(response.data.msg);

setTimeout(() => {

  setMessage("");

  lastScanRef.current = null;

  isProcessingRef.current = false;

}, 3000);

        } catch (error) {

  console.log(
    "SCAN ERROR:",
    error.response?.data
  );

const errorMessage =
  error?.response?.data?.msg ||
  error?.message ||
  "Something went wrong";

setScanStatus(errorMessage);

setTimeout(() => {

  setScanStatus("");

  lastScanRef.current = null;

  isProcessingRef.current = false;

}, 3000);
}
      },

      (error) => {
        // ignore scan errors
      }

    );

    return () => {

      scanner
        .clear()
        .catch(() => {});

    };

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Attendance Scanner
      </h1>

      <div
        id="reader"
        className="max-w-lg mx-auto"
      />
      {scanStatus && (

  <div className="mt-4 text-center">

    <div
      className={`
        inline-block
        px-6
        py-3
        rounded-xl
        font-semibold
        text-lg

        ${
          scanStatus.toLowerCase().includes("successful")
            ? "bg-green-100 text-green-700"
            : scanStatus.toLowerCase().includes("cannot") ||
              scanStatus.toLowerCase().includes("error")
            ? "bg-red-100 text-red-700"
            : "bg-blue-100 text-blue-700"
        }
      `}
    >
      {scanStatus}
    </div>

  </div>

)}

      {message && (
        <div className="mt-6 text-center">

          <div
            className={`inline-block px-6 py-3 rounded-xl font-semibold ${
              message.toLowerCase().includes("fail") ||
              message.toLowerCase().includes("cannot") ||
              message.toLowerCase().includes("error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>

        </div>
      )}

    </div>
  );
}