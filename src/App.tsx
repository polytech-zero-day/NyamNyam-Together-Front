import "./App.css";
import { AppProvider, useApp } from "./store";
import { NavBar } from "./components/NavBar";
import { IntroScreen } from "./screens/IntroScreen";
import { LoginConsentScreen } from "./screens/LoginConsentScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { ParticipantOnboardingScreen } from "./screens/ParticipantOnboardingScreen";
import { CreateMeetingScreen } from "./screens/CreateMeetingScreen";
import { InviteGeneratedScreen } from "./screens/InviteGeneratedScreen";
import { InviteInputScreen } from "./screens/InviteInputScreen";
import { TasteHubScreen } from "./screens/TasteHubScreen";
import { FoodScreen } from "./screens/FoodScreen";
import { DoneScreen } from "./screens/DoneScreen";
import { AllDoneScreen } from "./screens/AllDoneScreen";
import { WaitScreen } from "./screens/WaitScreen";
import { FindingScreen } from "./screens/FindingScreen";
import { RelaxedScreen } from "./screens/RelaxedScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { VoteScreen } from "./screens/VoteScreen";

function ScreenSwitcher() {
  const { screen } = useApp();
  switch (screen) {
    case "intro":
      return <IntroScreen />;
    case "login-consent":
      return <LoginConsentScreen />;
    case "onboarding":
      return <OnboardingScreen />;
    case "participant-onboarding":
      return <ParticipantOnboardingScreen />;
    case "create-meeting":
      return <CreateMeetingScreen />;
    case "invite-generated":
      return <InviteGeneratedScreen />;
    case "invite-input":
      return <InviteInputScreen />;
    case "q-hub":
      return <TasteHubScreen />;
    case "q-food":
      return <FoodScreen />;
    case "q-done":
      return <DoneScreen />;
    case "wait-others":
      return <WaitScreen />;
    case "all-done":
      return <AllDoneScreen />;
    case "finding":
      return <FindingScreen />;
    case "relaxed":
      return <RelaxedScreen />;
    case "progress":
      return <ProgressScreen />;
    case "vote":
      return <VoteScreen />;
    default:
      return <IntroScreen />;
  }
}

function App() {
  return (
    <AppProvider>
      <NavBar />
      <div className="screen-body">
        <ScreenSwitcher />
      </div>
    </AppProvider>
  );
}

export default App;
