import { useEffect } from "react";
import { Loader } from "@toss/tds-mobile";
import { useApp } from "../store";

export function WaitScreen() {
  const { goto } = useApp();

  useEffect(() => {
    const t = setTimeout(() => goto("finding"), 2400);
    return () => clearTimeout(t);
  }, [goto]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <Loader size="large" type="primary" />
      <h1
        style={{
          marginTop: 28,
          fontSize: 20,
          fontWeight: 800,
          color: "#191F28",
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
        }}
      >
        다른 사람의 선택을
        <br />
        기다리고 있어요
      </h1>
      <p style={{ marginTop: 12, fontSize: 14, color: "#8B95A1" }}>
        모임이 마감되면 추천을 시작할게요.
      </p>
    </div>
  );
}
