import {
  Document,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
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

const pdfStyles = StyleSheet.create({
  container: {
    padding: 8,
    display: "flex",
    flexDirection: "column",
  },
  brand: {
    fontSize: 8,
    textTransform: "uppercase",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    fontSize: 7,
    marginTop: 2,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
  detail: {
    fontSize: 8,
  },
});

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
                <View style={pdfStyles.container}>
                  <Text style={pdfStyles.brand}>{brand}</Text>
                  <Text style={pdfStyles.name}>{name}</Text>
                  <Text style={pdfStyles.description}>{description}</Text>
                  <View style={pdfStyles.row}>
                    <Text style={pdfStyles.detail}>{labeledAt}</Text>
                    <Text style={pdfStyles.detail}>
                      {abv ? `${abv}%` : ""}
                    </Text>
                    <Text style={pdfStyles.detail}>
                      {metaValue ? `${metaValue} ${meta}` : ""}
                    </Text>
                  </View>
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
