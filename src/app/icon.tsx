import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0D",
          borderRadius: "14px",
          position: "relative",
        }}
      >
        <svg
          width="46"
          height="46"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="10"
            y1="20"
            x2="72"
            y2="78"
            stroke="white"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <line
            x1="72"
            y1="20"
            x2="10"
            y2="78"
            stroke="white"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle cx="60" cy="12" r="9" fill="#CC0000" />
          <path
            d="M 30 30 Q 60 68 80 56"
            stroke="#CC0000"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
