import { useState } from "react";
import { colors } from "@toss/tds-colors";
import { Asset, BottomSheet, List, ListRow, Text } from "@toss/tds-mobile";
import { useApp } from "../store";
import { getPortalRoot } from "../lib/portal";
import { SheetDoubleCTA } from "../components/SheetDoubleCTA";

// F-02 마감 날짜 선택 바텀시트.
// 시안 21:3775(모임 9)은 임시로 역 리스트가 박혀 있어 무시 — 년/월/일 선택으로 구현.
// TDS Mobile엔 휠/캘린더 피커 컴포넌트가 없어, OS 네이티브 date picker를 띄우는
// input[type="date"] + 빠른 프리셋 ListRow 조합으로 처리한다.
// deadline 포맷: "YYYY-MM-DD HH:MM" (시간 부분은 DeadlineTimeSelectSheet에서 채움)

const PRESETS = [
  { label: "오늘", daysFromToday: 0 },
  { label: "내일", daysFromToday: 1 },
  { label: "모레", daysFromToday: 2 },
  { label: "일주일 뒤", daysFromToday: 7 },
] as const;

// 로컬 타임존 기준 YYYY-MM-DD. toISOString()은 UTC라 KST(+9)에서 하루 당겨지는 버그가 있어 사용 금지.
function localIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayIso(): string {
  return localIso(new Date());
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + days);
  return localIso(d);
}

interface Props {
  onClose: () => void;
  onNext: () => void;
}

export function DeadlineDateSelectSheet({ onClose, onNext }: Props) {
  const { patchMeeting, meeting } = useApp();
  const today = todayIso();
  const initialDate = meeting.deadline?.split(" ")[0] ?? today;
  const [date, setDate] = useState<string>(initialDate);

  // 현재 선택이 프리셋(오늘/내일/모레/일주일)에 해당하는지 — 아니면 '직접 선택'으로 표시.
  const isPreset = PRESETS.some(
    ({ daysFromToday }) => addDays(today, daysFromToday) === date,
  );

  function handleNext() {
    // 시간 부분이 이미 저장되어 있으면 보존. 없으면 날짜만.
    const existingTime = meeting.deadline?.split(" ")[1] ?? "";
    const next = existingTime ? `${date} ${existingTime}` : date;
    patchMeeting({ deadline: next });
    onNext();
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      portalContainer={getPortalRoot()}
      header={<BottomSheet.Header>언제까지 투표할까요?</BottomSheet.Header>}
      headerDescription={
        <BottomSheet.HeaderDescription>
          마감 날짜를 골라주세요.
        </BottomSheet.HeaderDescription>
      }
      cta={<SheetDoubleCTA onClose={onClose} onNext={handleNext} />}
    >
      <List>
        {PRESETS.map(({ label, daysFromToday }) => {
          const presetDate = addDays(today, daysFromToday);
          return (
            <ListRow
              key={label}
              contents={<ListRow.Texts type="1RowTypeA" top={label} />}
              right={
                date === presetDate ? (
                  <Asset.Icon
                    name="icon-check-mono"
                    color={colors.blue500}
                    frameShape={{ width: 24, height: 24 }}
                    backgroundColor="transparent"
                  />
                ) : undefined
              }
              onClick={() => setDate(presetDate)}
            />
          );
        })}
        {/* 직접 선택 — '보이는' input[type=date]. iOS 웹뷰에선 탭하면 네이티브 휠이 뜬다
            (숨긴 input + showPicker 는 iOS 웹뷰에서 동작 안 함). 회색 박스 대신 우측 텍스트처럼 보이게 스타일. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            gap: 8,
          }}
        >
          <Text typography="t5" color={colors.grey800}>
            직접 선택
          </Text>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => e.target.value && setDate(e.target.value)}
            aria-label="마감 날짜 직접 선택"
            style={{
              border: "none",
              background: "transparent",
              fontSize: 16, // iOS 자동 줌 방지(≥16)
              fontWeight: isPreset ? 400 : 600,
              color: isPreset ? colors.grey500 : colors.blue500,
              fontFamily: "inherit",
              textAlign: "right",
              padding: 0,
            }}
          />
        </div>
      </List>
    </BottomSheet>
  );
}
