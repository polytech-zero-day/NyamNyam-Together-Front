import { useMemo, useState } from "react";
import {
  BottomSheet,
  Button,
  ListRow,
  ProgressBar,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";
import { REGIONS, type Purpose } from "../types";

type SheetId = "purpose" | "members" | "region" | "deadline" | null;

const PURPOSE_OPTIONS: { label: Purpose; disabled: boolean }[] = [
  { label: "친구들과의 모임", disabled: false },
  { label: "연인과의 데이트", disabled: true },
  { label: "부모님과의 식사", disabled: true },
  { label: "기타", disabled: true },
];

const MEMBERS_OPTIONS = ["3명", "4명", "5명", "6명", "7명", "8명 이상"];

export function CreateMeetingScreen() {
  const { meeting, patchMeeting, goto, back } = useApp();
  const [sheet, setSheet] = useState<SheetId>(null);
  const [regionStep, setRegionStep] = useState<"region" | "station">("region");
  const [pendingRegionId, setPendingRegionId] = useState<string | null>(null);

  const filled = useMemo(
    () =>
      meeting.purpose != null &&
      meeting.minMembers != null &&
      meeting.station != null &&
      meeting.deadline != null,
    [meeting],
  );

  const progress = useMemo(() => {
    let n = 0;
    if (meeting.purpose) n++;
    if (meeting.minMembers) n++;
    if (meeting.station) n++;
    if (meeting.deadline) n++;
    return n / 4;
  }, [meeting]);

  const closeSheet = () => {
    setSheet(null);
    setRegionStep("region");
    setPendingRegionId(null);
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
      <ProgressBar progress={progress || 0.05} color={BRAND_ORANGE} animate />

      <div style={{ padding: "20px 24px 0" }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#191F28",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          모임 만들기
        </h1>
        <p
          style={{
            marginTop: 6,
            fontSize: 15,
            color: "#8B95A1",
          }}
        >
          식당 정하기, 이제 금방 끝나요
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <RowItem
          icon={<PeopleIcon />}
          label="모임 목적"
          value={meeting.purpose}
          collapsible
          onClick={() => setSheet("purpose")}
        />
        <RowItem
          icon={<PeoplePlusIcon />}
          label="최소 인원"
          value={meeting.minMembers ? `${meeting.minMembers}명` : undefined}
          collapsible
          onClick={() => setSheet("members")}
        />
        <RowItem
          icon={<TrainIcon />}
          label="위치(역)"
          value={meeting.station}
          collapsible
          onClick={() => setSheet("region")}
        />
        <RowItem
          icon={<ClipboardIcon />}
          label="마감 시간"
          subLabel="투표 마감시간을 정해요"
          value={meeting.deadline}
          onClick={() => setSheet("deadline")}
        />
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          padding: "16px 20px 24px",
          display: "flex",
          gap: 8,
        }}
      >
        <Button
          color="dark"
          variant="weak"
          size="xlarge"
          display="block"
          style={{ flex: 1 }}
          onClick={back}
        >
          이전
        </Button>
        <Button
          color="primary"
          variant="fill"
          size="xlarge"
          display="block"
          disabled={!filled}
          style={{ flex: 1.4 }}
          onClick={() => goto("invite-generated")}
        >
          다음
        </Button>
      </div>

      {/* 모임 목적 BottomSheet */}
      <BottomSheet
        open={sheet === "purpose"}
        onClose={closeSheet}
        header={<BottomSheet.Header>모임 목적</BottomSheet.Header>}
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <Button color="dark" variant="weak" display="block" onClick={closeSheet}>
                닫기
              </Button>
            }
            rightButton={
              <Button
                color="primary"
                display="block"
                disabled={!meeting.purpose}
                onClick={closeSheet}
              >
                다음
              </Button>
            }
          />
        }
      >
        <div style={{ padding: "4px 4px 8px" }}>
          {PURPOSE_OPTIONS.map(({ label, disabled }) => {
            const selected = meeting.purpose === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => patchMeeting({ purpose: label })}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  fontSize: 17,
                  fontWeight: 500,
                  color: disabled ? "#C9CDD2" : "#191F28",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span>{label}</span>
                {selected && <CheckMark />}
              </button>
            );
          })}
        </div>
      </BottomSheet>

      {/* 최소 인원 BottomSheet */}
      <BottomSheet
        open={sheet === "members"}
        onClose={closeSheet}
        header={<BottomSheet.Header>최소 인원</BottomSheet.Header>}
        headerDescription={
          <BottomSheet.HeaderDescription>
            인원은 최소 3명부터 가능해요.
          </BottomSheet.HeaderDescription>
        }
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <Button color="dark" variant="weak" display="block" onClick={closeSheet}>
                닫기
              </Button>
            }
            rightButton={
              <Button
                color="primary"
                display="block"
                disabled={meeting.minMembers == null}
                onClick={closeSheet}
              >
                다음
              </Button>
            }
          />
        }
      >
        <div style={{ padding: "4px 4px 8px" }}>
          {MEMBERS_OPTIONS.map((label, i) => {
            const value = i + 3;
            const selected = meeting.minMembers === value;
            return (
              <button
                key={label}
                type="button"
                onClick={() => patchMeeting({ minMembers: value })}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  fontSize: 17,
                  fontWeight: 500,
                  color: "#191F28",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span>{label}</span>
                {selected && <CheckMark />}
              </button>
            );
          })}
        </div>
      </BottomSheet>

      {/* 권역→역 BottomSheet (2단) */}
      <BottomSheet
        open={sheet === "region"}
        onClose={closeSheet}
        header={
          <BottomSheet.Header>
            {regionStep === "region"
              ? "어느 지역의 맛집을 추천할까요?"
              : "어느 역에서 모일까요?"}
          </BottomSheet.Header>
        }
        headerDescription={
          regionStep === "region" ? (
            <BottomSheet.HeaderDescription>
              지역을 고르면 역을 선택할 수 있어요.
            </BottomSheet.HeaderDescription>
          ) : undefined
        }
        cta={
          regionStep === "station" ? (
            <BottomSheet.DoubleCTA
              leftButton={
                <Button
                  color="dark"
                  variant="weak"
                  display="block"
                  onClick={() => setRegionStep("region")}
                >
                  이전
                </Button>
              }
              rightButton={
                <Button
                  color="primary"
                  display="block"
                  disabled={meeting.station == null}
                  onClick={closeSheet}
                >
                  다음
                </Button>
              }
            />
          ) : undefined
        }
      >
        <div style={{ padding: "4px 4px 16px" }}>
          {regionStep === "region"
            ? REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setPendingRegionId(r.id);
                    patchMeeting({ regionId: r.id, station: undefined });
                    setRegionStep("station");
                  }}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    fontSize: 16,
                    color: "#333D4B",
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{r.name}</span>
                  <ChevronRight />
                </button>
              ))
            : (REGIONS.find((r) => r.id === (pendingRegionId ?? meeting.regionId))?.stations ?? []).map(
                (st) => {
                  const selected = meeting.station === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => patchMeeting({ station: st })}
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        fontSize: 17,
                        color: "#191F28",
                        fontWeight: 500,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span>{st}</span>
                      {selected && <CheckMark />}
                    </button>
                  );
                },
              )}
        </div>
      </BottomSheet>

      {/* 마감 시간 BottomSheet (간이) */}
      <BottomSheet
        open={sheet === "deadline"}
        onClose={closeSheet}
        header={<BottomSheet.Header>마감 시간</BottomSheet.Header>}
        headerDescription={
          <BottomSheet.HeaderDescription>
            언제까지 응답을 받을까요?
          </BottomSheet.HeaderDescription>
        }
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <Button color="dark" variant="weak" display="block" onClick={closeSheet}>
                닫기
              </Button>
            }
            rightButton={
              <Button
                color="primary"
                display="block"
                disabled={meeting.deadline == null}
                onClick={closeSheet}
              >
                다음
              </Button>
            }
          />
        }
      >
        <div style={{ padding: "12px 20px 20px" }}>
          {["오늘 18:00", "오늘 19:00", "오늘 20:00", "내일 12:00", "내일 18:00"].map(
            (opt) => {
              const selected = meeting.deadline === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => patchMeeting({ deadline: opt })}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    fontSize: 17,
                    color: "#191F28",
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{opt}</span>
                  {selected && <CheckMark />}
                </button>
              );
            },
          )}
        </div>
      </BottomSheet>
    </div>
  );
}

function RowItem({
  icon,
  label,
  value,
  subLabel,
  onClick,
  collapsible,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  subLabel?: string;
  onClick: () => void;
  collapsible?: boolean;
}) {
  return (
    <ListRow
      onClick={onClick}
      withTouchEffect
      left={icon}
      contents={
        <ListRow.Texts
          type={subLabel ? "2RowTypeA" : "1RowTypeA"}
          top={
            <span style={{ fontWeight: 700, color: "#191F28" }}>
              {label}
              {value && (
                <span
                  style={{
                    marginLeft: 8,
                    fontWeight: 500,
                    color: BRAND_ORANGE,
                  }}
                >
                  {value}
                </span>
              )}
            </span>
          }
          bottom={
            subLabel ? (
              <span style={{ color: "#8B95A1", fontSize: 13 }}>{subLabel}</span>
            ) : undefined
          }
        />
      }
      right={collapsible ? <CaretDown /> : <ChevronRight />}
    />
  );
}

function PeopleIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="3" fill="#7FB3FF" />
        <circle cx="16" cy="10" r="2.5" fill="#1F6BD6" />
        <path d="M3 19c0-3 3-5 6-5s6 2 6 5v1H3v-1z" fill="#7FB3FF" />
        <path d="M13 20c0-2 2-4 4-4s4 2 4 4v1h-8v-1z" fill="#1F6BD6" />
      </svg>
    </div>
  );
}

function PeoplePlusIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="10" cy="9" r="3.5" fill="#7FB3FF" />
        <path d="M3 19c0-3 3-5 7-5s7 2 7 5v1H3v-1z" fill="#7FB3FF" />
        <circle cx="18" cy="8" r="4" fill="#1F6BD6" />
        <path
          d="M18 6v4M16 8h4"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function TrainIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="4" width="14" height="14" rx="3" fill="#1F6BD6" />
        <rect x="7" y="6" width="10" height="5" rx="1.5" fill="#A8C8FF" />
        <circle cx="9" cy="15" r="1.5" fill="#fff" />
        <circle cx="15" cy="15" r="1.5" fill="#fff" />
        <path
          d="M7 20l-1 1M17 20l1 1"
          stroke="#1F6BD6"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="4" width="14" height="17" rx="2.5" fill="#1F6BD6" />
        <rect x="8" y="3" width="8" height="3" rx="1" fill="#A8C8FF" />
        <rect x="8" y="10" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
        <rect x="8" y="13" width="6" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      </svg>
    </div>
  );
}

function CaretDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6l4 4 4-4"
        stroke="#C9CDD2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 4l4 4-4 4"
        stroke="#C9CDD2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10l4 4 8-9"
        stroke="#3182F6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
