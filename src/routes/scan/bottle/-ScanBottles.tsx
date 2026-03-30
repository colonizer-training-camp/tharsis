import { useCallback, useRef, useState } from 'react';
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
} from '@/routes/print/-styledComponents';
import BottleLabelDocument from '@/routes/print/bottle/-BottleLabelDocument';
import type { BottleData } from '@/routes/print/bottle/-types';
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
  height: 300px;
  min-width: 280px;
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 8px 12px;
`;

const ReadyText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
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

const ClearButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  align-self: flex-end;
`;

const PrintButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
`;

const ScanBottles = () => {
  const bottles = useBottles();
  const [scannedBottles, setScannedBottles] = useState<BottleData[]>([]);
  const [selectedBottle, setSelectedBottle] = useState<BottleData | null>(null);
  const [scanInput, setScanInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const scanInputRef = useRef<HTMLInputElement>(null);

  const today = getToday();

  const handleScanSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      const match = bottles.find((b) => b.id === scanInput);
      if (match) {
        setScannedBottles((prev) => [match, ...prev]);
        setSelectedBottle(match);
      } else {
        alert(`"${scanInput}" not found`);
      }
      setScanInput('');
      scanInputRef.current?.focus();
    },
    [bottles, scanInput],
  );

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
            <label>{`> SCAN BOTTLE`}</label>
            <SearchbarContainer
              ref={scanInputRef}
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              onKeyDown={handleScanSubmit}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="CLICK TO SCAN"
            />
          </Field>
          <Divider />
          <BottleList>
            {scannedBottles.map((b) => (
              <BottleItem
                key={`${b.brand}_${b.name}`}
                $active={selectedBottle === b}
                onClick={() => setSelectedBottle(b)}
              >
                <BottleBrand>{b.brand}</BottleBrand>
                <BottleName>{b.name}</BottleName>
              </BottleItem>
            ))}
            {scannedBottles.length === 0 && <EmptyText>HISTORY NOT FOUND</EmptyText>}
          </BottleList>
          <Divider />
          <ClearButton
            onClick={() => {
              setScannedBottles([]);
              setSelectedBottle(null);
            }}
          >
            {'> CLEAR HISTORY'}
          </ClearButton>
        </ListContainer>
        <PreviewContainer>
          {inputFocused ? (
            <ReadyText>READY</ReadyText>
          ) : (
            selectedBottle && <BottleLabelCard bottle={{ ...selectedBottle, labelledAt: today }} />
          )}
        </PreviewContainer>
      </FieldWithPreviewConatiner>
      {selectedBottle && (
        <PrintRow>
          <BlobProvider
            document={<BottleLabelDocument bottle={{ ...selectedBottle, labelledAt: today }} />}
          >
            {({ url }) => (
              <PrintButton onClick={() => handlePrint(url)}>{'> PRINT LABEL'}</PrintButton>
            )}
          </BlobProvider>
        </PrintRow>
      )}
    </LayoutPanel>
  );
};

export default ScanBottles;
