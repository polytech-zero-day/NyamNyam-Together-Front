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
      {screen === "finding" && (
        <LoadingScreen onComplete={() => goto("sort-select")} />
      )}
      {/* F-11 분기 화면. 백엔드가 0개 판정 시만 진입(데모는 미연결).
          진입 경로 확보 차원에서 라우팅만 두고, 자동 분기는 아직 없음. */}
      {screen === "relaxed" && (
        <RelaxedScreen onConfirm={() => goto("vote-candidates")} />
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
