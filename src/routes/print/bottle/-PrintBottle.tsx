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
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  container: {
    width: 96,
    height: 132,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Helvetica-Bold",
  },
  header: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 5,
    padding: "2 4",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    padding: 2,
  },
  brand: {
    fontSize: 8,
    marginTop: 6,
  },
  name: {
    fontSize: 10,
    marginTop: 4,
  },
  description: {
    fontSize: 6,
    marginTop: 4,
  },
  labeledSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "2",
  },
  labeledLabel: {
    fontSize: 5,
  },
  labeledDate: {
    fontSize: 6,
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "1 3",
    marginTop: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginTop: 4,
    marginBottom: 4,
  },
  bottomSection: {
    display: "flex",
    flexDirection: "row",
  },
  bottomColumn: {
    flex: 1,
  },
  bottomLabel: {
    fontSize: 5,
  },
  bottomValue: {
    fontSize: 10,
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
                <View style={pdfStyles.page}>
                  <View style={pdfStyles.container}>
                    <Text style={pdfStyles.header}>
                      COLONIZER TRAINING CAMP
                    </Text>
                    <View style={pdfStyles.body}>
                      <Text style={pdfStyles.brand}>{brand}</Text>
                      <Text style={pdfStyles.name}>{name}</Text>
                      <Text style={pdfStyles.description}>{description}</Text>
                      <View style={pdfStyles.labeledSection}>
                        <Text style={pdfStyles.labeledLabel}>LABELED</Text>
                        <Text style={pdfStyles.labeledDate}>{labeledAt}</Text>
                      </View>
                      <View style={pdfStyles.separator} />
                      <View style={pdfStyles.bottomSection}>
                        <View style={pdfStyles.bottomColumn}>
                          <Text style={pdfStyles.bottomLabel}>%VOL</Text>
                          <Text style={pdfStyles.bottomValue}>{abv}</Text>
                        </View>
                        <View style={pdfStyles.bottomColumn}>
                          <Text style={pdfStyles.bottomLabel}>{meta}</Text>
                          <Text style={pdfStyles.bottomValue}>{metaValue}</Text>
                        </View>
                      </View>
                    </View>
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
