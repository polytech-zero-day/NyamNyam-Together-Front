import { useEffect, useState } from "react";
import { ProgressBar } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";

const TOTAL = 5;

export function ProgressScreen() {
  const { goto, meeting } = useApp();
  const [responded, setResponded] = useState(3);

  useEffect(() => {
    const total = meeting.minMembers ?? TOTAL;
    const t1 = setTimeout(() => setResponded(Math.min(total, 4)), 1200);
    const t2 = setTimeout(() => setResponded(total), 2400);
    // 전원 응답 도달 → "모두 다 골랐어요!" 화면으로 (거기서 추천 로딩 finding으로 진입)
    const t3 = setTimeout(() => goto("all-done"), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [goto, meeting.minMembers]);

  const total = meeting.minMembers ?? TOTAL;
  const progress = responded / total;

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "#FFF1E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
        }}
        aria-hidden
      >
        ⏳
      </div>
      <h1
        style={{
          marginTop: 24,
          fontSize: 20,
          fontWeight: 800,
          color: "#191F28",
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
        }}
      >
        친구들의 응답을
        <br />
        기다리고 있어요
      </h1>
      <p
        style={{
          marginTop: 24,
          fontSize: 28,
          fontWeight: 800,
          color: BRAND_ORANGE,
        }}
      >
        {responded}
        <span style={{ color: "#B0B8C1", fontWeight: 700 }}>/{total}</span>
        <span style={{ marginLeft: 4, fontSize: 16, color: "#8B95A1", fontWeight: 600 }}>
          명 응답
        </span>
      </p>
      <div style={{ width: "100%", marginTop: 16 }}>
        <ProgressBar progress={progress} color={BRAND_ORANGE} animate size="normal" />
      </div>
    </div>
  );
}
