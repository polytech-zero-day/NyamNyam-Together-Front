// 토스 앱 전용 브리지 mock 주입 — 반드시 TDS/AIT import 보다 먼저.
// (브라우저에서 BottomCTA/BottomSheet 가 SafeAreaInsets 못 받아 안 그려지는 문제 해결)
import "./lib/browser-shim";

import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import config from "../granite.config.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TDSMobileAITProvider brandPrimaryColor={config.brand.primaryColor}>
      <App />
    </TDSMobileAITProvider>
  </StrictMode>,
);
