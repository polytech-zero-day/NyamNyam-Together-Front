import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { CalendarPeopleIcon } from "../components/icons";
import { StepRow, Connector } from "../components/StepGuide";

export function OnboardingScreen() {
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
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          lineHeight: 1.35,
          color: "#191F28",
          letterSpacing: "-0.02em",
        }}
      >
        어디서 먹을지,
        <br />
        3~4 곳으로 좁혀드려요
      </h1>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CalendarPeopleIcon size={210} />
      </div>

      <div style={{ marginTop: 36 }}>
        <StepRow num={1} text="모임 조건을 정하고 친구들을 초대해요" />
        <Connector />
        <StepRow num={2} text="각자 술·예산·음식·분위기를 골라요" />
        <Connector />
        <StepRow num={3} text="딱 맞는 식당 3~4 곳에 투표해요" />
      </div>

      <div style={{ flex: 1 }} />

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={() => goto("create-meeting")}
      >
        다음
      </Button>
    </div>
  );
}
