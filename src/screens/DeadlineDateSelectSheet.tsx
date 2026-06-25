import { useRef, useState } from "react";
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

function formatKorean(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map((n) => Number(n));
  return `${y}년 ${m}월 ${d}일`;
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
  const dateRef = useRef<HTMLInputElement>(null);

  // 현재 선택이 프리셋(오늘/내일/모레/일주일)에 해당하는지 — 아니면 '직접 선택'으로 표시.
  const isPreset = PRESETS.some(
    ({ daysFromToday }) => addDays(today, daysFromToday) === date,
  );

  // 네이티브 날짜 피커 열기(iOS 회색 박스 노출 없이). showPicker 미지원 시 focus 폴백.
  function openNativePicker() {
    const el = dateRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch {
        /* 사용자 제스처 컨텍스트 밖이면 폴백 */
      }
    }
    el.focus();
    el.click();
  }

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
      {/* 날짜 값만 들고 있는 히든 input — iOS 회색 박스를 노출하지 않고 네이티브 피커만 띄운다. */}
      <input
        ref={dateRef}
        type="date"
        value={date}
        min={today}
        onChange={(e) => e.target.value && setDate(e.target.value)}
        aria-hidden
        tabIndex={-1}
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
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
        {/* 직접 선택 — 누르면 네이티브 날짜 피커. 우측에 현재 선택 날짜 표시. */}
        <ListRow
          contents={<ListRow.Texts type="1RowTypeA" top="직접 선택" />}
          right={
            <Text
              typography="t6"
              color={isPreset ? colors.grey500 : colors.blue500}
              fontWeight={isPreset ? "regular" : "semibold"}
            >
              {formatKorean(date)}
            </Text>
          }
          onClick={openNativePicker}
        />
      </List>
    </BottomSheet>
  );
}
