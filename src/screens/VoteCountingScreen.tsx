import { useEffect } from "react";
import { colors } from "@toss/tds-colors";
import { Asset, Text } from "@toss/tds-mobile";
import checkFillIcon from "../assets/check-fill-circle.svg";

// 전원이 후보 투표를 마쳤고 최종 1위 장소를 집계하는 잠깐의 안내 화면.
// App.tsx에서 finalize API 호출 후 onComplete(goto final-result)를 실행한다.
// 화면 진입 시 onComplete를 즉시 실행해 finalize → 결과 화면으로 넘어간다.

interface Props {
  onComplete?: () => void;
}

export function VoteCountingScreen({ onComplete }: Props) {
  useEffect(() => {
    if (onComplete) onComplete();
  // onComplete는 App.tsx에서 finalize 호출 후 goto("final-result")를 실행하는 async 함수.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Text
        typography="t3"
        fontWeight="bold"
        color={colors.grey800}
        style={{ textAlign: "center" }}
      >
        투표가 완료되었어요
      </Text>
      <Text
        typography="t5"
        color={colors.grey500}
        style={{ textAlign: "center" }}
      >
        장소 선정 중
      </Text>
    </div>
  );
}
