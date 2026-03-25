import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { BlobProvider } from '@react-pdf/renderer';

import BottleLabelCard from '@/components/BottleLabelCard';
import LayoutPanel from '@/components/LayoutPanel';
import Space from '@/components/Space';
import { Divider } from '@/components/styledComponents';
import {
  Field,
  FieldConatiner,
  FieldWithPreviewConatiner,
  PreviewContainer,
  TextFieldInput,
  TextInput,
} from '@/routes/print/-styledComponents';
import BottleLabelDocument from '@/routes/print/bottle/-BottleLabelDocument';
import { getToday } from '@/utils/date';
import { scrapeWhiskybase } from '@/utils/scrapeWhiskybase';

const NewBottle = () => {
  const now = getToday();

  const [whiskybase, setWhiskybase] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [labelledAt, setLabelledAt] = useState(now);
  const [abv, setAbv] = useState('');
  const [meta, setMeta] = useState('YRS');
  const [metaValue, setMetaValue] = useState('');

  const bottle = {
    brand,
    name,
    description,
    labelledAt,
    abv,
    meta,
    metaValue,
    whiskybase: whiskybase || undefined,
  };

  const handleAutoGenerate = useCallback(async () => {
    if (!whiskybase) return;
    setIsGenerating(true);
    try {
      const data = await scrapeWhiskybase(whiskybase);
      setBrand(data.brand);
      setName(data.name);
      setDescription(data.description);
      setAbv(data.abv);
      setMeta(data.meta);
      setMetaValue(data.metaValue);
    } catch {
      alert('Failed to fetch data from Whiskybase.');
    } finally {
      setIsGenerating(false);
    }
  }, [whiskybase]);

  const handlePrint = useCallback((url: string | null) => {
    if (!url) return;
    const w = window.open(url, '_blank');
    if (w) {
      w.addEventListener('load', () => w.print());
    }
  }, []);

  return (
    <LayoutPanel>
      <WhiskybaseRow>
        <Field>
          <label htmlFor="whiskybase">{`> WHISKYBASE LINK`}</label>
          <TextInput
            type="text"
            name="whiskybase"
            value={whiskybase}
            onChange={(e) => setWhiskybase(e.target.value)}
          />
        </Field>
        <AutoGenerateButton onClick={handleAutoGenerate} disabled={!whiskybase || isGenerating}>
          {isGenerating ? '> LOADING...' : '> AUTO-GENERATE'}
        </AutoGenerateButton>
      </WhiskybaseRow>
      <Space h={32} />
      <Divider />
      <Space h={32} />
      <FieldWithPreviewConatiner>
        <FieldConatiner>
          <Field>
            <label htmlFor="brand">{`> DISTILLERY/BRAND`}</label>
            <TextInput
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="name">{`> BOTTLE NAME`}</label>
            <TextInput
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="description">{`> DESCRIPTION`}</label>
            <TextFieldInput
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="labelledAt">{`> LABELLED AT`}</label>
            <TextInput
              type="text"
              name="labelledAt"
              value={labelledAt}
              onChange={(e) => setLabelledAt(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="abv">{`> ABV`}</label>
            <TextInput
              type="text"
              name="abv"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="meta">{`> META`}</label>
            <TextInput
              type="text"
              name="meta"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="metaValue">{`> META VALUE`}</label>
            <TextInput
              type="text"
              name="metaValue"
              value={metaValue}
              onChange={(e) => setMetaValue(e.target.value)}
            />
          </Field>
        </FieldConatiner>
        <PreviewContainer>
          <BottleLabelCard bottle={bottle} />
        </PreviewContainer>
      </FieldWithPreviewConatiner>
      <PrintRow>
        <BlobProvider document={<BottleLabelDocument bottle={bottle} />}>
          {({ url }) => (
            <PrintButton onClick={() => handlePrint(url)}>{'> PRINT LABEL'}</PrintButton>
          )}
        </BlobProvider>
      </PrintRow>
    </LayoutPanel>
  );
};

export default NewBottle;

const PrintRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const WhiskybaseRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
`;

const AutoGenerateButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 0;
  white-space: nowrap;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrintButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
`;
