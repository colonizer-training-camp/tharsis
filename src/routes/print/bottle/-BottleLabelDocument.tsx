import { Document, Font, StyleSheet, Text, View } from '@react-pdf/renderer';

import { LABEL_BASE_H, LABEL_HEADER } from '@/constants/label';
import DefaultLabelPdfPage from '@/routes/print/-DefaultLabelPdfPage';

import type { Bottle } from './-types';

Font.registerHyphenationCallback((word) => [word]);

const pdfStyles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 16,
  },
  container: {
    height: LABEL_BASE_H,
    aspectRatio: 2 / 3,
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
    heigth: 16,
    fontSize: 8,
    marginTop: 6,
    maxLines: 1,
    textOverflow: 'ellipsis',
  } as const,
  name: {
    heigth: 32,
    fontSize: 10,
    marginTop: 4,
    textOverflow: 'ellipsis',
  } as const,
  description: {
    heigth: 16,
    fontSize: 6,
    marginTop: 4,
    maxLines: 2,
    textOverflow: 'ellipsis',
  } as const,
  labelledSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  labelledLabel: {
    fontSize: 5,
  },
  labelledDate: {
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
    height: 24,
  },
  bottomColumn: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomLabel: {
    fontSize: 5,
  },
  bottomValue: {
    fontSize: 10,
  },
  bottomValueSmall: {
    fontSize: 7,
    maxLines: 1,
    textOverflow: 'ellipsis',
  } as const,
});

const BottleLabelDocument = ({ bottle }: { bottle: Bottle }) => {
  const { brand, name, description, labelledAt, abv, meta, metaValue } = bottle;

  return (
    <Document title={`${brand}_${name}_${labelledAt}`}>
      <DefaultLabelPdfPage>
        <View style={pdfStyles.page}>
          <View style={pdfStyles.container}>
            <Text style={pdfStyles.header}>{LABEL_HEADER}</Text>
            <View style={pdfStyles.body}>
              <Text style={pdfStyles.brand}>{brand}</Text>
              <Text style={pdfStyles.name}>{name}</Text>
              <Text style={pdfStyles.description}>{description}</Text>
              <View style={pdfStyles.labelledSection}>
                <Text style={pdfStyles.labelledLabel}>LABELLED</Text>
                <Text style={pdfStyles.labelledDate}>{labelledAt}</Text>
              </View>
              <View style={pdfStyles.separator} />
              <View style={pdfStyles.bottomSection}>
                <View style={pdfStyles.bottomColumn}>
                  <Text style={pdfStyles.bottomLabel}>%VOL</Text>
                  <Text style={abv.length > 4 ? pdfStyles.bottomValueSmall : pdfStyles.bottomValue}>
                    {abv}
                  </Text>
                </View>
                <View style={pdfStyles.bottomColumn}>
                  <Text style={pdfStyles.bottomLabel}>{meta}</Text>
                  <Text
                    style={
                      metaValue.length > 4 ? pdfStyles.bottomValueSmall : pdfStyles.bottomValue
                    }
                  >
                    {metaValue}
                  </Text>
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
