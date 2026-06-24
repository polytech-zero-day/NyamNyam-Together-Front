import { Asset, BottomCTA, Stepper, StepperRow, Top } from "@toss/tds-mobile";
import { useApp } from "../store";

// F-04 참여자 인트로. 초대 링크로 들어온 참여자에게 흐름을 안내한다.
// "투표하기" → PreferenceFormScreen (취향 입력).
// 호스트 IntroScreen 과 시각 구조는 같지만 stepper 문구가 참여자 관점("골라요/추천받아요/투표하세요")으로 다르다.
export function ParticipantIntroScreen() {
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
      <Top
        title={
          <Top.TitleParagraph size={22}>
            {`어디서 먹을지,\n3~4 곳으로 좁혀드려요`}
          </Top.TitleParagraph>
        }
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px 0 40px",
        }}
      >
        <Asset.Icon
          name="icon-calendar-timetable"
          frameShape={{ width: 250, height: 250 }}
          backgroundColor="transparent"
        />
      </div>

      <Stepper>
        <StepperRow
          left={<StepperRow.NumberIcon number={1} />}
          center={
            <StepperRow.Texts
              type="A"
              title="술·예산·음식·분위기를 골라요"
            />
          }
        />
        <StepperRow
          left={<StepperRow.NumberIcon number={2} />}
          center={
            <StepperRow.Texts
              type="A"
              title="딱 맞는 식당 3~4곳을 추천받아요"
            />
          }
        />
        <StepperRow
          hideLine
          left={<StepperRow.NumberIcon number={3} />}
          center={
            <StepperRow.Texts
              type="A"
              title="마음에 드는 곳에 투표하세요"
            />
          }
        />
      </Stepper>

      <div style={{ marginTop: "auto" }}>
        <BottomCTA.Single onClick={() => goto("q-hub")}>
          투표하기
        </BottomCTA.Single>
      </div>
    </div>
  );
}
