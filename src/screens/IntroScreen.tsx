import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { IntroCardIllustration } from "../components/icons";

export function IntroScreen() {
  const { goto } = useApp();
  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        padding: "20px 24px 32px",
        boxSizing: "border-box",
      }}
    >
      <IntroCardIllustration />

      <h1
        style={{
          marginTop: 28,
          fontSize: 26,
          fontWeight: 800,
          lineHeight: 1.32,
          color: "#191F28",
          letterSpacing: "-0.02em",
        }}
      >
        다 같이 갈 식당,
        <br />
        같이 정해요.
      </h1>
      <p
        style={{
          marginTop: 16,
          fontSize: 15,
          lineHeight: 1.5,
          color: "#8B95A1",
        }}
      >
        흩어진 의견 그만.
        <br />
        조건 모아서 갈 만한 곳만 골라드려요
      </p>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Button
          color="primary"
          variant="fill"
          size="xlarge"
          display="block"
          onClick={() => goto("login-consent")}
        >
          토스로 로그인하기
        </Button>
        <Button
          color="dark"
          variant="weak"
          size="xlarge"
          display="block"
          onClick={() => goto("invite-input")}
        >
          이미 초대받은 링크가 있어요
        </Button>
      </div>
    </div>
  );
}
