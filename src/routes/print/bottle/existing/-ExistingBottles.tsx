import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import BottleLabelPreview from "../-BottleLabelPreview";
import type { BottleData } from "../-types";
import {
  Field,
  FieldWithPreviewConatiner,
  PreviewContainer,
  SearchbarContainer,
  TextInput,
} from "../../-styledComponents";
import LayoutPanel from "../../../../components/LayoutPanel";
import { BLACK } from "../../../../styles/colors";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BottleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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

const Divider = styled.div`
  height: 4px;
  margin: 8px 0;
  background-color: ${BLACK};
`;

const ExistingBottles = () => {
  const now = new Date().toISOString().slice(2, 10);

  const [bottles, setBottles] = useState<BottleData[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<BottleData | null>(null);
  const [labeledAt, setLabeledAt] = useState(now);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bottles.json`)
      .then((res) => res.json())
      .then((data: BottleData[]) => {
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
        b.description.toLowerCase().includes(q),
    );
  }, [bottles, search]);

  return (
    <LayoutPanel>
      <FieldWithPreviewConatiner>
        <ListContainer>
          <Field>
            <label>{`> SEARCH`}</label>
            <SearchbarContainer
              type="text"
              placeholder="SEARCH BOTTLES"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          <Divider />
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
          <Divider />
          <Field>
            <label htmlFor="labeledAt">{`> LABELED AT`}</label>
            <TextInput
              type="text"
              name="labeledAt"
              value={labeledAt}
              onChange={(e) => setLabeledAt(e.target.value)}
            />
          </Field>
        </ListContainer>
        <PreviewContainer>
          {selected && (
            <BottleLabelPreview bottle={{ ...selected, labeledAt }} />
          )}
        </PreviewContainer>
      </FieldWithPreviewConatiner>
    </LayoutPanel>
  );
};

export default ExistingBottles;
