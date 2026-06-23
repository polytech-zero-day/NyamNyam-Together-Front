import { useState } from "react";
import {
  Asset,
  BottomSheet,
  Button,
  CTAButton,
  ListRow,
  ProgressBar,
} from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useApp } from "../store";
import {
  ALCOHOL_OPTIONS,
  BUDGET_TIERS,
  MOOD_OPTIONS,
  type Alcohol,
  type BudgetTierLabel,
  type Mood,
} from "../types";

// F-05~F-08 취향 입력 허브 (사용자_투표_1/3/5/8/10)
// 4개 조건(술자리·예산·음식 취향·분위기)을 모아 입력받는 진입 화면.
// - 술자리/예산/분위기 → 바텀시트 단일선택
// - 음식 취향 → 풀스크린 그리드(q-food)로 이동
export function TasteHubScreen() {
  const { participant, patchParticipant, goto, back } = useApp();

  const [openSheet, setOpenSheet] = useState<
    null | "alcohol" | "budget" | "mood"
  >(null);
  const [draftAlcohol, setDraftAlcohol] = useState<Alcohol | undefined>();
  const [draftBudget, setDraftBudget] = useState<BudgetTierLabel | undefined>();
  const [draftMood, setDraftMood] = useState<Mood | undefined>();

  // 채워진 상태 판정
  const budgetTier = BUDGET_TIERS.find(
    (t) => t.min === participant.budgetMin && t.max === participant.budgetMax,
  );
  const alcoholSet = participant.alcohol != null;
  const budgetSet = budgetTier != null;
  const foodsSet = participant.foods.length > 0;
  const moodSet = participant.mood != null;
  const filledCount = [alcoholSet, budgetSet, foodsSet, moodSet].filter(
    Boolean,
  ).length;
  const allFilled = filledCount === 4;

  // 요약 문구
  const alcoholSummary = ALCOHOL_OPTIONS.find(
    (o) => o.id === participant.alcohol,
  )?.label;
  const budgetSummary = budgetTier?.label;
  const foodsSummary = participant.foods.join(", ");
  const moodSummary = participant.mood;

  const close = () => setOpenSheet(null);
  const openAlcohol = () => {
    setDraftAlcohol(participant.alcohol);
    setOpenSheet("alcohol");
  };
  const openBudget = () => {
    setDraftBudget(budgetTier?.label);
    setOpenSheet("budget");
  };
  const openMood = () => {
    setDraftMood(participant.mood);
    setOpenSheet("mood");
  };

  const commitAlcohol = () => {
    if (draftAlcohol != null) patchParticipant({ alcohol: draftAlcohol });
    close();
  };
  const commitBudget = () => {
    const tier = BUDGET_TIERS.find((t) => t.label === draftBudget);
    if (tier) patchParticipant({ budgetMin: tier.min, budgetMax: tier.max });
    close();
  };
  const commitMood = () => {
    if (draftMood != null) patchParticipant({ mood: draftMood });
    close();
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <ProgressBar progress={filledCount / 4} size="normal" />

      <div style={{ padding: "20px 24px 0" }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: colors.grey900,
            letterSpacing: "-0.02em",
          }}
        >
          취향을 알려주세요
        </h1>
        <p style={{ marginTop: 8, fontSize: 15, color: colors.grey600 }}>
          고른 조건으로 갈 만한 식당을 찾아드려요.
        </p>
      </div>

      <div style={{ marginTop: 12 }}>
        <HubRow
          emoji="🍺"
          label="술자리"
          summary={alcoholSet ? alcoholSummary : undefined}
          onClick={openAlcohol}
        />
        <HubRow
          emoji="💳"
          label="예산"
          summary={budgetSet ? budgetSummary : undefined}
          onClick={openBudget}
        />
        <HubRow
          emoji="🍴"
          label="음식 취향"
          summary={foodsSet ? foodsSummary : undefined}
          onClick={() => goto("q-food")}
        />
        <HubRow
          emoji="👥"
          label="분위기"
          summary={moodSet ? moodSummary : undefined}
          onClick={openMood}
        />
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "0 24px 32px" }}>
        {allFilled ? (
          <Button
            color="primary"
            variant="fill"
            size="xlarge"
            display="block"
            onClick={() => goto("q-done")}
          >
            투표하기
          </Button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <Button
                color="dark"
                variant="weak"
                size="xlarge"
                display="block"
                onClick={back}
              >
                이전
              </Button>
            </div>
            <div style={{ flex: 1 }}>
              <Button
                color="primary"
                variant="fill"
                size="xlarge"
                display="block"
                disabled
                onClick={() => goto("q-done")}
              >
                다음
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 술자리 (F-05 3지선다) */}
      <BottomSheet
        open={openSheet === "alcohol"}
        onClose={close}
        header={<BottomSheet.Header>술자리</BottomSheet.Header>}
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <CTAButton color="dark" variant="weak" onClick={close}>
                닫기
              </CTAButton>
            }
            rightButton={
              <CTAButton
                color="primary"
                disabled={draftAlcohol == null}
                onClick={commitAlcohol}
              >
                다음
              </CTAButton>
            }
          />
        }
      >
        <BottomSheet.Select
          value={draftAlcohol}
          onChange={(e) => setDraftAlcohol(e.target.value as Alcohol)}
          options={ALCOHOL_OPTIONS.map((o) => ({
            name: o.label,
            value: o.id,
            hideUnCheckedCheckBox: true,
          }))}
        />
      </BottomSheet>

      {/* 예산 */}
      <BottomSheet
        open={openSheet === "budget"}
        onClose={close}
        header={<BottomSheet.Header>예산</BottomSheet.Header>}
        headerDescription={
          <BottomSheet.HeaderDescription>
            1인당 얼마쯤 생각해요?
          </BottomSheet.HeaderDescription>
        }
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <CTAButton color="dark" variant="weak" onClick={close}>
                닫기
              </CTAButton>
            }
            rightButton={
              <CTAButton
                color="primary"
                disabled={draftBudget == null}
                onClick={commitBudget}
              >
                다음
              </CTAButton>
            }
          />
        }
      >
        <BottomSheet.Select
          value={draftBudget}
          onChange={(e) => setDraftBudget(e.target.value as BudgetTierLabel)}
          options={BUDGET_TIERS.map((t) => ({
            name: t.label,
            value: t.label,
            hideUnCheckedCheckBox: true,
          }))}
        />
      </BottomSheet>

      {/* 분위기 (F-08) */}
      <BottomSheet
        open={openSheet === "mood"}
        onClose={close}
        header={<BottomSheet.Header>분위기</BottomSheet.Header>}
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <CTAButton color="dark" variant="weak" onClick={close}>
                닫기
              </CTAButton>
            }
            rightButton={
              <CTAButton
                color="primary"
                disabled={draftMood == null}
                onClick={commitMood}
              >
                다음
              </CTAButton>
            }
          />
        }
      >
        <BottomSheet.Select
          value={draftMood}
          onChange={(e) => setDraftMood(e.target.value as Mood)}
          options={MOOD_OPTIONS.map((m) => ({
            name: m,
            value: m,
            hideUnCheckedCheckBox: true,
          }))}
        />
      </BottomSheet>
    </div>
  );
}

function HubRow({
  emoji,
  label,
  summary,
  onClick,
}: {
  emoji: string;
  label: string;
  summary?: string;
  onClick: () => void;
}) {
  const filled = summary != null;
  return (
    <ListRow
      onClick={onClick}
      withTouchEffect
      withArrow={!filled}
      border="none"
      verticalPadding="large"
      left={
        <span style={{ fontSize: 22 }} aria-hidden>
          {emoji}
        </span>
      }
      contents={
        <div>
          <div
            style={{ fontSize: 16, fontWeight: 600, color: colors.grey900 }}
          >
            {label}
          </div>
          {filled && (
            <div
              style={{ marginTop: 2, fontSize: 13, color: colors.grey500 }}
            >
              {summary}
            </div>
          )}
        </div>
      }
      right={
        filled ? (
          <Asset.Icon
            name="icon-check-mono"
            color={colors.blue500}
            frameShape={{ width: 24, height: 24 }}
            backgroundColor="transparent"
            aria-hidden
          />
        ) : undefined
      }
    />
  );
}
