import { Document, Font, StyleSheet, Text, View } from '@react-pdf/renderer';

import { LABEL_BASE_H, LABEL_HEADER } from '@/constants/label';
import DefaultLabelPdfPage from '@/routes/print/-DefaultLabelPdfPage';
import { parseAbvParts, splitNameWithParenthetical } from '@/utils/labelFormat';

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
  nameBlock: {
    height: 24,
    marginTop: 4,
  },
  nameMain: {
    fontSize: 10,
    lineHeight: 1.15,
    textOverflow: 'ellipsis',
  } as const,
  nameParen: {
    fontSize: 7,
    lineHeight: 1.15,
    textOverflow: 'ellipsis',
  } as const,
  description: {
    heigth: 16,
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
    fontSize: 11,
  },
  bottomValueInlineRow: {
    whiteSpace: 'nowrap',
  } as const,
  bottomValueInline: {
    fontSize: 11,
  },
  bottomValueSmall: {
    fontSize: 7,
    maxLines: 1,
    textOverflow: 'ellipsis',
  } as const,
});

const BottleNameLines = ({ name }: { name: string }) => {
  const { main, parenLine } = splitNameWithParenthetical(name);
  return (
    <View style={pdfStyles.nameBlock}>
      <Text style={pdfStyles.nameMain}>{main}</Text>
      {parenLine && <Text style={pdfStyles.nameParen}>{parenLine}</Text>}
    </View>
  );
};

const FooterDecimalValue = ({ value }: { value: string }) => {
  const parsed = parseAbvParts(value);
  if (parsed.mode === 'split') {
    return (
      <Text style={pdfStyles.bottomValueInlineRow}>
        <Text style={pdfStyles.bottomValueInline}>{parsed.integer}</Text>
        <Text style={pdfStyles.bottomValueSmall}>{parsed.fractionWithDot}</Text>
      </Text>
    );
  }
  if (parsed.value.length > 4) {
    return <Text style={pdfStyles.bottomValueSmall}>{parsed.value}</Text>;
  }
  return <Text style={pdfStyles.bottomValue}>{parsed.value}</Text>;
};

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
              <BottleNameLines name={name} />
              <Text style={pdfStyles.description}>{description}</Text>
              <View style={pdfStyles.labeledSection}>
                <Text style={pdfStyles.labeledLabel}>LABELED</Text>
                <Text style={pdfStyles.labeledDate}>{labeledAt}</Text>
              </View>
              <View style={pdfStyles.separator} />
              <View style={pdfStyles.bottomSection}>
                <View style={pdfStyles.bottomColumn}>
                  <Text style={pdfStyles.bottomLabel}>%VOL</Text>
                  <FooterDecimalValue value={abv} />
                </View>
                <View style={pdfStyles.bottomColumn}>
                  <Text style={pdfStyles.bottomLabel}>{meta}</Text>
                  <FooterDecimalValue value={metaValue} />
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
