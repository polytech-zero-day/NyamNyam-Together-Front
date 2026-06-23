import { useState } from "react";
import { TextField } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";

export function InviteInputScreen() {
  const { goto } = useApp();
  const [value, setValue] = useState("");
  const ready = value.trim().length > 0;

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ padding: "20px 24px 0" }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#191F28",
            letterSpacing: "-0.02em",
            marginTop: 8,
          }}
        >
          받으신 링크를 입력해주세요.
        </h1>

        <div style={{ marginTop: 28 }}>
          <TextField
            variant="line"
            label="초대 링크"
            labelOption="appear"
            placeholder="초대 링크"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <button
        type="button"
        disabled={!ready}
        onClick={() => goto("participant-onboarding")}
        style={{
          position: "sticky",
          bottom: 0,
          background: ready ? BRAND_ORANGE : "#FFB58A",
          color: "#fff",
          fontSize: 17,
          fontWeight: 700,
          padding: "18px 0",
          border: "none",
          cursor: ready ? "pointer" : "default",
          width: "100%",
          opacity: ready ? 1 : 0.95,
        }}
      >
        확인
      </button>
    </div>
  );
}
