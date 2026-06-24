import "./App.css";
import { AppProvider, useApp } from "./store";
import { NavBar } from "./components/NavBar";
import { IntroScreen } from "./screens/IntroScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { LoginConsentScreen } from "./screens/LoginConsentScreen";
import { InviteInputScreen } from "./screens/InviteInputScreen";
import { CreateMeetingScreen } from "./screens/CreateMeetingScreen";
import { InviteGeneratedScreen } from "./screens/InviteGeneratedScreen";
import { VoteWaitingScreen } from "./screens/VoteWaitingScreen";
import { VoteInfoActiveScreen } from "./screens/VoteInfoActiveScreen";
import { VoteInfoClosedScreen } from "./screens/VoteInfoClosedScreen";
import { ParticipantIntroScreen } from "./screens/ParticipantIntroScreen";
import { PreferenceFormScreen } from "./screens/PreferenceFormScreen";
import { FoodSelectScreen } from "./screens/FoodSelectScreen";
import { VoteSentWaitingScreen } from "./screens/VoteSentWaitingScreen";
import { AllSettledScreen } from "./screens/AllSettledScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { RelaxedScreen } from "./screens/RelaxedScreen";
import { SortSelectScreen } from "./screens/SortSelectScreen";
import { VoteScreen } from "./screens/VoteScreen";
import { SecondVoteWaitingScreen } from "./screens/SecondVoteWaitingScreen";
import { VoteCountingScreen } from "./screens/VoteCountingScreen";
import { FinalResultScreen } from "./screens/FinalResultScreen";

// 데모 플래그 — URL 에 ?relaxed 가 있으면 추천 로딩(33) 후 조건완화 공지(34)를 거치게 한다.
// 실제로는 백엔드가 후보 0개를 판정해 분기하지만, 연동 전이라 분기를 눈으로 확인할 수단.
const RELAX_DEMO =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("relaxed");

// 화면 라우팅. 화면 자체는 dumb (props 로 핸들러 받음) — goto 결정은 여기 한곳에서.
//
// 호스트 흐름:
//   intro → welcome → login-consent → create-meeting (시트 overlay)
//   → invite-generated → wait-others → vote(=VoteInfoActive) → vote-info-closed
//
// 참여자 흐름:
//   welcome ─(이미 초대 링크 있음)→ invite-input → participant-onboarding
//   → q-hub(=PreferenceForm, 시트 overlay) ─음식─→ q-food → (back) → q-hub
//   → q-done(=VoteSentWaiting) → all-done(=AllSettled) → finding(=Loading)
//   → sort-select → vote-candidates(=Vote) → second-vote-waiting → vote-counting
//   → final-result
function ScreenRouter() {
  const { screen, goto, sort, setSort, setVoted } = useApp();
  return (
    <div className="screen-body">
      {screen === "intro" && <IntroScreen />}
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "login-consent" && <LoginConsentScreen />}
      {screen === "invite-input" && <InviteInputScreen />}
      {screen === "create-meeting" && <CreateMeetingScreen />}
      {screen === "invite-generated" && <InviteGeneratedScreen />}
      {screen === "wait-others" && <VoteWaitingScreen />}
      {screen === "vote" && <VoteInfoActiveScreen />}
      {screen === "vote-info-closed" && <VoteInfoClosedScreen />}

      {/* 참여자 흐름 */}
      {screen === "participant-onboarding" && <ParticipantIntroScreen />}
      {screen === "q-hub" && <PreferenceFormScreen />}
      {screen === "q-food" && <FoodSelectScreen />}
      {screen === "q-done" && (
        <VoteSentWaitingScreen
          votedCount={1}
          totalCount={4}
          onConfirm={() => goto("all-done")}
        />
      )}
      {screen === "all-done" && (
        <AllSettledScreen onComplete={() => goto("finding")} />
      )}
      {/* F-10 추천 로딩(33). 후보가 충분하면 정렬 기준 선택(35)으로 직행,
          후보 부족(조건완화)이면 공지 화면(34)을 거친다.
          백엔드 연동 전이라 분기는 데모 플래그(?relaxed)로 흉내낸다 — RELAX_DEMO 참고. */}
      {screen === "finding" && (
        <LoadingScreen
          onComplete={() => goto(RELAX_DEMO ? "relaxed" : "sort-select")}
        />
      )}
      {/* F-11 조건완화 공지(34). "추천 결과 보기" → 정렬 기준 선택(35). */}
      {screen === "relaxed" && (
        <RelaxedScreen onConfirm={() => goto("sort-select")} />
      )}
      {screen === "sort-select" && (
        <SortSelectScreen
          onConfirm={(s) => {
            setSort(s);
            goto("vote-candidates");
          }}
        />
      )}
      {screen === "vote-candidates" && (
        <VoteScreen
          sort={sort}
          onVote={(id) => {
            setVoted(id);
            goto("second-vote-waiting");
          }}
        />
      )}
      {screen === "second-vote-waiting" && (
        <SecondVoteWaitingScreen
          votedCount={1}
          totalCount={3}
          onComplete={() => goto("vote-counting")}
        />
      )}
      {screen === "vote-counting" && (
        <VoteCountingScreen onComplete={() => goto("final-result")} />
      )}
      {screen === "final-result" && (
        <FinalResultScreen
          onShare={() => console.log("[final-result] 공유하기 (미연결)")}
          onShowMap={(id) =>
            console.log("[final-result] 지도 보기 — place_id:", id)
          }
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <NavBar />
      <ScreenRouter />
    </AppProvider>
  );
}

export default App;
