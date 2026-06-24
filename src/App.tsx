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

// 호스트 흐름:
//   intro → welcome → login-consent → create-meeting
//                                  ↳ invite-input (참여자 흐름은 미연결)
//   create-meeting (목적/인원/위치/마감 시트 overlay) → invite-generated
//   → wait-others → vote(=VoteInfoActive) → vote-info-closed
function ScreenRouter() {
  const { screen } = useApp();
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
