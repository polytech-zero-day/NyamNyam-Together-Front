import { useState } from "react";
import { colors } from "@toss/tds-colors";
import {
  Asset,
  BottomSheet,
  CTAButton,
  List,
  ListRow,
} from "@toss/tds-mobile";
import { useApp } from "../store";
import { REGIONS, type RegionId } from "../data/stations";
import { getPortalRoot } from "../lib/portal";

interface Props {
  onClose: () => void;
  onNext: () => void;
}

// F-02 위치 선택 - 1단: 권역 선택 바텀시트.
// 권역 데이터는 src/data/stations.ts에서 가져온다(서울+인천+광명).
// "다음" 누르면 store에 regionId 저장 후 onNext()로 역 선택 시트를 연다.
export function StationRegionSelectSheet({ onClose, onNext }: Props) {
  const { patchMeeting, meeting } = useApp();
  const [selected, setSelected] = useState<RegionId | null>(
    meeting.regionId ?? null,
  );

  function handleNext() {
    if (selected == null) return;
    // 권역이 바뀌면 기존 station 선택은 무효 → 초기화한다.
    const stationReset =
      selected !== meeting.regionId ? { station: undefined } : {};
    patchMeeting({ regionId: selected, ...stationReset });
    onNext();
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      portalContainer={getPortalRoot()}
      header={
        <BottomSheet.Header>어느 지역의 맛집을 추천할까요?</BottomSheet.Header>
      }
      headerDescription={
        <BottomSheet.HeaderDescription>
          지역을 고르면 역을 선택할 수 있어요.
        </BottomSheet.HeaderDescription>
      }
      cta={
        <BottomSheet.DoubleCTA>
          <CTAButton color="dark" variant="weak" onClick={onClose}>
            닫기
          </CTAButton>
          <CTAButton
            color="primary"
            disabled={selected == null}
            onClick={handleNext}
          >
            다음
          </CTAButton>
        </BottomSheet.DoubleCTA>
      }
    >
      <List>
        {REGIONS.map(({ id, name }) => (
          <ListRow
            key={id}
            contents={<ListRow.Texts type="1RowTypeA" top={name} />}
            right={
              selected === id ? (
                <Asset.Icon
                  name="icon-check-mono"
                  color={colors.blue500}
                  frameShape={{ width: 24, height: 24 }}
                  backgroundColor="transparent"
                />
              ) : undefined
            }
            onClick={() => setSelected(id)}
          />
        ))}
      </List>
    </BottomSheet>
  );
}
