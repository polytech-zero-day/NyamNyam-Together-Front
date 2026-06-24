import { appLogin } from "@apps-in-toss/web-framework";
import {
  Asset,
  BottomSheet,
  List,
  ListRow,
  TextButton,
  Top,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { getPortalRoot } from "../lib/portal";
import loginConsentIcon from "../assets/login-consent-icon.svg";

// F-04 호스트 토스 로그인 동의 화면.
// 상단: 아이콘 + 타이틀("냠냠투게더에서 토스로 로그인할까요?").
// 항상 열린 BottomSheet 로 시안의 약관 동의 시트 시각 구조를 재현.
// 약관 항목 텍스트는 코드에 박지 않는다(CLAUDE.md F-04 규칙).
// 실제 약관 동의 UI 는 "동의하고 시작하기" → appLogin() 이 호출되면
// AIT 콘솔에 등록된 약관으로 토스 앱이 자동으로 띄운다. 여기 placeholder 행은
// 그 자리(슬롯)만 시각화해두는 용도.
export function LoginConsentScreen() {
  const { goto, back } = useApp();

  async function handleLogin() {
    // 토스 웹뷰가 아닌 환경(PC 브라우저·dev·헤드리스)에서는 appLogin() 의 비동기
    // 브리지 응답이 영영 오지 않아 promise 가 pending 으로 멈춘다(browser-shim 주석 참고).
    // 이런 환경에선 네이티브 로그인을 건너뛰고 바로 다음 화면으로 진행한다.
    // 실기기(ReactNativeWebView 존재)에서는 정상적으로 appLogin() 을 호출한다.
    const isBrowserShim =
      typeof window !== "undefined" && window.__NYAM_BROWSER_SHIM__ === true;
    if (isBrowserShim) {
      goto("create-meeting");
      return;
    }

    try {
      const { authorizationCode } = await appLogin();
      // TODO(backend): authorizationCode 를 서버에 보내 host userKey 발급 / 세션 생성
      console.log("[host login] authorizationCode:", authorizationCode);
      goto("create-meeting");
    } catch (err) {
      // 사용자가 거부했거나 SDK 호출 실패.
      // 데모 흐름을 막지 않기 위해 다음 화면으로 그대로 진행.
      console.error("토스 로그인 실패:", err);
      goto("create-meeting");
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
          <Asset.Image
            src={loginConsentIcon}
            frameShape={{ width: 60, height: 60 }}
            scaleType="fit"
            alt=""
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
                padding: "8px 0 0",
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
