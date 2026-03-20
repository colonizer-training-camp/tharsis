import { useState } from 'react';

import LayoutPanel from '@/components/LayoutPanel';
import {
  Field,
  FieldConatiner,
  FieldWithPreviewConatiner,
  PreviewContainer,
  TextFieldInput,
  TextInput,
} from '@/routes/print/-styledComponents';
import BottleLabelPreview from '@/routes/print/bottle/-BottleLabelPreview';

const NewBottle = () => {
  const now = new Date().toISOString().slice(2, 10);

  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [labeledAt, setLabeledAt] = useState(now);
  const [abv, setAbv] = useState('');
  const [meta, setMeta] = useState('YRS');
  const [metaValue, setMetaValue] = useState('');

  return (
    <LayoutPanel>
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
            <label htmlFor="labeledAt">{`> LABELED AT`}</label>
            <TextInput
              type="text"
              name="labeledAt"
              value={labeledAt}
              onChange={(e) => setLabeledAt(e.target.value)}
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
          <BottleLabelPreview
            bottle={{ brand, name, description, labeledAt, abv, meta, metaValue }}
          />
        </PreviewContainer>
      </FieldWithPreviewConatiner>
    </LayoutPanel>
  );
};

export default NewBottle;
