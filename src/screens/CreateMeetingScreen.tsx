import { useState, type ReactNode } from "react";
import { colors } from "@toss/tds-colors";
import {
  Asset,
  BottomCTA,
  CTAButton,
  List,
  ListRow,
  ProgressBar,
  Top,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { PurposeSelectSheet } from "./PurposeSelectSheet";
import { MembersSelectSheet } from "./MembersSelectSheet";
import { StationRegionSelectSheet } from "./StationRegionSelectSheet";
import { StationSelectSheet } from "./StationSelectSheet";
import { DeadlineDateSelectSheet } from "./DeadlineDateSelectSheet";
import { DeadlineTimeSelectSheet } from "./DeadlineTimeSelectSheet";

// F-02 모임 만들기 메인 폼. 목적/최소인원/위치(역)/마감시간 4개 조건을 채워야 저장 가능.
// 각 행 클릭 시 같은 화면에서 바텀시트가 overlay로 열려 값을 받아온다(별도 라우팅 아님).
// 위치(역): 권역→역 2단 시트 / 마감 시간: 날짜→시간 2단 시트.
type OpenSheet =
  | "purpose"
  | "members"
  | "region"
  | "station"
  | "date"
  | "time"
  | null;

export function CreateMeetingScreen() {
  const { meeting, back, goto } = useApp();
  const [openSheet, setOpenSheet] = useState<OpenSheet>(null);

  const filledCount = [
    meeting.purpose,
    meeting.minMembers,
    meeting.station,
    meeting.deadline,
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
        title={<Top.TitleParagraph size={22}>모임 만들기</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph size={17}>
            {isComplete
              ? "다 정했어요! 저장하고 친구들을 초대해요."
              : "식당 정하기, 이제 금방 끝나요"}
          </Top.SubtitleParagraph>
        }
      />

      <List>
        <MeetingFieldRow
          icon="👥"
          label="모임 목적"
          value={meeting.purpose ?? null}
          onClick={() => setOpenSheet("purpose")}
        />
        <MeetingFieldRow
          icon="👬"
          label="최소 인원"
          value={meeting.minMembers ? `${meeting.minMembers}명` : null}
          onClick={() => setOpenSheet("members")}
        />
        <MeetingFieldRow
          icon="🚇"
          label="위치(역)"
          value={meeting.station ?? null}
          onClick={() => setOpenSheet("region")}
        />
        <MeetingFieldRow
          icon="🗳"
          label="마감 시간"
          value={meeting.deadline ?? null}
          emptyHint="투표 마감 시간을 정해요"
          onClick={() => setOpenSheet("date")}
        />
      </List>

      <div style={{ marginTop: "auto" }}>
        <BottomCTA.Double
          leftButton={
            <CTAButton color="dark" variant="weak" onClick={back}>
              이전
            </CTAButton>
          }
          rightButton={
            <CTAButton
              color="primary"
              disabled={!isComplete}
              onClick={() => goto("invite-generated")}
            >
              저장
            </CTAButton>
          }
        />
      </div>

      {/* 바텀시트들 — 화면 위 overlay로 열림. 시트 안 "다음"이 값을 저장하고 닫거나(2단의 경우) 다음 시트로 전환. */}
      {openSheet === "purpose" && <PurposeSelectSheet onClose={closeSheet} />}
      {openSheet === "members" && <MembersSelectSheet onClose={closeSheet} />}
      {openSheet === "region" && (
        <StationRegionSelectSheet
          onClose={closeSheet}
          onNext={() => setOpenSheet("station")}
        />
      )}
      {openSheet === "station" && <StationSelectSheet onClose={closeSheet} />}
      {openSheet === "date" && (
        <DeadlineDateSelectSheet
          onClose={closeSheet}
          onNext={() => setOpenSheet("time")}
        />
      )}
      {openSheet === "time" && <DeadlineTimeSelectSheet onClose={closeSheet} />}
    </div>
  );
}

// Unicode 이모지를 30x30 컨테이너 안에 시각 중앙 정렬. 시안의 컬러 이모지 아이콘과 시각적으로 매칭됨.
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

// 체크 아이콘 — 항목이 채워졌을 때 오른쪽에 표시.
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

// 모임 만들기의 각 항목 행. 값이 없으면 1줄+화살표, 있으면 2줄+체크.
// "마감 시간"처럼 비어 있어도 보조 설명이 항상 보이는 경우 emptyHint 사용.
function MeetingFieldRow({
  icon,
  label,
  value,
  emptyHint,
  onClick,
}: {
  icon: string;
  label: string;
  value: string | null;
  emptyHint?: string;
  onClick: () => void;
}): ReactNode {
  const filled = value != null;
  return (
    <ListRow
      left={<EmojiIcon>{icon}</EmojiIcon>}
      contents={
        filled || emptyHint != null ? (
          <ListRow.Texts
            type="2RowTypeB"
            top={label}
            bottom={value ?? emptyHint!}
          />
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
