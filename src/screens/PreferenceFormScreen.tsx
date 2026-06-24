import { useState, type ReactNode } from "react";
import { colors } from "@toss/tds-colors";
import {
  Asset,
  BottomCTA,
  Button,
  List,
  ListRow,
  ProgressBar,
  Top,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { ALCOHOL_OPTIONS, type Alcohol } from "../types";
import { AlcoholSelectSheet } from "./AlcoholSelectSheet";
import { BudgetSelectSheet } from "./BudgetSelectSheet";
import { MoodSelectSheet } from "./MoodSelectSheet";

// F-05~08 참여자 취향 입력 폼. 술자리/예산/음식 취향/분위기 4가지 항목.
// 술자리/예산/분위기 → 해당 바텀시트 overlay (호스트 CreateMeetingScreen 과 같은 패턴).
// 음식 취향만 → 별도 전체 화면(FoodSelectScreen) 으로 전환 (8개 카테고리 그리드라 시트엔 안 들어감).
// figma 시안 2/4/6/9 (빈/술자리/예산까지/음식까지) state 는 모두 이 한 컴포넌트가 store 로 자동 처리.
type OpenSheet = "alcohol" | "budget" | "mood" | null;

const ALCOHOL_LABELS: Record<Alcohol, string> = Object.fromEntries(
  ALCOHOL_OPTIONS.map((o) => [o.id, o.label]),
) as Record<Alcohol, string>;

export function PreferenceFormScreen() {
  const { participant, back, goto } = useApp();
  const [openSheet, setOpenSheet] = useState<OpenSheet>(null);

  const filledCount = [
    participant.alcohol,
    participant.budgetMin, // 예산은 min/max 두 필드지만 한 항목으로 카운트
    participant.foods.length > 0 ? "x" : null,
    participant.mood,
  ].filter((v) => v != null).length;
  const progress = filledCount / 4;
  const isComplete = filledCount === 4;

  const closeSheet = () => setOpenSheet(null);

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
      <div style={{ padding: "5px 10px" }}>
        <ProgressBar progress={progress} size="light" />
      </div>

      <Top
        title={
          <Top.TitleParagraph size={22}>취향을 알려주세요</Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph size={17}>
            고른 조건으로 갈 만한 식당을 찾아드려요
          </Top.SubtitleParagraph>
        }
      />

      <List>
        <PreferenceFieldRow
          icon="🍺"
          label="술자리"
          value={
            participant.alcohol ? ALCOHOL_LABELS[participant.alcohol] : null
          }
          onClick={() => setOpenSheet("alcohol")}
        />
        <PreferenceFieldRow
          icon="💰"
          label="예산"
          value={formatBudget(
            participant.budgetMin,
            participant.budgetMax,
          )}
          onClick={() => setOpenSheet("budget")}
        />
        <PreferenceFieldRow
          icon="🍚"
          label="음식 취향"
          value={
            participant.foods.length > 0
              ? participant.foods.join(", ")
              : null
          }
          // 음식만 시트가 아니라 화면 전환 (FoodSelectScreen).
          onClick={() => goto("q-food")}
        />
        <PreferenceFieldRow
          icon="🏪"
          label="분위기"
          value={participant.mood ?? null}
          onClick={() => setOpenSheet("mood")}
        />
      </List>

      <div style={{ marginTop: "auto" }}>
        <BottomCTA.Double
          leftButton={
            <Button
              color="dark"
              variant="weak"
              size="xlarge"
              display="block"
              onClick={back}
            >
              이전
            </Button>
          }
          rightButton={
            <Button
              color="primary"
              variant="fill"
              size="xlarge"
              display="block"
              disabled={!isComplete}
              onClick={() => goto("q-done")}
            >
              저장
            </Button>
          }
        />
      </div>

      {/* 시트 overlay — 호스트 CreateMeetingScreen 과 동일한 패턴.
          음식은 시트가 아니라 화면 전환이라 여기 없음 (goto("q-food") 에서 처리). */}
      {openSheet === "alcohol" && <AlcoholSelectSheet onClose={closeSheet} />}
      {openSheet === "budget" && <BudgetSelectSheet onClose={closeSheet} />}
      {openSheet === "mood" && <MoodSelectSheet onClose={closeSheet} />}
    </div>
  );
}

function formatBudget(
  min: number | undefined,
  max: number | undefined,
): string | null {
  if (min == null || max == null) return null;
  // 단순 표시 — "10000원 ~ 25000원" 같은 식. 실제 백엔드 전달은 min/max 그대로.
  return `${(min / 10000).toFixed(0)}만원 ~ ${(max / 10000).toFixed(0)}만원`;
}

function EmojiIcon({ children }: { children: string }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        lineHeight: 1,
      }}
    >
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <Asset.Icon
      name="icon-check-mono"
      color={colors.blue500}
      frameShape={{ width: 24, height: 24 }}
      backgroundColor="transparent"
    />
  );
}

function PreferenceFieldRow({
  icon,
  label,
  value,
  onClick,
}: {
  icon: string;
  label: string;
  value: string | null;
  onClick: () => void;
}): ReactNode {
  const filled = value != null;
  return (
    <ListRow
      left={<EmojiIcon>{icon}</EmojiIcon>}
      contents={
        filled ? (
          <ListRow.Texts type="2RowTypeB" top={label} bottom={value!} />
        ) : (
          <ListRow.Texts type="1RowTypeB" top={label} />
        )
      }
      right={filled ? <CheckIcon /> : undefined}
      withArrow={!filled}
      onClick={onClick}
    />
  );
}
