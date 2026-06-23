import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";
import type { Alcohol } from "../types";

const OPTIONS: { id: Alcohol; title: string; sub: string; emoji: string }[] = [
  { id: "drink", title: "마실 거예요", sub: "술이 있는 자리가 좋아요", emoji: "🍻" },
  {
    id: "around",
    title: "안 마시지만 술자리는 괜찮아요",
    sub: "옆에서 마셔도 괜찮아요",
    emoji: "🍵",
  },
  {
    id: "uncomfortable",
    title: "술자리 자체가 불편해요",
    sub: "술 없는 식당으로 골라주세요",
    emoji: "🚫",
  },
];

export function AlcoholScreen() {
  const { participant, patchParticipant, goto } = useApp();
  const ready = participant.alcohol != null;

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
      <p style={{ fontSize: 13, color: "#8B95A1", fontWeight: 600 }}>1 / 4</p>
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
        술자리, 어떻게 느끼세요?
      </h1>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        {OPTIONS.map((o) => {
          const selected = participant.alcohol === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => patchParticipant({ alcohol: o.id })}
              style={{
                border: selected ? `1.5px solid ${BRAND_ORANGE}` : "1.5px solid #F2F4F6",
                background: selected ? "#FFF6EE" : "#fff",
                borderRadius: 14,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "#F2F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                <span aria-hidden>{o.emoji}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#191F28" }}>
                  {o.title}
                </p>
                <p style={{ marginTop: 2, fontSize: 13, color: "#8B95A1" }}>{o.sub}</p>
              </div>
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
        onClick={() => goto("q-budget")}
      >
        다음
      </Button>
    </div>
  );
}
