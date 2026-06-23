import { useEffect, useState } from "react";
import { Loader } from "@toss/tds-mobile";
import { useApp } from "../store";

const STEPS = [
  "조건에 맞는 식당을 추리고 있어요",
  "다이닝코드·식신에서 평점을 확인하고 있어요",
  "딱 맞는 3~4 곳을 고르고 있어요",
];

export function FindingScreen() {
  const { goto } = useApp();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => goto("vote"), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
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
        여러분의 선택으로
        <br />
        음식점을 고르고 있어요
      </h1>
      <p
        style={{
          marginTop: 12,
          fontSize: 14,
          color: "#8B95A1",
          minHeight: 20,
        }}
      >
        {STEPS[step]}
      </p>
    </div>
  );
}
