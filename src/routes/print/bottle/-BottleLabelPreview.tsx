import { PDFViewer } from '@react-pdf/renderer';

import BottleLabelDocument from './-BottleLabelDocument';
import type { Bottle } from './-types';

const BottleLabelPreview = ({ bottle }: { bottle: Bottle }) => {
  return (
    <PDFViewer style={{ width: '320px', height: '280px' }}>
      <BottleLabelDocument bottle={bottle} />
    </PDFViewer>
  );
};

export default BottleLabelPreview;
