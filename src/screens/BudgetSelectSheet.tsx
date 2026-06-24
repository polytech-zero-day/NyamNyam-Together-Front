import { useState } from "react";
import {
  BottomSheet,
  Checkbox,
  CTAButton,
  List,
  ListRow,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { BUDGET_TIERS, type BudgetTierLabel } from "../types";
import { getPortalRoot } from "../lib/portal";

// F-06 예산 선택 (구간 다중선택 → min/max 환산).
// CLAUDE.md 3.3 / A안: 벌어진 선택(예: "1만 이하" + "3~4만")도 중간 구간을 포함한 하나의 연속 범위로
// 본다. 환산 식 = min(선택구간들의 하한), max(선택구간들의 상한).
interface Props {
  onClose: () => void;
}

// 현재 store 의 budgetMin / budgetMax 로부터 어떤 라벨들이 선택돼 있는지 역산.
// 완벽 역산은 어려우니(같은 min/max 결과를 만드는 조합이 여러 개), 단순히
// 저장된 [min, max] 와 겹치는 모든 구간을 다시 켜준다.
function deriveInitialSelected(
  budgetMin: number | undefined,
  budgetMax: number | undefined,
): Set<BudgetTierLabel> {
  const selected = new Set<BudgetTierLabel>();
  if (budgetMin == null || budgetMax == null) return selected;
  for (const tier of BUDGET_TIERS) {
    // 구간이 저장된 범위와 겹치면 선택된 것으로 간주.
    if (tier.max > budgetMin && tier.min < budgetMax) {
      selected.add(tier.label);
    }
  }
  return selected;
}

export function BudgetSelectSheet({ onClose }: Props) {
  const { participant, patchParticipant } = useApp();
  const [selected, setSelected] = useState<Set<BudgetTierLabel>>(() =>
    deriveInitialSelected(participant.budgetMin, participant.budgetMax),
  );

  function toggle(label: BudgetTierLabel) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function handleNext() {
    if (selected.size === 0) return;
    // A안: 선택된 구간들의 최저 하한 = min, 최고 상한 = max.
    //      벌어진 선택도 중간 구간 포함 연속 범위로 본다.
    const tiers = BUDGET_TIERS.filter((t) => selected.has(t.label));
    const min = Math.min(...tiers.map((t) => t.min));
    const max = Math.max(...tiers.map((t) => t.max));
    patchParticipant({ budgetMin: min, budgetMax: max });
    onClose();
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      portalContainer={getPortalRoot()}
      header={<BottomSheet.Header>예산</BottomSheet.Header>}
      headerDescription={
        <BottomSheet.HeaderDescription>
          1인당 얼마쯤 생각해요? 중복선택 가능해요
        </BottomSheet.HeaderDescription>
      }
      cta={
        <BottomSheet.DoubleCTA>
          <CTAButton color="dark" variant="weak" onClick={onClose}>
            닫기
          </CTAButton>
          <CTAButton
            color="primary"
            disabled={selected.size === 0}
            onClick={handleNext}
          >
            다음
          </CTAButton>
        </BottomSheet.DoubleCTA>
      }
    >
      <List>
        {BUDGET_TIERS.map((tier) => {
          const checked = selected.has(tier.label);
          return (
            <ListRow
              key={tier.label}
              contents={<ListRow.Texts type="1RowTypeA" top={tier.label} />}
              right={
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(tier.label)}
                />
              }
              onClick={() => toggle(tier.label)}
            />
          );
        })}
      </List>
    </BottomSheet>
  );
}
