import { PDFViewer } from '@react-pdf/renderer';

import type { Bottle } from './-types';
import BottleLabelDocument from './-BottleLabelDocument';

const BottleLabelPreview = ({ bottle }: { bottle: Bottle }) => {
  return (
    <PDFViewer style={{ width: '320px', height: '280px' }}>
      <BottleLabelDocument bottle={bottle} />
    </PDFViewer>
  );
};

export default BottleLabelPreview;
