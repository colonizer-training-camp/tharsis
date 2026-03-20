import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { BLACK } from "../../../../styles/colors";
import {
  FieldWithPreviewConatiner,
  PreviewContainer,
  TextInput,
} from "../../-styledComponents";
import LayoutPanel from "../../../../components/LayoutPanel";
import BottleLabelPreview from "../-BottleLabelPreview";
import type { Bottle } from "../-types";

const ExistingBottles = () => {
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Bottle | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bottles.json`)
      .then((res) => res.json())
      .then((data: Bottle[]) => {
        setBottles(data);
        if (data.length > 0) setSelected(data[0]);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!search) return bottles;
    const q = search.toLowerCase();
    return bottles.filter(
      (b) =>
        b.brand.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }, [bottles, search]);

  return (
    <LayoutPanel>
      <FieldWithPreviewConatiner>
        <ListContainer>
          <TextInput
            type="text"
            placeholder="SEARCH..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <BottleList>
            {filtered.map((bottle) => (
              <BottleItem
                key={`${bottle.brand}_${bottle.name}`}
                $active={selected === bottle}
                onClick={() => setSelected(bottle)}
              >
                <BottleBrand>{bottle.brand}</BottleBrand>
                <BottleName>{bottle.name}</BottleName>
              </BottleItem>
            ))}
            {filtered.length === 0 && <EmptyText>NO RESULTS</EmptyText>}
          </BottleList>
        </ListContainer>
        <PreviewContainer>
          {selected && <BottleLabelPreview bottle={selected} />}
        </PreviewContainer>
      </FieldWithPreviewConatiner>
    </LayoutPanel>
  );
};

export default ExistingBottles;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BottleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

const BottleItem = styled.div<{ $active: boolean }>`
  padding: 8px 12px;
  border: 2px solid ${({ $active }) => ($active ? BLACK : "transparent")};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    border-color: ${BLACK};
  }
`;

const BottleBrand = styled.div`
  font-size: 12px;
`;

const BottleName = styled.div`
  font-weight: bold;
`;

const EmptyText = styled.div`
  font-size: 14px;
  padding: 8px 12px;
`;
