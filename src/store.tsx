import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Alcohol,
  FoodCategory,
  Mood,
  Purpose,
  RegionId,
  ScreenId,
} from "./types";

interface MeetingForm {
  purpose?: Purpose;
  minMembers?: number;
  regionId?: RegionId;
  station?: string;
  deadline?: string;
}

interface ParticipantForm {
  alcohol?: Alcohol;
  budgetMin: number;
  budgetMax: number;
  foods: FoodCategory[];
  mood?: Mood;
}

interface AppState {
  screen: ScreenId;
  goto: (s: ScreenId) => void;
  back: () => void;
  meeting: MeetingForm;
  participant: ParticipantForm;
  patchMeeting: (patch: Partial<MeetingForm>) => void;
  patchParticipant: (patch: Partial<ParticipantForm>) => void;
  voted: string | null;
  setVoted: (id: string | null) => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>("intro");
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [meeting, setMeeting] = useState<MeetingForm>({});
  const [participant, setParticipant] = useState<ParticipantForm>({
    budgetMin: 20000,
    budgetMax: 40000,
    foods: [],
  });
  const [voted, setVoted] = useState<string | null>(null);

  const goto = useCallback(
    (s: ScreenId) => {
      setHistory((h) => [...h, screen]);
      setScreen(s);
    },
    [screen],
  );

  const back = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      setScreen(h[h.length - 1]);
      return h.slice(0, -1);
    });
  }, []);

  const patchMeeting = useCallback(
    (patch: Partial<MeetingForm>) => setMeeting((prev) => ({ ...prev, ...patch })),
    [],
  );
  const patchParticipant = useCallback(
    (patch: Partial<ParticipantForm>) =>
      setParticipant((prev) => ({ ...prev, ...patch })),
    [],
  );

  const value = useMemo<AppState>(
    () => ({
      screen,
      goto,
      back,
      meeting,
      participant,
      patchMeeting,
      patchParticipant,
      voted,
      setVoted,
    }),
    [screen, goto, back, meeting, participant, patchMeeting, patchParticipant, voted],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}
