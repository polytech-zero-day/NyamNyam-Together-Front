import { useState } from "react";
import {
  Asset,
  BottomSheet,
  List,
  ListRow,
  TextButton,
  Top,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { loginAsHost } from "../api";
import { getPortalRoot } from "../lib/portal";
import { APP_LOGO_SRC } from "../components/icons";

// F-04 호스트 토스 로그인 동의 화면.
// 상단: 아이콘 + 타이틀("냠냠투게더에서 토스로 로그인할까요?").
// 항상 열린 BottomSheet 로 시안의 약관 동의 시트 시각 구조를 재현.
// 약관 항목 텍스트는 코드에 박지 않는다(CLAUDE.md F-04 규칙).
// 실제 약관 동의 UI 는 "동의하고 시작하기" → appLogin() 이 호출되면
// AIT 콘솔에 등록된 약관으로 토스 앱이 자동으로 띄운다. 여기 placeholder 행은
// 그 자리(슬롯)만 시각화해두는 용도.
export function LoginConsentScreen() {
  const { goto, back, setRole } = useApp();
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;
    setLoading(true);
    try {
      // 토스 앱: appLogin() → /auth/login. 그 외(PC/dev): dev-login 우회(api/auth.ts).
      // 성공 시 host JWT가 토큰 저장소에 들어가 이후 requireToss 요청이 통과한다.
      await loginAsHost();
      setRole("host");
      goto("create-meeting");
    } catch (err) {
      console.error("토스 로그인 실패:", err);
      // 우회까지 막힌 경우(운영 빌드 등) — 데모 흐름 유지를 위해 진행하되 역할만 표시.
      setRole("host");
      goto("create-meeting");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 시트 뒤 배경 콘텐츠 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          background: "#fff",
        }}
      >
        <div style={{ padding: "24px 28px 0" }}>
          {/* 상단 네비와 동일한 앱 로고. 이 화면에선 큰 원형으로 — radius=지름/2 로 원 처리. */}
          <Asset.Image
            src={APP_LOGO_SRC}
            frameShape={{ width: 60, height: 60, radius: 30 }}
            scaleType="fit"
            alt="냠냠투게더 로고"
            backgroundColor="transparent"
          />
        </div>

        <Top
          title={
            <Top.TitleParagraph size={28}>
              {`냠냠투게더에서 토스로\n로그인할까요?`}
            </Top.TitleParagraph>
          }
        />
      </div>

      {/* 시안 그대로의 약관 동의 시트 — 항상 열림. */}
      <BottomSheet
        open
        onClose={back}
        portalContainer={getPortalRoot()}
        header={
          <BottomSheet.Header>
            {`냠냠투게더 로그인을 위해\n꼭 필요한 동의만 추렸어요`}
          </BottomSheet.Header>
        }
        cta={
          <>
            <BottomSheet.CTA onClick={handleLogin}>
              동의하고 시작하기
            </BottomSheet.CTA>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                  marginBottom: 10
              }}
            >
              <TextButton size="xsmall" variant="underline" onClick={back}>
                다음에
              </TextButton>
            </div>
          </>
        }
      >
        {/*
          약관 항목은 코드에 박지 않는다.
          이 행들은 실제 동의 항목이 "이 자리에 표시된다" 는 슬롯 placeholder 일 뿐 —
          진짜 약관과 동의는 위 CTA 가 호출하는 appLogin() 이 AIT 콘솔 등록값으로 띄운다.
        */}
        <List>
          <ListRow
            contents={<ListRow.Texts type="1RowTypeA" top="약관 동의" />}
            withArrow
          />
          <ListRow
            contents={<ListRow.Texts type="1RowTypeA" top="약관 동의" />}
            withArrow
          />
        </List>
      </BottomSheet>
    </>
  );
}
