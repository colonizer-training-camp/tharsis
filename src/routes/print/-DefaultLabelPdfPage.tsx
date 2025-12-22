import { Page, StyleSheet, type PageProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 12,
  },
});

const DefaultLabelPdfPage = ({
  children,
  ...rest
}: PropsWithChildren<PageProps>) => {
  return (
    <Page size={[3 * 72, 2 * 72]} style={styles.page} {...rest}>
      {children}
    </Page>
  );
};

export default DefaultLabelPdfPage;
