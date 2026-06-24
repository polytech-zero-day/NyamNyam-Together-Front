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
import womanIcon from "../assets/woman-fill-circle.svg";



// F-13 투표 정보(진행중). 모임의 모든 설정값과 현재 투표 진행 상황을 한 화면에 표시.
// 백엔드 연동 전 — 호스트 이름/투표 인원/남은 시간/식당 정보는 더미.
// 내용이 길어 세로 스크롤이 자동 생성되도록 flex+overflow 처리.
const HOST_NAME = "김토스";
const VOTED_COUNT = 1;
const TIME_LEFT = "58:35:26";

export function VoteInfoActiveScreen() {
  const { meeting, back, goto } = useApp();

  const totalMembers = meeting.minMembers ?? 3;

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
              {`${VOTED_COUNT}/${totalMembers} 명`}
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
            onClick={() => {
              // TODO(backend): 호스트 강제 종료 API. 데모: 바로 종료 화면으로.
              goto("vote-info-closed");
            }}
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
