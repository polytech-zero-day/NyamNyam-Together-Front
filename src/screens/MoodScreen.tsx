import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";
import { MOOD_OPTIONS, type Mood } from "../types";

const SUBS: Record<Mood, string> = {
  "차분한 룸": "조용히 얘기할 수 있는 곳",
  "적당히 시끄러운": "활기찬 분위기가 좋아요",
  "상관 없어요": "분위기는 어디든 좋아요",
};

export function MoodScreen() {
  const { participant, patchParticipant, goto } = useApp();
  const ready = participant.mood != null;

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
      <p style={{ fontSize: 13, color: "#8B95A1", fontWeight: 600 }}>4 / 4</p>
      <h1
        style={{
          marginTop: 8,
          fontSize: 22,
          fontWeight: 800,
          color: "#191F28",
          letterSpacing: "-0.02em",
          lineHeight: 1.35,
        }}
      >
        어떤 분위기가 좋으세요?
      </h1>
      <p style={{ marginTop: 12, fontSize: 14, color: "#8B95A1" }}>
        딱 정해지지 않으면 "상관 없어요"를 골라주세요.
      </p>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {MOOD_OPTIONS.map((m) => {
          const selected = participant.mood === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => patchParticipant({ mood: m })}
              style={{
                border: selected
                  ? `1.5px solid ${BRAND_ORANGE}`
                  : "1.5px solid #F2F4F6",
                background: selected ? "#FFF6EE" : "#fff",
                borderRadius: 14,
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 4,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: selected ? BRAND_ORANGE : "#191F28",
                }}
              >
                {m}
              </span>
              <span style={{ fontSize: 13, color: "#8B95A1" }}>{SUBS[m]}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        disabled={!ready}
        onClick={() => goto("progress")}
      >
        다음
      </Button>
    </div>
  );
}
