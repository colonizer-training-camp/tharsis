import { Document, PDFViewer, Text, View } from "@react-pdf/renderer";
import { useState } from "react";
import DefaultLabelPdfPage from "../-DefaultLabelPdfPage";
import {
  Field,
  FieldConatiner,
  FieldWithPreviewConatiner,
  PreviewContainer,
  TextFieldInput,
  TextInput,
} from "../-styledComponents";
import LayoutPanel from "../../../components/LayoutPanel";

const PrintBottle = () => {
  const now = new Date().toISOString().slice(2, 10);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [labeledAt, setLabeledAt] = useState(now);
  const [abv, setAbv] = useState("");
  const [meta, setMeta] = useState("YRS");
  const [metaValue, setMetaValue] = useState("");

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
          <PDFViewer style={{ width: "320px", height: "280px" }}>
            <Document title={`${brand}_${name}_${labeledAt}`}>
              <DefaultLabelPdfPage>
                <View>
                  <Text>asasdfasfsadfdsdf</Text>
                </View>
              </DefaultLabelPdfPage>
            </Document>
          </PDFViewer>
        </PreviewContainer>
      </FieldWithPreviewConatiner>
    </LayoutPanel>
  );
};

export default PrintBottle;
