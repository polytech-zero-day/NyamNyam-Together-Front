// 인증 오케스트레이션 — 앱인토스 SDK(appLogin) + 백엔드 토큰 교환.
//   · host  : appLogin() → { authorizationCode, referrer } → POST /auth/login → JWT
//             (샌드박스/토스앱 밖이거나 mTLS 미검증으로 실패하면 dev-login 우회)
//   · 참여자: POST /auth/anon → 익명 JWT(음수 id)
import { appLogin } from "@apps-in-toss/web-framework";
import { ENABLE_DEV_LOGIN_FALLBACK } from "../config/env";
import { authApi } from "./endpoints";
import { clearToken, getToken, hasToken, setToken } from "./tokenStore";

export { clearToken, getToken, hasToken };

/**
 * 토스 앱(WebView) 안에서 실행 중인지.
 * 주의: browser-shim이 PC 브라우저에서 ReactNativeWebView를 mock 주입하므로, 그 플래그를
 * 먼저 보고 제외해야 한다(안 그러면 PC에서 appLogin이 영영 pending → 멈춤).
 */
function isInTossApp(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { ReactNativeWebView?: unknown; __NYAM_BROWSER_SHIM__?: boolean };
  if (w.__NYAM_BROWSER_SHIM__) return false; // PC 브라우저(shim) → 토스 앱 아님
  return w.ReactNativeWebView != null;
}

/** 참여자 익명 토큰 확보(이미 토큰이 있으면 그대로 사용). */
export async function ensureParticipantToken(): Promise<void> {
  if (hasToken()) return;
  const { token } = await authApi.anon();
  setToken(token);
}

/**
 * 호스트 토스 로그인.
 *  - 토스 앱 안: 실제 appLogin() → /auth/login. 실패하면 dev-login 우회(허용 시).
 *  - 토스 앱 밖(PC 브라우저): appLogin이 영영 pending(브리지 부재)이라 호출하지 않고 바로 dev-login.
 *    (browser-shim 참고) 우회 비활성 시 명시적 에러.
 * @returns 실제 토스 로그인이면 "toss", 우회 폴백이면 "dev"
 */
export async function loginAsHost(): Promise<"toss" | "dev"> {
  if (!isInTossApp()) {
    if (!ENABLE_DEV_LOGIN_FALLBACK) {
      throw new Error("토스 앱에서만 로그인할 수 있어요");
    }
    const { token } = await authApi.devLogin();
    setToken(token);
    return "dev";
  }

  try {
    const { authorizationCode, referrer } = await appLogin();
    const { token } = await authApi.login(authorizationCode, referrer);
    setToken(token);
    return "toss";
  } catch (err) {
    if (!ENABLE_DEV_LOGIN_FALLBACK) throw err;
    const { token } = await authApi.devLogin();
    setToken(token);
    return "dev";
  }
}
