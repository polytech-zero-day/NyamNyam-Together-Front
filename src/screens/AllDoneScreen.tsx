import { Button } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useApp } from "../store";
import { SuccessCheckCircle } from "../components/SuccessCheckCircle";

// 전원 취향 입력 완료 (마지마 인원 투표 완료). "추천 식당 보기" → 추천 로딩(finding).
export function AllDoneScreen() {
  const { goto } = useApp();

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
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <SuccessCheckCircle />
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: colors.grey900,
            letterSpacing: "-0.02em",
          }}
        >
          모두 다 골랐어요!
        </h1>
        <p style={{ marginTop: 10, fontSize: 15, color: colors.grey600 }}>
          이제 딱 맞는 식당을 찾아볼게요
        </p>
      </div>

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={() => goto("finding")}
      >
        추천 식당 보기
      </Button>
    </div>
  );
}
