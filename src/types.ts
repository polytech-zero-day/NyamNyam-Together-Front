export type ScreenId =
  | "intro"
  | "login-consent"
  | "onboarding"
  | "create-meeting"
  | "invite-generated"
  | "invite-input"
  | "q-alcohol"
  | "q-budget"
  | "q-food"
  | "q-mood"
  | "wait-others"
  | "finding"
  | "relaxed"
  | "progress"
  | "vote";

export type Purpose =
  | "친구들과의 모임"
  | "연인과의 데이트"
  | "부모님과의 식사"
  | "기타";

export type Alcohol = "drink" | "around" | "uncomfortable";

export const FOOD_CATEGORIES = [
  "한식",
  "고기",
  "일식",
  "중식",
  "양식",
  "아시안",
  "분식",
  "간편식",
  "치킨·안주",
] as const;
export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

export const MOOD_OPTIONS = [
  "차분한 룸",
  "적당히 시끄러운",
  "상관 없어요",
] as const;
export type Mood = (typeof MOOD_OPTIONS)[number];

export const REGIONS = [
  { id: "gangnam", name: "강남·서초·송파", stations: ["강남역", "신논현역", "양재역", "교대역", "서초역", "잠실역", "삼성역", "송파역"] },
  { id: "yongsan", name: "용산·마포·서대문", stations: ["용산역", "이태원역", "홍대입구역", "합정역", "공덕역", "신촌역"] },
  { id: "jongno", name: "종로·동대문", stations: ["종로3가역", "광화문역", "동대문역", "동대문역사문화공원역", "혜화역"] },
  { id: "seongsu", name: "성수·건대입구", stations: ["성수역", "건대입구역", "뚝섬역", "왕십리역"] },
  { id: "gwanak", name: "관악·영등포", stations: ["서울대입구역", "신림역", "영등포역", "여의도역", "당산역"] },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];

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
