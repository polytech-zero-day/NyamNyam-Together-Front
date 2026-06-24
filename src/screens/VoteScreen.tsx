import { useState } from "react";
import { colors } from "@toss/tds-colors";
import { Asset, BottomCTA, Button, Top } from "@toss/tds-mobile";
import {
  SORT_OPTIONS,
  type Restaurant,
  type SortOrder,
} from "../types";
import { DUMMY_RESTAURANTS } from "../data/dummy-restaurants";

// F-12 후보 투표 화면. SortSelectScreen 에서 고른 정렬 기준으로 추천된 3~4 곳을 보여준다.
// 같은 화면 + sort prop 만 다른 시안 3개(4·5·6) 를 이 한 컴포넌트로 처리.
// 카드 클릭 → 외곽선 진해짐(선택). 선택 전 "투표하기" 비활성.
// AI 추천 이유는 표시하지 않음(F-15 폐기). 평점·리뷰수만.
// 식당 데이터는 props 로 받음 — 백엔드 연동 전이라 기본값은 DUMMY_RESTAURANTS.
interface Props {
  sort: SortOrder;
  restaurants?: Restaurant[];
  onVote?: (restaurantId: string) => void;
}

export function VoteScreen({
  sort,
  restaurants = DUMMY_RESTAURANTS,
  onVote,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sortLabel =
    SORT_OPTIONS.find((o) => o.id === sort)?.label ?? "리뷰 많은 순";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        background: "#fff",
      }}
    >
      <Top
        title={
          <Top.TitleParagraph size={22}>
            마음에 드는 곳에 투표해요
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph size={17}>{sortLabel}</Top.SubtitleParagraph>
        }
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
        }}
      >
        {restaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            selected={selectedId === r.id}
            onClick={() => setSelectedId(r.id)}
          />
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        <BottomCTA.Double
          leftButton={
            // 시안 단일 버튼이지만 BottomCTA.Single 의 disabled 옵션이 약해서
            // Double 의 우측만 활용. 좌측은 빈 자리(시각적으로 가운데 정렬).
            <div />
          }
          rightButton={
            <Button
              color="primary"
              variant="fill"
              size="xlarge"
              display="block"
              disabled={selectedId == null}
              onClick={() => {
                if (selectedId != null) {
                  if (onVote) onVote(selectedId);
                  else console.log("[vote] voted:", selectedId);
                }
              }}
            >
              투표하기
            </Button>
          }
        />
      </div>
    </div>
  );
}

// 식당 카드: 320×200 이미지 + 하단 흰 정보행. 선택 시 외곽선 진하게 + inset shadow.
function RestaurantCard({
  restaurant,
  selected,
  onClick,
}: {
  restaurant: Restaurant;
  selected: boolean;
  onClick: () => void;
}) {
  const primary = "#FF5F00";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 320,
        height: 200,
        borderRadius: 20,
        // 시안: 선택 4px 진한 주황 + inset shadow / 미선택 0.7px 연한 주황
        border: selected ? `4px solid ${primary}` : `0.7px solid ${primary}`,
        boxShadow: selected
          ? "inset 6px 6px 4px 0 rgba(0,0,0,0.25)"
          : "none",
        background: "#fff",
        padding: 0,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Asset.Image
        src={restaurant.imageUrl}
        frameShape={{ width: 320, height: 200, radius: 20 }}
        scaleType="crop"
        alt={restaurant.name}
        backgroundColor="transparent"
      />
      {/* 하단 정보 행 — 카드 위에 absolute 로 깔린다. */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <p
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: colors.grey800,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {restaurant.name}
          </p>
          <p
            style={{
              fontSize: 13,
              color: colors.grey500,
              margin: 0,
            }}
          >
            {restaurant.category}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          <Asset.Icon
            name="icon-star-fill-mono"
            color="#FFB200"
            frameShape={{ width: 20, height: 20 }}
            backgroundColor="transparent"
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: colors.grey800,
            }}
          >
            {restaurant.rating.toFixed(1)}({restaurant.userRatingCount})
          </span>
        </div>
      </div>
    </button>
  );
}
