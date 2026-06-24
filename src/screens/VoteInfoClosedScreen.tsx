import { Asset, Badge, BottomCTA, Border, ListHeader } from "@toss/tds-mobile";
import { useApp } from "../store";
import womanIcon from "../assets/woman-fill-circle.svg";

// F-13 투표 정보(종료). VoteInfoActiveScreen과 같은 구조에 종료 상태값을 채운 화면.
// 배지=투표종료(회색), 투표 인원=3/3, 남은 시간=00:00:00, 식당 정보 채워짐, 하단은 닫기 1개.
// 백엔드 연동 전 — 호스트/식당 더미.
const HOST_NAME = "김토스";
const RESTAURANT_NAME = "신복면관";
const RESTAURANT_ADDRESS = "서울특별시 강남구 테헤란로4길 6 B126호";

export function VoteInfoClosedScreen() {
  const { meeting, back } = useApp();

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
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ListHeader.TitleParagraph typography="t4" fontWeight="bold">
                투표 정보
              </ListHeader.TitleParagraph>
              <Badge variant="weak" color="elephant" size="small">
                투표종료
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
              {`${totalMembers}/${totalMembers} 명`}
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
              00:00:00
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
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              식당 이름
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {RESTAURANT_NAME}
            </ListHeader.RightText>
          }
        />
        <ListHeader
          title={
            <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
              식당 주소
            </ListHeader.TitleParagraph>
          }
          right={
            <ListHeader.RightText typography="t6">
              {RESTAURANT_ADDRESS}
            </ListHeader.RightText>
          }
        />
      </div>

      <BottomCTA.Single onClick={back}>닫기</BottomCTA.Single>
    </div>
  );
}
