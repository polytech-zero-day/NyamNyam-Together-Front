import { useState } from "react";
import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";
import type { Restaurant } from "../types";

const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "오반장 강남직영점",
    category: "고깃집",
    distanceM: 220,
    rating: 4.4,
    reason: "조용한 룸이 있어 친구들과 편하게 얘기하기 좋아요.",
    bg: "#FFE2C8",
    emoji: "🥩",
  },
  {
    id: "r2",
    name: "이자카야 하나비",
    category: "이자카야",
    distanceM: 340,
    rating: 4.6,
    reason: "1인 2~3만원대로 부담 없고, 술 안 마시는 친구도 편해요.",
    bg: "#F2E1FF",
    emoji: "🍣",
  },
  {
    id: "r3",
    name: "온기정 한식다이닝",
    category: "한식",
    distanceM: 410,
    rating: null,
    reason: "한식 선호와 차분한 분위기 모두 맞춰주는 곳이에요.",
    bg: "#D8F0DA",
    emoji: "🍚",
  },
  {
    id: "r4",
    name: "파스타 부오노",
    category: "양식",
    distanceM: 480,
    rating: 4.2,
    reason: "예산 안에서 분위기 좋은 양식 후보로 골라봤어요.",
    bg: "#FFD7D7",
    emoji: "🍝",
  },
];

export function VoteScreen() {
  const { voted, setVoted, meeting } = useApp();
  const [votes, setVotes] = useState<Record<string, number>>({
    r1: 2,
    r2: 1,
    r3: 1,
    r4: 0,
  });

  const handleVote = (id: string) => {
    setVotes((prev) => {
      const next = { ...prev };
      if (voted === id) {
        next[id] = Math.max(0, (next[id] ?? 1) - 1);
        setVoted(null);
      } else {
        if (voted) next[voted] = Math.max(0, (next[voted] ?? 1) - 1);
        next[id] = (next[id] ?? 0) + 1;
        setVoted(id);
      }
      return next;
    });
  };

  const max = Math.max(...Object.values(votes));

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        padding: "20px 24px 0",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#191F28",
          letterSpacing: "-0.02em",
          lineHeight: 1.35,
        }}
      >
        딱 맞는 곳을 골랐어요
      </h1>
      <p style={{ marginTop: 10, fontSize: 14, color: "#8B95A1" }}>
        {meeting.station ?? "강남역"} 근처 · 가장 마음에 드는 곳에 좋아요를 눌러주세요.
      </p>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {RESTAURANTS.map((r) => {
          const v = votes[r.id] ?? 0;
          const isMine = voted === r.id;
          const isTop = v > 0 && v === max;
          return (
            <RestaurantCard
              key={r.id}
              r={r}
              votes={v}
              isMine={isMine}
              isTop={isTop}
              onVote={() => handleVote(r.id)}
            />
          );
        })}
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          marginLeft: -24,
          marginRight: -24,
          padding: "12px 20px 20px",
          background:
            "linear-gradient(to top, #fff 60%, rgba(255,255,255,0))",
        }}
      >
        <Button
          color="primary"
          variant="fill"
          size="xlarge"
          display="block"
          disabled={!voted}
          onClick={() => {
            /* 결과 확정은 사용자 몫 — CTA는 종료 표시 */
          }}
        >
          {voted ? "투표 완료" : "마음에 드는 곳을 골라주세요"}
        </Button>
      </div>
    </div>
  );
}

function RestaurantCard({
  r,
  votes,
  isMine,
  isTop,
  onVote,
}: {
  r: Restaurant;
  votes: number;
  isMine: boolean;
  isTop: boolean;
  onVote: () => void;
}) {
  return (
    <div
      style={{
        border: isTop ? `2px solid ${BRAND_ORANGE}` : "1px solid #F2F4F6",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        position: "relative",
      }}
    >
      {isTop && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: BRAND_ORANGE,
            color: "#fff",
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          현재 최다 득표
        </div>
      )}
      <div
        style={{
          background: r.bg,
          aspectRatio: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
        }}
        aria-hidden
      >
        {r.emoji}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#191F28",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {r.name}
            </p>
            <p
              style={{
                marginTop: 4,
                fontSize: 13,
                color: "#8B95A1",
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <span>{r.category}</span>
              <span style={{ color: "#D1D6DB" }}>·</span>
              <span>{r.distanceM}m</span>
              {r.rating != null && (
                <>
                  <span style={{ color: "#D1D6DB" }}>·</span>
                  <span>★ {r.rating.toFixed(1)}</span>
                </>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onVote}
            aria-label="좋아요"
            style={{
              border: "none",
              borderRadius: 999,
              background: isMine ? BRAND_ORANGE : "#F9FAFB",
              color: isMine ? "#fff" : "#8B95A1",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <span aria-hidden>{isMine ? "❤" : "🤍"}</span>
            <span>{votes}</span>
          </button>
        </div>

        <div
          style={{
            marginTop: 12,
            background: "#FFF6EE",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <p style={{ fontSize: 12, color: BRAND_ORANGE, fontWeight: 700 }}>
            AI 추천 이유
          </p>
          <p
            style={{
              marginTop: 4,
              fontSize: 13,
              color: "#333D4B",
              lineHeight: 1.5,
            }}
          >
            {r.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
