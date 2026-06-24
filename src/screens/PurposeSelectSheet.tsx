import { useState } from "react";
import { colors } from "@toss/tds-colors";
import {
  Asset,
  BottomSheet,
  CTAButton,
  List,
  ListRow,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import type { Purpose } from "../types";
import { getPortalRoot } from "../lib/portal";

// F-01 모임 목적 선택 바텀시트. CreateMeetingScreen의 "모임 목적" 행을 누르면 열림.
// MVP는 "친구들과의 모임"만 활성, 나머지 3개는 시안엔 있지만 비활성("준비중")으로 둔다 (CLAUDE.md).
const PURPOSE_OPTIONS: { id: Purpose; disabled?: boolean }[] = [
  { id: "친구들과의 모임" },
  { id: "연인과의 데이트", disabled: true },
  { id: "부모님과의 식사", disabled: true },
  { id: "기타", disabled: true },
];

interface Props {
  onClose: () => void;
}

export function PurposeSelectSheet({ onClose }: Props) {
  const { patchMeeting, meeting } = useApp();
  const [selected, setSelected] = useState<Purpose | null>(
    meeting.purpose ?? null,
  );

  function handleNext() {
    if (!selected) return;
    patchMeeting({ purpose: selected });
    onClose();
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      portalContainer={getPortalRoot()}
      header={<BottomSheet.Header>모임 목적</BottomSheet.Header>}
      cta={
        <BottomSheet.DoubleCTA>
          <CTAButton color="dark" variant="weak" onClick={onClose}>
            닫기
          </CTAButton>
          <CTAButton
            color="primary"
            disabled={selected == null}
            onClick={handleNext}
          >
            다음
          </CTAButton>
        </BottomSheet.DoubleCTA>
      }
    >
      <List>
        {PURPOSE_OPTIONS.map(({ id, disabled }) => (
          <ListRow
            key={id}
            disabled={disabled}
            contents={<ListRow.Texts type="1RowTypeA" top={id} />}
            right={
              selected === id ? (
                <Asset.Icon
                  name="icon-check-mono"
                  color={colors.blue500}
                  frameShape={{ width: 24, height: 24 }}
                  backgroundColor="transparent"
                />
              ) : undefined
            }
            onClick={() => !disabled && setSelected(id)}
          />
        ))}
      </List>
    </BottomSheet>
  );
}
