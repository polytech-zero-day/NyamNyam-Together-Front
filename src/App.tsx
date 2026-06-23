import "./App.css";
import { AppProvider, useApp } from "./store";
import { NavBar } from "./components/NavBar";
import { IntroScreen } from "./screens/IntroScreen";
import { LoginConsentScreen } from "./screens/LoginConsentScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { CreateMeetingScreen } from "./screens/CreateMeetingScreen";
import { InviteGeneratedScreen } from "./screens/InviteGeneratedScreen";
import { InviteInputScreen } from "./screens/InviteInputScreen";
import { AlcoholScreen } from "./screens/AlcoholScreen";
import { BudgetScreen } from "./screens/BudgetScreen";
import { FoodScreen } from "./screens/FoodScreen";
import { MoodScreen } from "./screens/MoodScreen";
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
    case "create-meeting":
      return <CreateMeetingScreen />;
    case "invite-generated":
      return <InviteGeneratedScreen />;
    case "invite-input":
      return <InviteInputScreen />;
    case "q-alcohol":
      return <AlcoholScreen />;
    case "q-budget":
      return <BudgetScreen />;
    case "q-food":
      return <FoodScreen />;
    case "q-mood":
      return <MoodScreen />;
    case "wait-others":
      return <WaitScreen />;
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
