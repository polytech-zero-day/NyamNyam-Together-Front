import { QueryClient } from "@tanstack/react-query";

// 앱 전역 QueryClient. 웹뷰 단발 세션 특성상 보수적 기본값.
//   · retry 1회(네트워크 흔들림 흡수, 과도한 재시도 방지)
//   · staleTime 짧게(세션 상태가 자주 바뀜) — 폴링은 훅별 refetchInterval로 제어
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5_000,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

// 앱 런타임용 단일 인스턴스(스토리/테스트는 자체 인스턴스를 만들어 격리).
export const queryClient = createQueryClient();
