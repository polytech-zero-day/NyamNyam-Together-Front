import { colors } from "@toss/tds-colors";
import { Asset, Text } from "@toss/tds-mobile";
import checkFillIcon from "../assets/check-fill-circle.svg";

// F-14 2차(후보) 투표 후 대기 화면.
// 참여자가 후보 식당 중 하나를 골라 투표한 직후 — 다른 참여자들이 끝나길 기다리는 상태.
// App.tsx의 useEffect가 stage2Voted >= total 시 자동으로 VoteCountingScreen으로 전환한다.
// (AUTO_ADVANCE 타임아웃 제거 — 실제 투표 완료 기반으로 전환)

interface Props {
  votedCount?: number;
  totalCount?: number;
  onComplete?: () => void;
}

export function SecondVoteWaitingScreen({
  votedCount = 1,
  totalCount = 3,
  onComplete,
}: Props) {
  // 전환은 App.tsx의 useEffect(stage2Voted >= total)가 담당.
  // 이 화면은 순수 대기 UI — onComplete는 App에서 goto로 연결됨.

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        gap: 16,
        background: "#fff",
      }}
    >
      <Asset.Image
        src={checkFillIcon}
        frameShape={{ width: 100, height: 100 }}
        scaleType="fit"
        alt=""
        backgroundColor="transparent"
      />
      <Text
        typography="t3"
        fontWeight="bold"
        color={colors.grey800}
        style={{ textAlign: "center" }}
      >
        투표를 완료했어요
      </Text>
      <Text
        typography="t5"
        color={colors.grey500}
        style={{ textAlign: "center" }}
      >
        {`투표 진행 중 ( ${votedCount} / ${totalCount} )`}
      </Text>
    </div>
  );
}
