import { Document, Font, StyleSheet, Text, View } from '@react-pdf/renderer';

import { LABEL_BASE_H, LABEL_BASE_W, LABEL_HEADER } from '@/constants/label';
import DefaultLabelPdfPage from '@/routes/print/-DefaultLabelPdfPage';

import type { Bottle } from './-types';

Font.registerHyphenationCallback((word) => [word]);

const pdfStyles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  container: {
    width: LABEL_BASE_W,
    height: LABEL_BASE_H,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 5,
    padding: '2 4',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 2,
    overflow: 'hidden',
  },
  brand: {
    fontSize: 8,
    marginTop: 6,
    maxLines: 1,
    textOverflow: 'ellipsis',
  } as const,
  name: {
    fontSize: 10,
    marginTop: 4,
  },
  description: {
    fontSize: 6,
    marginTop: 4,
    maxLines: 2,
    textOverflow: 'ellipsis',
  } as const,
  labeledSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  labeledLabel: {
    fontSize: 5,
  },
  labeledDate: {
    fontSize: 6,
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '1 3',
    marginTop: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginTop: 4,
    marginBottom: 4,
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'row',
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

const BottleLabelDocument = ({ bottle }: { bottle: Bottle }) => {
  const { brand, name, description, labeledAt, abv, meta, metaValue } = bottle;

  return (
    <Document title={`${brand}_${name}_${labeledAt}`}>
      <DefaultLabelPdfPage>
        <View style={pdfStyles.page}>
          <View style={pdfStyles.container}>
            <Text style={pdfStyles.header}>{LABEL_HEADER}</Text>
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
  );
};

export default BottleLabelDocument;
