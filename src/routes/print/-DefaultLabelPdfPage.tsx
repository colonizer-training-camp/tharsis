import type { PropsWithChildren } from 'react';
import { Page, type PageProps,StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: 12,
  },
});

const DefaultLabelPdfPage = ({ children, ...rest }: PropsWithChildren<PageProps>) => {
  return (
    <Page size={[3 * 72, 2 * 72]} style={styles.page} {...rest}>
      {children}
    </Page>
  );
};

export default DefaultLabelPdfPage;
