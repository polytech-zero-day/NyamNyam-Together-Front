# 냠냠투게더 (NyamNyam Together) — 프론트엔드

모임 참여자들의 취향(술·예산·음식·분위기·정렬)을 모아 **역 근처 식당 3~4곳으로 압축**해 투표·확정하는 앱인토스(Apps in Toss) 미니앱. **"확정기가 아니라 압축기."**

## 스택
- **React + Vite**(앱인토스 web-framework / granite), WebView 미니앱
- **TDS Mobile**(토스 디자인 시스템) UI
- **TanStack Query** — API 캐싱·폴링
- **MSW** 목 모킹, **Vitest** + **Storybook**
- 백엔드: Supabase Edge Function `api`(별도 레포 `NyamNyam-Together`)

## 개발
```bash
npm install
npm run dev          # granite dev (로컬)
npm test             # vitest
npm run storybook    # 스토리북
```
환경변수(`.env.local`):
```
VITE_API_BASE_URL=https://<ref>.supabase.co/functions/v1/api
VITE_SUPABASE_ANON_KEY=sb_publishable_...
VITE_ENABLE_DEV_LOGIN=true     # 토스 로그인 실패 시 dev-login 우회(개발용)
VITE_USE_MOCK=false            # true면 MSW 목 사용
```

## 빌드 · 배포
```bash
npm run build        # ait build → dist/ + kopo-recommend-location.ait
npm run deploy       # ait deploy --api-key <콘솔 API 키> (앱인토스 버전 등록)
```
- 콘솔 API 키: [앱인토스 콘솔](https://apps-in-toss.toss.im/) > 워크스페이스 > API 키 > 콘솔 API 키
- 등록된 버전은 콘솔 "앱 출시"에서 **테스트**(샌드박스) → **검토 요청**(실출시).
- CI/CD: `.github/workflows/` — main push 시 lint·test·storybook + `.ait` 빌드·배포.

## 사용자 흐름
- **호스트**: 토스 로그인 → 모임 생성(목적·**최대 인원**·역·마감) → 초대 링크 → **본인도 취향 투표**(stage1) → 대기 → 추천/투표/결과.
- **참여자**: 초대 링크 입장 → 취향(술·예산·음식·분위기) + **정렬 기준** 선택(stage1) → 대기.
- **집계**: **정원(최대 인원, 호스트 포함) 전원 응답** 또는 마감 → 추천 3~4곳 자동 생성.
- **2차**: 후보 식당 투표 → 호스트 확정 → 결과.

## 구조
- `src/screens/` — 화면(인트로·로그인·모임생성 시트·취향입력·정렬·대기·추천(VoteScreen)·결과 등)
- `src/api/` — client·auth·dto·adapters·endpoints·queries(TanStack)·tokenStore
- `src/store.tsx` — 전역 상태(화면 라우팅·role·meeting·participant)
- `src/lib/` — appActions(토스 브리지)·toast(중앙 경고 모달)·tossEnv

## 문서
- `docs/기능정의서.md` — 기능 정의(최우선 진실 공급원)
- `docs/nyamnyam_together_PRD.md` — PRD
- `CLAUDE.md` — Claude Code 작업 규칙

## 유용한 링크
- [앱인토스 콘솔](https://apps-in-toss.toss.im/) · [개발자센터](https://developers-apps-in-toss.toss.im/)
