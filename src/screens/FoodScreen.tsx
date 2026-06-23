import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";
import { FOOD_CATEGORIES, type FoodCategory } from "../types";

const EMOJI: Record<FoodCategory, string> = {
  "한식": "🍚",
  "고기": "🥩",
  "일식": "🍣",
  "중식": "🥟",
  "양식": "🍝",
  "아시안": "🍜",
  "분식": "🍢",
  "간편식": "🥪",
  "치킨·안주": "🍗",
};

export function FoodScreen() {
  const { participant, patchParticipant, goto } = useApp();
  const foods = participant.foods;

  const toggle = (c: FoodCategory) => {
    patchParticipant({
      foods: foods.includes(c) ? foods.filter((x) => x !== c) : [...foods, c],
    });
  };

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
      <p style={{ fontSize: 13, color: "#8B95A1", fontWeight: 600 }}>3 / 4</p>
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
        어떤 음식을 좋아하세요?
      </h1>
      <p style={{ marginTop: 12, fontSize: 14, color: "#8B95A1" }}>
        여러 개 골라도 좋아요. (선호일 뿐, 거르지 않아요)
      </p>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
        }}
      >
        {FOOD_CATEGORIES.map((c) => {
          const selected = foods.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              style={{
                border: selected
                  ? `1.5px solid ${BRAND_ORANGE}`
                  : "1.5px solid #F2F4F6",
                background: selected ? "#FFF6EE" : "#fff",
                borderRadius: 14,
                padding: "16px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 28 }} aria-hidden>
                {EMOJI[c]}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: selected ? 700 : 500,
                  color: selected ? BRAND_ORANGE : "#333D4B",
                }}
              >
                {c}
              </span>
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
        onClick={() => goto("q-mood")}
      >
        다음
      </Button>
    </div>
  );
}
