import { useState } from "react";
import { AgreementV4, BottomSheet, Button } from "@toss/tds-mobile";
import { useApp } from "../store";

export function LoginConsentScreen() {
  const { goto } = useApp();
  const [open, setOpen] = useState(true);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const [agree4, setAgree4] = useState(false);

  const allRequired = agree1 && agree2 && agree3;

  const handleStart = () => {
    if (!allRequired) return;
    setOpen(false);
    setTimeout(() => goto("onboarding"), 200);
  };

  return (
    <div style={{ minHeight: "calc(100vh - var(--navbar-height))", padding: "20px 24px" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#F2F4F6",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5L19 18H5l3.5-4.5z"
            fill="#B0B8C1"
          />
        </svg>
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 1.35,
          color: "#191F28",
          letterSpacing: "-0.02em",
        }}
      >
        냠냠투게더에서 토스로
        <br />
        로그인할까요?
      </h1>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        header={
          <BottomSheet.Header>
            냠냠투게더 로그인을 위해
            <br />꼭 필요한 동의만 추렸어요
          </BottomSheet.Header>
        }
        cta={
          <BottomSheet.CTA
            onClick={handleStart}
            disabled={!allRequired}
          >
            동의하고 시작하기
          </BottomSheet.CTA>
        }
      >
        <div style={{ padding: "8px 4px 16px" }}>
          <AgreementV4.Header variant="small">냠냠서비스 동의항목</AgreementV4.Header>
          <AgreementV4
            variant="medium"
            left={
              <AgreementV4.Checkbox
                checked={agree1}
                onCheckedChange={setAgree1}
              />
            }
            middle={<AgreementV4.Text>콘솔에서 약관 정의 후 수정 예정</AgreementV4.Text>}
            right={<AgreementV4.RightArrow />}
          />
          <AgreementV4
            variant="medium"
            left={
              <AgreementV4.Checkbox
                checked={agree2}
                onCheckedChange={setAgree2}
              />
            }
            middle={<AgreementV4.Text>콘솔에서 약관 정의 후 수정 예정</AgreementV4.Text>}
            right={<AgreementV4.RightArrow />}
          />

          <div style={{ height: 16 }} />

          <AgreementV4.Header variant="small">토스 동의항목</AgreementV4.Header>
          <AgreementV4
            variant="medium"
            left={
              <AgreementV4.Checkbox
                checked={agree3}
                onCheckedChange={setAgree3}
              />
            }
            middle={<AgreementV4.Text>[필수] 개인정보 제3자 정보 제공</AgreementV4.Text>}
            right={<AgreementV4.RightArrow />}
          />
          <AgreementV4
            variant="medium"
            left={
              <AgreementV4.Checkbox
                checked={agree4}
                onCheckedChange={setAgree4}
              />
            }
            middle={<AgreementV4.Text>[선택] 선택 제공 항목</AgreementV4.Text>}
            right={<AgreementV4.RightArrow />}
          />

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Button
              variant="weak"
              color="dark"
              size="small"
              onClick={() => {
                setOpen(false);
                setTimeout(() => goto("onboarding"), 200);
              }}
              style={{
                background: "transparent",
                textDecoration: "underline",
              }}
            >
              다음에
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
