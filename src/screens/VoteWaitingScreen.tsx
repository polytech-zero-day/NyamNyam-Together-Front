import { colors } from "@toss/tds-colors";
import { Asset, BottomCTA, Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import checkFillIcon from "../assets/check-fill-circle.png";

// F-13/F-14 투표 대기 화면. 호스트가 "투표 현황보기"로 진입했을 때 보는 진행 상황.
// 좌측 "투표 강제종료" → host가 마감 시간 전에 강제 종료(F-09). 우측 "자세히보기" → 14번 상세.
// 더미: 참여 인원/총 인원은 백엔드 연동 시 실제 값으로 교체.
const VOTED_COUNT = 1;
const TOTAL_COUNT = 3;

export function VoteWaitingScreen() {
  const { goto } = useApp();

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
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 24px 24px",
        }}
      >
        <Asset.Image
          src={checkFillIcon}
          frameShape={{ width: 100, height: 100 }}
          scaleType="fit"
          alt=""
          backgroundColor="transparent"
        />
        <p
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.grey800,
            margin: "24px 0 8px",
            textAlign: "center",
          }}
        >
          아직 투표가 완료되지 않았어요
        </p>
        <p
          style={{
            fontSize: 16,
            color: colors.grey500,
            margin: 0,
            textAlign: "center",
          }}
        >
          {`투표 진행 중 ( ${VOTED_COUNT} / ${TOTAL_COUNT} )`}
        </p>
      </div>

      <BottomCTA.Double
        leftButton={
          <Button
            color="dark"
            variant="weak"
            size="xlarge"
            display="block"
            onClick={() => {
              // TODO(backend): 호스트 강제 종료 API → 종료 시점 스냅샷.
              // 데모: 바로 종료 결과 화면으로 이동.
              goto("vote-info-closed");
            }}
          >
            투표 강제종료
          </Button>
        }
        rightButton={
          <Button
            color="primary"
            variant="fill"
            size="xlarge"
            display="block"
            onClick={() => goto("vote")}
          >
            자세히보기
          </Button>
        }
      />
    </div>
  );
}
