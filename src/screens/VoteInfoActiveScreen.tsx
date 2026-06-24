import { colors } from "@toss/tds-colors";
import {
  Asset,
  Badge,
  BottomCTA,
  Border,
  CTAButton,
  ListHeader,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { useCloseSession, useProgress } from "../api";
import womanIcon from "../assets/woman-fill-circle.svg";

// F-13 투표 정보(진행중). 모임의 모든 설정값과 현재 투표 진행 상황을 한 화면에 표시.
// 투표 인원은 GET /progress 폴링, 강제종료는 POST /close. (호스트 이름/남은 시간은 placeholder)
const HOST_NAME = "김토스";
const TIME_LEFT = "58:35:26";

export function VoteInfoActiveScreen() {
  const { meeting, back, goto, sessionId } = useApp();
  const progress = useProgress(sessionId, { enabled: sessionId != null });
  const close = useCloseSession(sessionId ?? "");

  const respondedCount = progress.data?.responded ?? 0;
  const totalMembers = progress.data?.total ?? meeting.minMembers ?? 3;

  async function handleForceClose() {
    if (close.isPending) return;
    try {
      await close.mutateAsync();
    } catch (err) {
      console.error("투표 종료 실패:", err);
    }
    goto("vote-info-closed");
  }

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
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "24px 0 8px",
          }}
        >
          <Asset.Image
            src={womanIcon}
            frameShape={{ width: 100, height: 100 }}
            scaleType="fit"
            alt=""
            backgroundColor="transparent"
          />
        </div>

        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              생성자
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {HOST_NAME}
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              모임 목적
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {meeting.purpose ?? "친구들과의 모임"}
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              최소 인원
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {`${totalMembers}명`}
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              위치(역)
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {meeting.station ?? "강남역"}
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              마감 시간
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {meeting.deadline ?? "2026년 6월 26일 오후 2시"}
            </ListHeader.RightText>
          }
        />

        <Border variant="height16" />

        <ListHeader
          title={
            <div
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <ListHeader.TitleParagraph typography="t4" fontWeight="bold">
                투표 정보
              </ListHeader.TitleParagraph>
              <Badge variant="fill" color="yellow" size="small">
                투표중
              </Badge>
            </div>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              투표 인원
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {`${respondedCount}/${totalMembers} 명`}
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              남은 시간
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {TIME_LEFT}
            </ListHeader.RightText>
          }
        />

        <Border variant="height16" />

        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t4" fontWeight="bold">
              식당 정보
            </ListHeader.TitleParagraph>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph
              typography="t5"
              fontWeight="bold"
              color={colors.grey500}
            >
              식당 이름
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6" color={colors.grey400}>
              없음
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph
              typography="t5"
              fontWeight="bold"
              color={colors.grey500}
            >
              식당 주소
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6" color={colors.grey400}>
              없음
            </ListHeader.RightText>
          }
        />
      </div>

      <BottomCTA.Double
        leftButton={
          <CTAButton
            color="dark"
            variant="weak"
            disabled={close.isPending}
            onClick={handleForceClose}
          >
            투표 강제종료
          </CTAButton>
        }
        rightButton={
          <CTAButton color="primary" onClick={back}>
            닫기
          </CTAButton>
        }
      />
    </div>
  );
}
