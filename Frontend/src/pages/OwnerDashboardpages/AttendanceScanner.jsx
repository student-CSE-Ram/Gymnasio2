  import React, { useEffect, useState, useRef } from "react";
  import { Html5QrcodeScanner } from "html5-qrcode";
  import axiosInstance from "../../api/axiosInstance";

  export default function AttendanceScanner() {

  const [scanStatus, setScanStatus] = useState("Ready to Scan");
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
  let qrTimeout = setTimeout(() => {

    setScanStatus("QR Not Detected");

  }, 5000);
      scanner.render(

        async (decodedText) => {
          clearTimeout(qrTimeout);

  setScanStatus("QR Detected");

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

    setScanStatus("Ready to Scan");

    lastScanRef.current = null;

    isProcessingRef.current = false;

    qrTimeout = setTimeout(() => {

      setScanStatus("QR Not Detected");

    }, 5000);

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

  setScanStatus("Ready to Scan");

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
        <div className="mt-4 text-center">

    <div
      className={`inline-block px-6 py-3 rounded-xl font-semibold
      ${
        scanStatus.includes("successful")
          ? "bg-green-100 text-green-700"
          : scanStatus.includes("Detected")
          ? "bg-blue-100 text-blue-700"
          : scanStatus.includes("Checking")
          ? "bg-yellow-100 text-yellow-700"
          : scanStatus.includes("Not Detected")
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {scanStatus}
    </div>

  </div>



      </div>
    );
  }