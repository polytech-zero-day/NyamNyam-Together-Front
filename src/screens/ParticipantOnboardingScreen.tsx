import { Asset, Button } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useApp } from "../store";
import { StepRow, Connector } from "../components/StepGuide";

// F-04 참여자 온보딩 (초대 링크 ?groupId= 로 입장한 참여자의 진입 화면)
// 시안: docs/screens/F-04_참여자온보딩.png
export function ParticipantOnboardingScreen() {
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
          color: colors.grey900,
          letterSpacing: "-0.02em",
        }}
      >
        어디서 먹을지, 3~4 곳으로
        <br />
        좁혀드려요.
      </h1>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* TODO(asset): 임시 placeholder 일러스트. public/participant-onboarding.svg 를
            시안의 최종 3D 일러스트로 교체하세요. */}
        <Asset.Image
          src="/participant-onboarding.svg"
          frameShape={{ width: 280, height: 220 }}
          scaleType="fit"
          backgroundColor="transparent"
          alt="식당 추천 안내 일러스트"
        />
      </div>

      <div style={{ marginTop: 36 }}>
        <StepRow num={1} text="술·예산·음식·분위기를 골라요" />
        <Connector />
        <StepRow num={2} text="딱 맞는 식당 3~4곳을 추천받아요" />
        <Connector />
        <StepRow num={3} text="마음에 드는 곳에 투표해요" />
      </div>

      <div style={{ flex: 1 }} />

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={() => goto("q-hub")}
      >
        투표하기
      </Button>
    </div>
  );
}
