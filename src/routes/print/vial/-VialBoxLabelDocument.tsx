import { Document, Font, Polygon, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

import {
  LABEL_HEADER,
  VIAL_ARROW_H,
  VIAL_ARROW_POLYGONS,
  VIAL_ARROW_VIEWBOX,
  VIAL_ARROW_W,
  VIAL_CARE_INSTRUCTIONS,
  VIAL_LABEL_BASE_H,
  VIAL_LABEL_BASE_W,
  VIAL_LABEL_HEADER_MID,
  VIAL_LABEL_HEADER_PRE,
} from '@/constants/label';
import DefaultLabelPdfPage from '@/routes/print/-DefaultLabelPdfPage';
import { fitCellFontSize } from '@/utils/labelFormat';

import type { VialBox, VialData } from './-types';

// Characters that fit in a half-column value cell at the base font sizes below.
const META_LABEL_MAX_LEN = 8;
const META_VALUE_MAX_LEN = 5;

Font.registerHyphenationCallback((word) => [word]);

const pdfStyles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Helvetica-Bold',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  banner: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 6,
    padding: '1.5 4',
  },
  bannerSerif: {
    fontFamily: 'Times-Italic',
    fontSize: 5.5,
  },
  labeledSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginBottom: 1,
  },
  labeledLabel: {
    fontSize: 5.5,
  },
  labeledDate: {
    fontSize: 8,
    lineHeight: 0.85,
  },
  vialsRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 9,
  },
  vialColumn: {
    width: '33.3333%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  vialColumnFirst: {
    paddingLeft: 0,
  },
  vialColumnLast: {
    paddingRight: 0,
  },
  vialColumnDivider: {
    borderRightWidth: 0.5,
    borderRightColor: '#000000',
  },
  brand: {
    fontSize: 5.5,
    maxLines: 1,
    textOverflow: 'ellipsis',
  } as const,
  name: {
    fontSize: 9,
    lineHeight: 1.15,
    marginTop: 2,
  },
  valuesRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
  },
  valueColumn: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  valueLabel: {
    fontSize: 5.5,
  },
  value: {
    fontSize: 9,
    lineHeight: 1,
    marginTop: 2,
    maxLines: 1,
    textOverflow: 'ellipsis',
  } as const,
  bottomSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 2,
  },
  instructions: {
    fontSize: 5.5,
    lineHeight: 1.45,
  },
  thisSideUp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  thisSideUpText: {
    fontSize: 5.5,
    lineHeight: 1.1,
    textAlign: 'right',
  } as const,
});

const isEmptyVial = (vial: VialData) => !vial.brand && !vial.name && !vial.abv && !vial.metaValue;

const VialColumn = ({ vial, index, count }: { vial: VialData; index: number; count: number }) => {
  const style = [
    pdfStyles.vialColumn,
    ...(index === 0 ? [pdfStyles.vialColumnFirst] : []),
    ...(index === count - 1 ? [pdfStyles.vialColumnLast] : [pdfStyles.vialColumnDivider]),
  ];

  return (
    <View style={style}>
      {!isEmptyVial(vial) && (
        <>
          <Text style={pdfStyles.brand}>{vial.brand}</Text>
          <Text style={pdfStyles.name}>{vial.name}</Text>
          <View style={pdfStyles.valuesRow}>
            <View style={pdfStyles.valueColumn}>
              <Text style={pdfStyles.valueLabel}>%VOL</Text>
              <Text style={pdfStyles.value}>{vial.abv}</Text>
            </View>
            <View style={pdfStyles.valueColumn}>
              <Text
                style={[
                  pdfStyles.valueLabel,
                  { fontSize: fitCellFontSize(5.5, META_LABEL_MAX_LEN, vial.meta) },
                ]}
              >
                {vial.meta}
              </Text>
              <Text
                style={[
                  pdfStyles.value,
                  { fontSize: fitCellFontSize(9, META_VALUE_MAX_LEN, vial.metaValue) },
                ]}
              >
                {vial.metaValue}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const VialBoxLabelDocument = ({ vialBox }: { vialBox: VialBox }) => {
  const { vials, labeledAt } = vialBox;

  return (
    <Document title={`VIALS_${labeledAt}`}>
      <DefaultLabelPdfPage size={[VIAL_LABEL_BASE_H, VIAL_LABEL_BASE_W]}>
        <View style={pdfStyles.container}>
          <View style={pdfStyles.headerRow}>
            <Text style={pdfStyles.banner}>
              {VIAL_LABEL_HEADER_PRE}
              <Text style={pdfStyles.bannerSerif}>{` ${VIAL_LABEL_HEADER_MID} `}</Text>
              {LABEL_HEADER}
            </Text>
            <View style={pdfStyles.labeledSection}>
              <Text style={pdfStyles.labeledLabel}>LABELED</Text>
              <Text style={pdfStyles.labeledDate}>{labeledAt}</Text>
            </View>
          </View>
          <View style={pdfStyles.vialsRow}>
            {vials.map((vial, index) => (
              <VialColumn key={index} vial={vial} index={index} count={vials.length} />
            ))}
          </View>
          <View style={pdfStyles.bottomSection}>
            <View style={pdfStyles.instructions}>
              {VIAL_CARE_INSTRUCTIONS.map((line) => (
                <Text key={line}>{line}</Text>
              ))}
            </View>
            <View style={pdfStyles.thisSideUp}>
              <View style={pdfStyles.thisSideUpText}>
                <Text>THIS</Text>
                <Text>SIDE</Text>
                <Text>UP</Text>
              </View>
              <Svg viewBox={VIAL_ARROW_VIEWBOX} width={VIAL_ARROW_W} height={VIAL_ARROW_H}>
                {VIAL_ARROW_POLYGONS.map((points) => (
                  <Polygon key={points} points={points} fill="#000000" />
                ))}
              </Svg>
            </View>
          </View>
        </View>
      </DefaultLabelPdfPage>
    </Document>
  );
};

export default VialBoxLabelDocument;
