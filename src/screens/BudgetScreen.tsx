import { Button } from "@toss/tds-mobile";
import { useApp } from "../store";
import { BRAND_ORANGE } from "../components/icons";

const MIN = 10000;
const MAX = 100000;
const STEP = 5000;

function formatWon(v: number) {
  return `${Math.round(v / 10000)}만원`;
}

export function BudgetScreen() {
  const { participant, patchParticipant, goto } = useApp();
  const min = participant.budgetMin;
  const max = participant.budgetMax;

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
      <p style={{ fontSize: 13, color: "#8B95A1", fontWeight: 600 }}>2 / 4</p>
      <h1
        style={{
          marginTop: 8,
          fontSize: 22,
          fontWeight: 800,
          color: "#191F28",
          letterSpacing: "-0.02em",
          lineHeight: 1.35,
        }}
      >
        1인 기준 예산은
        <br />
        어느 정도가 좋을까요?
      </h1>
      <p style={{ marginTop: 12, fontSize: 14, color: "#8B95A1" }}>
        가장 빠듯한 사람 기준으로 추천해드릴게요.
      </p>

      <div style={{ marginTop: 40 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: "#8B95A1", fontWeight: 600 }}>최소</p>
            <p
              style={{
                marginTop: 4,
                fontSize: 24,
                fontWeight: 800,
                color: "#191F28",
              }}
            >
              {formatWon(min)}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 12, color: "#8B95A1", fontWeight: 600 }}>최대</p>
            <p
              style={{
                marginTop: 4,
                fontSize: 24,
                fontWeight: 800,
                color: BRAND_ORANGE,
              }}
            >
              {formatWon(max)}
            </p>
          </div>
        </div>

        <RangeRow
          label="최소"
          value={min}
          min={MIN}
          max={MAX - STEP}
          step={STEP}
          onChange={(v) =>
            patchParticipant({ budgetMin: Math.min(v, max - STEP) })
          }
        />
        <div style={{ height: 16 }} />
        <RangeRow
          label="최대"
          value={max}
          min={MIN + STEP}
          max={MAX}
          step={STEP}
          onChange={(v) =>
            patchParticipant({ budgetMax: Math.max(v, min + STEP) })
          }
        />

        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            color: "#B0B8C1",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          <span>1만원</span>
          <span>10만원</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <Button
        color="primary"
        variant="fill"
        size="xlarge"
        display="block"
        onClick={() => goto("q-food")}
      >
        다음
      </Button>
    </div>
  );
}

function RangeRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label
        style={{
          fontSize: 12,
          color: "#8B95A1",
          fontWeight: 600,
          display: "block",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: BRAND_ORANGE,
        }}
      />
    </div>
  );
}
