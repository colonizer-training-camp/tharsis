import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { BlobProvider } from '@react-pdf/renderer';

import LayoutPanel from '@/components/LayoutPanel';
import Space from '@/components/Space';
import { Divider } from '@/components/styledComponents';
import VialBoxLabelCard from '@/components/VialBoxLabelCard';
import { VIAL_COUNT } from '@/constants/label';
import { useBottles } from '@/hooks/useBottles';
import {
  Field,
  FieldConatiner,
  FieldWithPreviewConatiner,
  PreviewContainer,
  Select,
  TextInput,
} from '@/routes/print/-styledComponents';
import type { VialData } from '@/routes/print/vial/-types';
import VialBoxLabelDocument from '@/routes/print/vial/-VialBoxLabelDocument';
import { getToday } from '@/utils/date';

const EMPTY_VIAL: VialData = { brand: '', name: '', abv: '', ppm: '' };

const NewVialBox = () => {
  const now = getToday();
  const bottles = useBottles();

  const [labeledAt, setLabeledAt] = useState(now);
  const [vials, setVials] = useState<VialData[]>(Array(VIAL_COUNT).fill(EMPTY_VIAL));
  const [selectedIds, setSelectedIds] = useState<string[]>(Array(VIAL_COUNT).fill(''));

  const vialBox = { vials, labeledAt };

  const updateVial = useCallback((index: number, patch: Partial<VialData>) => {
    setVials((prev) => prev.map((vial, i) => (i === index ? { ...vial, ...patch } : vial)));
  }, []);

  const handleSelectBottle = useCallback(
    (index: number, id: string) => {
      setSelectedIds((prev) => prev.map((selected, i) => (i === index ? id : selected)));
      const bottle = bottles.find((b) => b.id === id);
      if (!bottle) return;
      updateVial(index, {
        brand: bottle.brand,
        name: bottle.name,
        abv: bottle.abv,
        ppm: bottle.meta.toUpperCase() === 'PPM' ? bottle.metaValue : '',
      });
    },
    [bottles, updateVial],
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
        <FieldConatiner>
          <Field>
            <label htmlFor="labeledAt">{`> LABELED AT`}</label>
            <TextInput
              type="text"
              name="labeledAt"
              value={labeledAt}
              onChange={(e) => setLabeledAt(e.target.value)}
            />
          </Field>
          {vials.map((vial, index) => (
            <VialSlot key={index}>
              <Divider />
              <Space h={32} />
              <SlotTitle>{`> VIAL ${index + 1}`}</SlotTitle>
              <Space h={32} />
              <Field>
                <label htmlFor={`fromBottle-${index}`}>{`> FROM EXISTING BOTTLE`}</label>
                <Select
                  name={`fromBottle-${index}`}
                  value={selectedIds[index]}
                  onChange={(e) => handleSelectBottle(index, e.target.value)}
                >
                  <option value="">{'> MANUAL'}</option>
                  {bottles.map((b) => (
                    <option key={b.id} value={b.id}>
                      {`${b.brand} ${b.name}`}
                    </option>
                  ))}
                </Select>
              </Field>
              <Space h={32} />
              <Field>
                <label htmlFor={`brand-${index}`}>{`> DISTILLERY/BRAND`}</label>
                <TextInput
                  type="text"
                  name={`brand-${index}`}
                  value={vial.brand}
                  onChange={(e) => updateVial(index, { brand: e.target.value })}
                />
              </Field>
              <Space h={32} />
              <Field>
                <label htmlFor={`name-${index}`}>{`> BOTTLE NAME`}</label>
                <TextInput
                  type="text"
                  name={`name-${index}`}
                  value={vial.name}
                  onChange={(e) => updateVial(index, { name: e.target.value })}
                />
              </Field>
              <Space h={32} />
              <Field>
                <label htmlFor={`abv-${index}`}>{`> ABV`}</label>
                <TextInput
                  type="text"
                  name={`abv-${index}`}
                  value={vial.abv}
                  onChange={(e) => updateVial(index, { abv: e.target.value })}
                />
              </Field>
              <Space h={32} />
              <Field>
                <label htmlFor={`ppm-${index}`}>{`> PPM`}</label>
                <TextInput
                  type="text"
                  name={`ppm-${index}`}
                  value={vial.ppm}
                  onChange={(e) => updateVial(index, { ppm: e.target.value })}
                />
              </Field>
            </VialSlot>
          ))}
        </FieldConatiner>
        <StickyPreviewContainer>
          <VialBoxLabelCard vialBox={vialBox} />
        </StickyPreviewContainer>
      </FieldWithPreviewConatiner>
      <PrintRow>
        <BlobProvider document={<VialBoxLabelDocument vialBox={vialBox} />}>
          {({ url }) => (
            <PrintButton onClick={() => handlePrint(url)}>{'> PRINT LABEL'}</PrintButton>
          )}
        </BlobProvider>
      </PrintRow>
    </LayoutPanel>
  );
};

export default NewVialBox;

const VialSlot = styled.div`
  display: flex;
  flex-direction: column;
`;

const SlotTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const StickyPreviewContainer = styled(PreviewContainer)`
  align-items: flex-start;

  & > div {
    position: sticky;
    top: 32px;
  }
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
