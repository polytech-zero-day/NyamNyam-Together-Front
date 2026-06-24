export type ScreenId =
  | "intro"
  | "welcome"
  | "login-consent"
  | "onboarding"
  | "participant-onboarding"
  | "create-meeting"
  | "invite-generated"
  | "invite-input"
  | "q-hub"
  | "q-food"
  | "q-done"
  | "wait-others"
  | "all-done"
  | "finding"
  | "relaxed"
  | "progress"
  | "vote"
  | "vote-info-closed";

export type Purpose =
  | "친구들과의 모임"
  | "연인과의 데이트"
  | "부모님과의 식사"
  | "기타";

export type Alcohol = "drink" | "around" | "uncomfortable";

// 술 수용도(F-05) 3지선다 → 시안(사용자_투표_2) 문구 매핑.
// id는 추천엔진의 술→장소타입 매핑에 쓰이므로 바꾸지 않는다.
export const ALCOHOL_OPTIONS: { id: Alcohol; label: string }[] = [
  { id: "drink", label: "술 마실 거예요" },
  { id: "around", label: "안 마셔도 술자리는 괜찮아요" },
  { id: "uncomfortable", label: "술 없는 곳이 편해요" },
];

// 예산(사용자_투표_4): 5단계 단일선택. 라벨 표시용 + 추천엔진(3.3)이 쓰는 min~max(원) 범위.
export const BUDGET_TIERS = [
  { label: "1만원 이하", min: 0, max: 10000 },
  { label: "1~2만원", min: 10000, max: 20000 },
  { label: "2~3만원", min: 20000, max: 30000 },
  { label: "3~4만원", min: 30000, max: 40000 },
  { label: "4만원 이상", min: 40000, max: 100000 },
] as const;
export type BudgetTierLabel = (typeof BUDGET_TIERS)[number]["label"];

// 음식 카테고리(사용자_투표_6/7): 시안 기준 8종. (기능정의서 F-07의 간편식/치킨·안주는 시안에 없어 제외)
export const FOOD_CATEGORIES = [
  "한식",
  "일식",
  "양식",
  "중식",
  "분식",
  "아시안",
  "고기·구이",
  "카페·브런치",
] as const;
export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

// 분위기(사용자_투표_9): 시안 기준 4종. (기능정의서 F-08의 "상관없어요"는 시안에 없어 제외)
export const MOOD_OPTIONS = [
  "편하게 먹는",
  "도란도란 대화",
  "왁자지껄한",
  "분위기 있는",
] as const;
export type Mood = (typeof MOOD_OPTIONS)[number];

// 권역/역 데이터는 src/data/stations.ts로 분리 (백엔드 API 연동 시 데이터 파일만 교체하면 됨).
// 기존 import 경로(`./types`)는 유지하기 위해 type만 re-export.
export type { RegionId } from "./data/stations";

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  distanceM: number;
  rating: number | null;
  reason: string;
  bg: string;
  emoji: string;
}
