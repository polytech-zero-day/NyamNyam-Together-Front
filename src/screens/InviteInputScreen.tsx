import { useState } from "react";
import { BottomCTA, TextField, Top } from "@toss/tds-mobile";
import { useApp } from "../store";

// F-04 참여자 초대 링크 입력. 호스트가 공유한 링크(?groupId=...)를 붙여넣고 진입한다.
// 참여자는 익명(무로그인)이므로 로그인 없이 바로 응답 단계로 이동한다.
export function InviteInputScreen() {
  const { goto } = useApp();
  const [link, setLink] = useState("");

  function handleConfirm() {
    if (!link.trim()) return;
    // TODO(backend): link에서 groupId 파싱 + 유효성 검사(존재/마감 여부) 후 입장.
    // 지금은 입력값이 있으면 통과시킨다.
    goto("participant-onboarding");
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
      <Top
        title={
          <Top.TitleParagraph size={22}>
            받으신 링크를 입력해주세요.
          </Top.TitleParagraph>
        }
      />

      <TextField
        variant="line"
        label="초대 링크"
        placeholder="초대 링크"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <div style={{ marginTop: "auto" }}>
        <BottomCTA.Single onClick={handleConfirm} fixedAboveKeyboard>
          확인
        </BottomCTA.Single>
      </div>
    </div>
  );
}
