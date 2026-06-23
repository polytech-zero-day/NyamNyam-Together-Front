import { useState } from "react";
import { Button } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useApp } from "../store";
import { FOOD_CATEGORIES, type FoodCategory } from "../types";

const MAX_PICK = 3;

const EMOJI: Record<FoodCategory, string> = {
  한식: "🍲",
  일식: "🍣",
  양식: "🍔",
  중식: "🥡",
  분식: "🍢",
  아시안: "🍜",
  "고기·구이": "🥩",
  "카페·브런치": "🥗",
};

// 음식 취향 (사용자_투표_6/7) — 허브(q-hub)에서 진입하는 풀스크린 그리드. 최대 3개 다중선택.
// 선택은 로컬 draft로 다루고 "다음"에서만 store에 커밋한다("이전"은 취소).
export function FoodScreen() {
  const { participant, patchParticipant, goto } = useApp();
  const [draft, setDraft] = useState<FoodCategory[]>(participant.foods);
  const ready = draft.length > 0;

  const toggle = (c: FoodCategory) => {
    setDraft((prev) => {
      if (prev.includes(c)) return prev.filter((x) => x !== c);
      if (prev.length >= MAX_PICK) return prev; // 최대 3개
      return [...prev, c];
    });
  };

  const submit = () => {
    patchParticipant({ foods: draft });
    goto("q-hub");
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
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: colors.grey900,
          letterSpacing: "-0.02em",
        }}
      >
        어떤 메뉴를 좋아하나요?
      </h1>
      <p style={{ marginTop: 8, fontSize: 15, color: colors.grey600 }}>
        {MAX_PICK}개까지 고를 수 있어요
      </p>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {FOOD_CATEGORIES.map((c) => {
          const selected = draft.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              style={{
                border: "none",
                background: selected ? colors.grey200 : colors.grey50,
                borderRadius: 16,
                padding: "22px 8px",
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
                  fontSize: 15,
                  fontWeight: selected ? 700 : 500,
                  color: colors.grey800,
                }}
              >
                {c}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Button
            color="dark"
            variant="weak"
            size="xlarge"
            display="block"
            onClick={() => goto("q-hub")}
          >
            이전
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Button
            color="primary"
            variant="fill"
            size="xlarge"
            display="block"
            disabled={!ready}
            onClick={submit}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
