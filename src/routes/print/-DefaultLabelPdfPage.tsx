import type { PropsWithChildren } from 'react';
import { Page, type PageProps, StyleSheet } from '@react-pdf/renderer';

import { LABEL_BASE_H, LABEL_BASE_W } from '@/constants/label';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 12,
  },
});

const DefaultLabelPdfPage = ({ children, ...rest }: PropsWithChildren<PageProps>) => {
  return (
    <Page {...rest} size={[LABEL_BASE_W, LABEL_BASE_H]} style={styles.page}>
      {children}
    </Page>
  );
};

export default DefaultLabelPdfPage;
