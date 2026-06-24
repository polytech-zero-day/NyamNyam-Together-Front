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
import { REGIONS } from "../data/stations";
import { getPortalRoot } from "../lib/portal";

interface Props {
  onClose: () => void;
}

// F-02 위치 선택 - 2단: 역 선택 바텀시트.
// store의 meeting.regionId에 해당하는 권역의 역 목록을 보여준다.
// regionId가 없으면 안내 메시지 — 정상 흐름에선 StationRegionSelectSheet에서 먼저 권역 선택.
export function StationSelectSheet({ onClose }: Props) {
  const { patchMeeting, meeting } = useApp();
  const region = REGIONS.find((r) => r.id === meeting.regionId);
  const [selected, setSelected] = useState<string | null>(
    meeting.station ?? null,
  );

  function handleNext() {
    if (selected == null) return;
    patchMeeting({ station: selected });
    onClose();
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      portalContainer={getPortalRoot()}
      header={<BottomSheet.Header>어느 역에서 모일까요?</BottomSheet.Header>}
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
      {region == null ? (
        <div
          style={{
            padding: "16px 24px 24px",
            color: colors.grey600,
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          먼저 지역을 골라주세요.
        </div>
      ) : (
        <List>
          {region.stations.map((stationName) => (
            <ListRow
              key={stationName}
              contents={
                <ListRow.Texts type="1RowTypeA" top={stationName} />
              }
              right={
                selected === stationName ? (
                  <Asset.Icon
                    name="icon-check-mono"
                    color={colors.blue500}
                    frameShape={{ width: 24, height: 24 }}
                    backgroundColor="transparent"
                  />
                ) : undefined
              }
              onClick={() => setSelected(stationName)}
            />
          ))}
        </List>
      )}
    </BottomSheet>
  );
}
