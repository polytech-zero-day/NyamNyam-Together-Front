import { useEffect } from "react";
import { colors } from "@toss/tds-colors";
import { Asset } from "@toss/tds-mobile";
import checkFillIcon from "../assets/check-fill-circle.png";

// 전원이 후보 투표를 마쳤고 최종 1위 장소를 집계하는 잠깐의 안내 화면.
// 참여자 액션 없이 자동으로 FinalResultScreen 으로 전환된다.
// AllSettledScreen 과 동일 패턴 — 시점/문구만 다름(취향 입력 후 / 후보 투표 후).
const AUTO_ADVANCE_MS = 1500;

interface Props {
  onComplete?: () => void;
}

export function VoteCountingScreen({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (onComplete) onComplete();
      else console.log("[vote-counting] onComplete 미연결");
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
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
        cursor: onComplete ? "pointer" : "default",
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
          margin: 0,
          textAlign: "center",
        }}
      >
        투표가 완료되었어요
      </p>
      <p
        style={{
          fontSize: 16,
          color: colors.grey500,
          margin: 0,
          textAlign: "center",
        }}
      >
        장소 선정 중
      </p>
    </div>
  );
}
