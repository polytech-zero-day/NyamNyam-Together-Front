import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";

export function InviteGeneratedScreen() {
  const { meeting, goto } = useApp();
  const inviteCode = "NYAM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const inviteUrl = `https://nyam.together/g/${inviteCode}`;

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(inviteUrl);
  };

  const handleShare = () => {
    goto("wait-others");
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <SuccessCircle />
      </div>

      <h1
        style={{
          marginTop: 24,
          fontSize: 22,
          fontWeight: 800,
          color: "#191F28",
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        모임이 만들어졌어요
      </h1>
      <p
        style={{
          marginTop: 10,
          fontSize: 15,
          color: "#8B95A1",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        친구들에게 초대 링크를 보내세요.
        <br />
        {meeting.station ?? "장소"} · 최소 {meeting.minMembers ?? "-"}명 ·{" "}
        {meeting.deadline ?? "마감 미정"}
      </p>

      <div
        style={{
          marginTop: 28,
          background: "#F9FAFB",
          borderRadius: 14,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: 15,
            color: "#333D4B",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {inviteUrl}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            border: "none",
            background: "#fff",
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 14,
            color: "#333D4B",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          복사
        </button>
      </div>

      <div style={{ flex: 1 }} />

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={handleShare}
      >
        공유하기
      </Button>
    </div>
  );
}

function SuccessCircle() {
  return (
    <div
      style={{
        width: 96,
        height: 96,
        borderRadius: "50%",
        background: BRAND_ORANGE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M12 24l8 8 16-18"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
