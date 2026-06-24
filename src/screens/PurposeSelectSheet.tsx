import { useState } from "react";
import { colors } from "@toss/tds-colors";
import { Asset, BottomSheet, List, ListRow } from "@toss/tds-mobile";
import { useApp } from "../store";
import type { Purpose } from "../types";
import { getPortalRoot } from "../lib/portal";
import { SheetDoubleCTA } from "../components/SheetDoubleCTA";

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
  // 시안(06)처럼 유일한 활성 옵션인 "친구들과의 모임"을 기본 선택해 둔다.
  // (MVP는 친구 모임 목적만 활성 — CLAUDE.md)
  const [selected, setSelected] = useState<Purpose | null>(
    meeting.purpose ?? "친구들과의 모임",
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
        <SheetDoubleCTA
          onClose={onClose}
          onNext={handleNext}
          nextDisabled={selected == null}
        />
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
