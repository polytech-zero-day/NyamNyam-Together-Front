import { colors } from "@toss/tds-colors";
import { Asset, BottomCTA, Button, Top } from "@toss/tds-mobile";
import { DUMMY_VOTE_RESULTS, type VoteResult } from "../data/dummy-vote-results";

// F-13(투표 결과). 최다 득표 식당 1위 부상, 2·3위는 보조 표시.
// CLAUDE.md 4장: "최종 한 곳 선택은 사용자 몫(시스템은 최다 득표 하이라이트만, 확정하지 않음)".
// 그래서 이 화면도 "선정해드렸어요" 가 아니라 "여기로 정해졌어요" — 자연 부상 결과 안내.
// 더미 데이터는 src/data/dummy-vote-results.ts 에서. 백엔드 연동 시 그 export 만 교체하면 됨.
const PRIMARY = "#FF5F00";
const PRIMARY_LIGHT = "#FFCCA8";

interface Props {
  results?: VoteResult[];
  onShare?: () => void;
  onShowMap?: (placeId: string) => void;
}

export function FinalResultScreen({
  results = DUMMY_VOTE_RESULTS,
  onShare,
  onShowMap,
}: Props) {
  const first = results.find((r) => r.rank === 1);
  const others = results.filter((r) => r.rank !== 1).sort((a, b) => a.rank - b.rank);

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
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Top
          title={
            <Top.TitleParagraph size={22}>
              {`이번 모임 장소는\n여기로 정해졌어요`}
            </Top.TitleParagraph>
          }
          subtitleTop={
            <Top.SubtitleParagraph size={13}>투표 완료!</Top.SubtitleParagraph>
          }
        />

        {first && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "8px 0 16px",
            }}
          >
            <WinnerCard result={first} />
          </div>
        )}

        {others.length > 0 && (
          <>
            <p
              style={{
                fontSize: 13,
                color: colors.grey500,
                margin: 0,
                padding: "16px 24px 8px",
              }}
            >
              다른 후보
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "0 20px 24px",
              }}
            >
              {others.map((r) => (
                <OtherCandidateRow key={r.restaurant.id} result={r} />
              ))}
            </div>
          </>
        )}
      </div>

      <BottomCTA.Double
        leftButton={
          <Button
            color="dark"
            variant="weak"
            size="xlarge"
            display="block"
            onClick={() => {
              if (first && onShowMap) onShowMap(first.restaurant.id);
              else console.log("[final-result] 지도 보기");
            }}
            aria-label="지도 보기"
          >
            <Asset.Icon
              name="icon-pin-location-mono"
              color={colors.grey700}
              frameShape={{ width: 24, height: 24 }}
              backgroundColor="transparent"
            />
          </Button>
        }
        rightButton={
          <Button
            color="primary"
            variant="fill"
            size="xlarge"
            display="block"
            onClick={() => {
              if (onShare) onShare();
              else console.log("[final-result] 공유하기");
            }}
          >
            공유하기
          </Button>
        }
      />
    </div>
  );
}

// 1위 카드: VoteScreen 의 RestaurantCard 와 비슷한 구조 + "N표" 우측 표시.
// 외곽선은 1px (이번엔 단일이라 두꺼운 선택 표시는 불필요).
function WinnerCard({ result }: { result: VoteResult }) {
  const { restaurant, voteCount } = result;
  return (
    <div
      style={{
        width: 320,
        height: 200,
        borderRadius: 20,
        border: `1px solid ${PRIMARY}`,
        background: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Asset.Image
        src={restaurant.imageUrl}
        frameShape={{ width: 320, height: 200, radius: 20 }}
        scaleType="crop"
        alt={restaurant.name}
        backgroundColor="transparent"
      />
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
        <div style={{ flex: 1, minWidth: 0 }}>
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
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
          <span style={{ fontSize: 13, color: colors.grey500 }}>
            {voteCount}표
          </span>
        </div>
      </div>
    </div>
  );
}

// 2/3위 카드: 작은 가로 카드. 좌측 순위 배지(겹쳐 올림) + 작은 이미지 + 이름/카테고리 + 평점.
function OtherCandidateRow({ result }: { result: VoteResult }) {
  const { restaurant, voteCount, rank } = result;
  return (
    <div style={{ position: "relative" }}>
      {/* 순위 배지 — 카드 좌상단에 살짝 겹쳐서 */}
      <div
        style={{
          position: "absolute",
          top: -6,
          left: 12,
          zIndex: 1,
          background: colors.grey500,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          width: 20,
          height: 20,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rank}
      </div>
      <div
        style={{
          background: "#fff",
          border: `1.5px solid ${PRIMARY_LIGHT}`,
          borderRadius: 15,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          minHeight: 70,
        }}
      >
        <Asset.Image
          src={restaurant.imageUrl}
          frameShape={{ width: 36, height: 36, radius: 9 }}
          scaleType="crop"
          alt={restaurant.name}
          backgroundColor="transparent"
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 17,
              fontWeight: 700,
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
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 15, color: colors.grey500 }}>
            {restaurant.rating.toFixed(1)}({restaurant.userRatingCount})
          </span>
          <span style={{ fontSize: 13, color: colors.grey500 }}>
            {voteCount}표
          </span>
        </div>
      </div>
    </div>
  );
}
