import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { BlobProvider } from '@react-pdf/renderer';

import BottleLabelCard from '@/components/BottleLabelCard';
import LayoutPanel from '@/components/LayoutPanel';
import { useBottles } from '@/hooks/useBottles';
import {
  Field,
  FieldWithPreviewConatiner,
  PreviewContainer,
  SearchbarContainer,
  TextInput,
} from '@/routes/print/-styledComponents';
import BottleLabelDocument from '@/routes/print/bottle/-BottleLabelDocument';
import { BLACK } from '@/styles/colors';
import { getToday } from '@/utils/date';

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
  border: 2px solid ${({ $active }) => ($active ? BLACK : 'transparent')};
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

const PrintRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const PrintButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
`;

const ExistingBottles = () => {
  const bottles = useBottles();
  const [search, setSearch] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [labelledAt, setLabelledAt] = useState(getToday);

  const selected = bottles.length > 0 ? bottles[selectedIdx] : null;
  const bottle = selected ? { ...selected, labelledAt } : null;

  const filtered = useMemo(() => {
    if (!search) return bottles;
    const q = search.toLowerCase();
    return bottles.filter(
      (b) =>
        b.brand.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q),
    );
  }, [bottles, search]);

  const handlePrint = useCallback((url: string | null) => {
    if (!url) return;
    const w = window.open(url, '_blank');
    if (w) {
      w.addEventListener('load', () => w.print());
    }
  }, []);

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
            {filtered.map((b) => (
              <BottleItem
                key={`${b.brand}_${b.name}`}
                $active={selected === b}
                onClick={() => setSelectedIdx(bottles.indexOf(b))}
              >
                <BottleBrand>{b.brand}</BottleBrand>
                <BottleName>{b.name}</BottleName>
              </BottleItem>
            ))}
            {filtered.length === 0 && <EmptyText>NO RESULTS</EmptyText>}
          </BottleList>
          <Divider />
          <Field>
            <label htmlFor="labelledAt">{`> LABELLED AT`}</label>
            <TextInput
              type="text"
              name="labelledAt"
              value={labelledAt}
              onChange={(e) => setLabelledAt(e.target.value)}
            />
          </Field>
        </ListContainer>
        <PreviewContainer>
          {bottle && <BottleLabelCard bottle={bottle} />}
        </PreviewContainer>
      </FieldWithPreviewConatiner>
      {bottle && (
        <PrintRow>
          <BlobProvider document={<BottleLabelDocument bottle={bottle} />}>
            {({ url }) => (
              <PrintButton onClick={() => handlePrint(url)}>{'> PRINT LABEL'}</PrintButton>
            )}
          </BlobProvider>
        </PrintRow>
      )}
    </LayoutPanel>
  );
};

export default ExistingBottles;
