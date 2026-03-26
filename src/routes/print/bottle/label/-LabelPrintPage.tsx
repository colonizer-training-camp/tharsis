import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

import BottleLabelSvg, { SVG_H, SVG_W } from '@/components/BottleLabelSvg';
import type { Bottle } from '@/routes/print/bottle/-types';
import { BLACK, BLACK_SUB, GREY } from '@/styles/colors';

const PAGE_W_MM = 80;
const PAGE_H_MM = 56;

const PREVIEW_SCALE = 4;

const printStyles = css`
  @media print {
    @page {
      size: ${PAGE_W_MM}mm ${PAGE_H_MM}mm;
      margin: 0;
    }

    html,
    body,
    #root {
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Hide all root children (Header, Layout, Footer) */
    #root > * {
      display: none !important;
    }

    /* Show only the Layout ancestor that contains the print area */
    #root > *:has(#label-print-area) {
      display: block !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    #label-print-screen {
      display: none !important;
    }

    #label-print-area {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: ${PAGE_W_MM}mm;
      height: ${PAGE_H_MM}mm;
      margin: 0;
      padding: 0;
    }

    #label-print-area svg {
      width: ${SVG_W}mm;
      height: ${SVG_H}mm;
    }
  }
`;

const LabelPrintPage = ({ bottle }: { bottle: Bottle }) => {
  return (
    <>
      <Global styles={printStyles} />
      <Root id="label-print-root">
        <ScreenContent id="label-print-screen">
          <PreviewSection>
            <PreviewLabel>PRINT PREVIEW</PreviewLabel>
            <PagePreview>
              <SvgContainer>
                <BottleLabelSvg bottle={bottle} />
              </SvgContainer>
            </PagePreview>
            <LabelInfo>
              {bottle.brand} &mdash; {bottle.name}
            </LabelInfo>
          </PreviewSection>

          <NoticeSection>
            <NoticeTitle>PRINTER SETUP</NoticeTitle>
            <NoticeList>
              <NoticeItem>
                Set paper size to{' '}
                <Strong>
                  {PAGE_W_MM.toFixed(1)}
                  mm &times; {PAGE_H_MM.toFixed(1)}mm
                </Strong>
              </NoticeItem>
              <NoticeItem>
                Set margins to <Strong>None</Strong>
              </NoticeItem>
              <NoticeItem>
                Set scale to <Strong>100%</Strong> (do not fit to page)
              </NoticeItem>
              <NoticeItem>Disable headers and footers</NoticeItem>
              <NoticeItem>
                Orientation: <Strong>Landscape</Strong>
              </NoticeItem>
            </NoticeList>
            <PrintButton onClick={() => window.print()}>{'> PRINT'}</PrintButton>
          </NoticeSection>
        </ScreenContent>

        <PrintArea id="label-print-area">
          <BottleLabelSvg bottle={bottle} />
        </PrintArea>
      </Root>
    </>
  );
};

export default LabelPrintPage;

const Root = styled.div``;

const ScreenContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 32px 0;
`;

const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const PreviewLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${BLACK_SUB};
  letter-spacing: 0.1em;
`;

const PagePreview = styled.div`
  width: ${PAGE_W_MM * PREVIEW_SCALE}px;
  height: ${PAGE_H_MM * PREVIEW_SCALE}px;
  background: white;
  border: 1px solid ${GREY};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: ${PAGE_W_MM * PREVIEW_SCALE * 0.6}px;
    height: ${PAGE_H_MM * PREVIEW_SCALE * 0.6}px;
  }
`;

const SvgContainer = styled.div`
  width: ${SVG_W * PREVIEW_SCALE}px;
  height: ${SVG_H * PREVIEW_SCALE}px;

  svg {
    width: ${SVG_W * PREVIEW_SCALE}px;
    height: ${SVG_H * PREVIEW_SCALE}px;
  }

  @media (max-width: 1200px) {
    width: ${SVG_W * PREVIEW_SCALE * 0.6}px;
    height: ${SVG_H * PREVIEW_SCALE * 0.6}px;
  }
`;

const LabelInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${BLACK};
`;

const NoticeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  width: 100%;
`;

const NoticeTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${BLACK};
`;

const NoticeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoticeItem = styled.li`
  font-size: 14px;
  color: ${BLACK};

  &::before {
    content: '> ';
    font-weight: bold;
  }
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const PrintButton = styled.button`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 12px 0;
  text-align: center;
  background: ${BLACK};
  color: white;
  border: none;
`;

const PrintArea = styled.div`
  display: none;
`;
