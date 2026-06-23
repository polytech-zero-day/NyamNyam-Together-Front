import { Button } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useApp } from "../store";
import { SuccessCheckCircle } from "../components/SuccessCheckCircle";

// 취향 제출 완료 (사용자_투표_11). "확인했어요" → 기존 추천 로딩 흐름(progress→finding→vote).
export function DoneScreen() {
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
          취향을 보냈어요!
        </h1>
        <p style={{ marginTop: 10, fontSize: 15, color: colors.grey600 }}>
          친구들이 다 보내면 식당을 추천해드려요
        </p>
      </div>

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={() => goto("progress")}
      >
        확인했어요
      </Button>
    </div>
  );
}
