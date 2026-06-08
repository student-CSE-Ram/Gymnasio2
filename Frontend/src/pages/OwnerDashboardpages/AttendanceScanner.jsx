import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axiosInstance from "../../api/axiosInstance";

export default function AttendanceScanner() {

  const [scanStatus, setScanStatus] =
    useState("Ready to Scan");

  const isProcessingRef =
    useRef(false);

  const lastScanRef =
    useRef(null);

  useEffect(() => {

    let html5QrCode;

    const startScanner =
      async () => {

        const reader =
          document.getElementById(
            "reader"
          );

        if (!reader) {
          return;
        }

        try {

          html5QrCode =
            new Html5Qrcode(
              "reader"
            );

          const devices =
            await Html5Qrcode.getCameras();

          if (
            !devices ||
            devices.length === 0
          ) {

            setScanStatus(
              "No Camera Found"
            );

            return;
          }

          await html5QrCode.start(

            { facingMode: "environment" },

            {
              fps: 5,
              qrbox: {
                width: 250,
                height: 250,
              },
            },

            async (decodedText) => {

              if (
                decodedText ===
                lastScanRef.current
              ) {
                return;
              }

              if (
                isProcessingRef.current
              ) {
                return;
              }

              lastScanRef.current =
                decodedText;

              isProcessingRef.current =
                true;

              setScanStatus(
                "QR Detected"
              );

              try {

                setScanStatus(
                  "Checking Attendance..."
                );

                const response =
                  await axiosInstance.post(
                    "/member-attendance/scan",
                    {
                      memberId:
                        decodedText,
                    }
                  );

                setScanStatus(
                  response.data.msg
                );

              } catch (error) {

                const errorMessage =
                  error?.response?.data
                    ?.msg ||
                  "Scan Failed";

                setScanStatus(
                  errorMessage
                );
              }

              setTimeout(() => {

                setScanStatus(
                  "Ready to Scan"
                );

                lastScanRef.current =
                  null;

                isProcessingRef.current =
                  false;

              }, 3000);
            },

            () => {
              // Ignore scan failures
            }
          );

        } catch (error) {

          console.error(
            "Scanner Start Error:",
            error
          );

          setScanStatus(
            "Camera Failed To Start"
          );
        }
      };

    const timer =
      setTimeout(
        startScanner,
        500
      );

    return () => {

      clearTimeout(timer);

      if (html5QrCode) {

        html5QrCode
          .stop()
          .then(() =>
            html5QrCode.clear()
          )
          .catch(() => {});
      }
    };

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Attendance Scanner
      </h1>

      <div
        id="reader"
        className="
          w-full
          max-w-lg
          mx-auto
          rounded-xl
          overflow-hidden
          border
          bg-white
        "
      />

      <div className="mt-6 text-center">

        <div
          className={`inline-block px-6 py-3 rounded-xl font-semibold ${
            scanStatus.includes(
              "successful"
            )
              ? "bg-green-100 text-green-700"
              : scanStatus.includes(
                  "Detected"
                )
              ? "bg-blue-100 text-blue-700"
              : scanStatus.includes(
                  "Checking"
                )
              ? "bg-yellow-100 text-yellow-700"
              : scanStatus.includes(
                  "Failed"
                ) ||
                scanStatus.includes(
                  "Cannot"
                ) ||
                scanStatus.includes(
                  "No Camera"
                )
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