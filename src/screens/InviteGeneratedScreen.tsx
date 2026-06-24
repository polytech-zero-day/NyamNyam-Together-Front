import { colors } from "@toss/tds-colors";
import {
  Asset,
  BottomCTA,
  Button,
  IconButton,
  TextField,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import checkFillIcon from "../assets/check-fill-circle.png";

// F-03 모임 생성 완료. 호스트가 만든 모임의 초대 링크를 보여주고 공유하도록 유도.
// 실제 링크 생성은 백엔드 연동 시 — 지금은 자리만 잡고 더미 링크로.
const DUMMY_INVITE_LINK = "https://apps-in-toss.com/nyamnyam?groupId=demo123";

export function InviteGeneratedScreen() {
  const { goto, back } = useApp();

  function handleCopy() {
    // 웹뷰/브라우저 양쪽에서 동작. 실패해도 조용히 무시(데모 단계).
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(DUMMY_INVITE_LINK).catch(() => {
        // TODO: 토스트로 실패 안내
      });
    }
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
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0 24px",
        }}
      >
        <Asset.Image
          src={checkFillIcon}
          frameShape={{ width: 100, height: 100 }}
          scaleType="fit"
          alt=""
          backgroundColor="transparent"
        />
        <p
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.grey800,
            margin: "24px 0 8px",
          }}
        >
          모임을 만들었어요
        </p>
        <p
          style={{
            fontSize: 16,
            color: colors.grey500,
            margin: 0,
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          초대 링크를 친구들에게 공유해보세요
        </p>

        <div style={{ width: "100%", marginTop: 40 }}>
          <TextField
            variant="box"
            label="초대 링크"
            labelOption="sustain"
            value={DUMMY_INVITE_LINK}
            onChange={() => {
              // 읽기 전용 — 사용자가 직접 수정하지 않음
            }}
            right={
              <IconButton
                name="icon-copy-mono"
                aria-label="초대 링크 복사"
                variant="clear"
                iconSize={20}
                onClick={handleCopy}
              />
            }
          />
        </div>
      </div>

      <BottomCTA.Double
        leftButton={
          <Button
            color="dark"
            variant="weak"
            size="xlarge"
            display="block"
            onClick={back}
          >
            닫기
          </Button>
        }
        rightButton={
          <Button
            color="primary"
            variant="fill"
            size="xlarge"
            display="block"
            onClick={() => goto("wait-others")}
          >
            투표 현황보기
          </Button>
        }
      />
    </div>
  );
}
