import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";

export function RelaxedScreen() {
  const { goto } = useApp();

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        padding: "20px 24px 32px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          marginTop: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#FFF1E1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
          }}
          aria-hidden
        >
          😮
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
          앗! 원하시는 음식점이 없어
          <br />
          범위를 조정하고 있어요
        </h1>
        <p
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "#8B95A1",
            lineHeight: 1.55,
          }}
        >
          조건에 맞는 곳이 없어
          <br />
          예산 폭을 조금 넓혀 추천했어요.
        </p>

        <div
          style={{
            marginTop: 28,
            background: "#F9FAFB",
            borderRadius: 14,
            padding: "16px 18px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <p style={{ fontSize: 13, color: "#8B95A1", fontWeight: 600 }}>완화 내역</p>
          <ul
            style={{
              marginTop: 8,
              paddingLeft: 18,
              fontSize: 14,
              color: "#333D4B",
              lineHeight: 1.7,
            }}
          >
            <li>예산 완충폭 확대</li>
          </ul>
          <p style={{ marginTop: 8, fontSize: 12, color: "#8B95A1" }}>
            술 제약은 그대로 지켰어요.
          </p>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={() => goto("vote")}
        style={{ background: BRAND_ORANGE }}
      >
        확인
      </Button>
    </div>
  );
}
