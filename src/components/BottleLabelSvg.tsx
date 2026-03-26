import { LABEL_HEADER } from '@/constants/label';
import type { Bottle } from '@/routes/print/bottle/-types';
import { BLACK, WHITE } from '@/styles/colors';
import { parseAbvParts, splitNameWithParenthetical } from '@/utils/labelFormat';

// SVG viewBox dimensions in mm
export const SVG_W = 32;
export const SVG_H = 45;

const FONT_FAMILY = "'Geist', sans-serif";

// pt to mm conversion: 1pt = 0.35278mm
const pt = (pt: number) => pt * 0.35278;

// Layout constants (mm, converted from original pt values)
const HEADER_PAD_X = 0.6;
const HEADER_PAD_Y = 1.0;
const HEADER_FONT_SIZE = 1.8;
const HEADER_HEIGHT = 3.6;

const LABEL_PAD_Y = 0;
const BODY_PAD = pt(2);

const BRAND_FONT_SIZE = pt(8);
const BRAND_MARGIN_TOP = 4.8;

const NAME_MARGIN_TOP = 3.8;
const NAME_MAIN_FONT_SIZE = pt(10);
const NAME_PAREN_FONT_SIZE = pt(5);
const NAME_LINE_HEIGHT = 1.15;
const NAME_BLOCK_HEIGHT = pt(24);

const DESC_FONT_SIZE = pt(5);
const DESC_MARGIN_TOP = pt(4);
const DESC_LINE_HEIGHT = 1.15;

const LABELLED_LABEL_FONT_SIZE = pt(5);
const LABELLED_DATE_FONT_SIZE = pt(6);
const LABELLED_DATE_PAD_Y = 0.8;
const LABELLED_DATE_W = 12.2;
const LABELLED_DATE_H = 3.6;

const SEP_MARGIN_TOP = 1.6;
const SEP_MARGIN_BOTTOM = 1.6;

const BOTTOM_HEIGHT = 7.2;
const BOTTOM_LABEL_FONT_SIZE = pt(5);
const BOTTOM_VALUE_FONT_SIZE = pt(16);
const BOTTOM_VALUE_SMALL_FONT_SIZE = pt(8);

// --- helpers ---

/** Approximate top-aligned baseline: topY + fontSize * 0.8 (typical ascender ratio) */
function bl(topY: number, fontSize: number): number {
  return topY + fontSize * 0.8;
}

// --- component ---

type TProps = {
  text: string;
  x: number;
  y: number;
  size: number;
  fill: string;
  anchor?: 'start' | 'middle' | 'end';
};
const T = ({ text, x, y, size, fill, anchor }: TProps) =>
  text ? (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontFamily={FONT_FAMILY}
      fontWeight="bold"
      fill={fill}
      textAnchor={anchor}
      dominantBaseline="auto"
    >
      {text}
    </text>
  ) : null;

type Props = {
  bottle: Bottle;
  face?: 'front' | 'back';
  debug?: boolean;
};

const BottleLabelSvg = ({ bottle, face = 'front', debug = true }: Props) => {
  const { brand, name, description, labelledAt, abv, meta, metaValue, whiskybase } = bottle;
  const { main: nameMain, parenLine } = splitNameWithParenthetical(name);

  const bodyL = BODY_PAD;
  const bodyR = SVG_W - BODY_PAD;
  const bodyW = bodyR - bodyL;

  // Brand
  const brandTop = LABEL_PAD_Y + HEADER_HEIGHT + BODY_PAD + BRAND_MARGIN_TOP;

  // Name
  const nameTop = brandTop + BRAND_FONT_SIZE + NAME_MARGIN_TOP;
  const nameParenTop = nameTop + NAME_MAIN_FONT_SIZE * NAME_LINE_HEIGHT;

  // --- shared header + brand + name ---
  const shared = (
    <>
      <rect y={LABEL_PAD_Y} width={SVG_W + HEADER_PAD_X * 2} height={HEADER_HEIGHT} fill={BLACK} />
      <T
        text={LABEL_HEADER}
        x={HEADER_PAD_X}
        y={bl(LABEL_PAD_Y + HEADER_PAD_Y, HEADER_FONT_SIZE)}
        size={HEADER_FONT_SIZE}
        fill={WHITE}
      />
      <T
        text={brand}
        x={bodyL}
        y={bl(brandTop, BRAND_FONT_SIZE)}
        size={BRAND_FONT_SIZE}
        fill={BLACK}
      />
      <T
        text={nameMain}
        x={bodyL}
        y={bl(nameTop, NAME_MAIN_FONT_SIZE)}
        size={NAME_MAIN_FONT_SIZE}
        fill={BLACK}
      />
      {parenLine && (
        <T
          text={parenLine}
          x={bodyL}
          y={bl(nameParenTop, NAME_PAREN_FONT_SIZE)}
          size={NAME_PAREN_FONT_SIZE}
          fill={BLACK}
        />
      )}
    </>
  );

  // --- back face ---
  if (face === 'back') {
    const linkText = '> WHISKYBASE';
    const linkFs = pt(6);
    const linkPad = pt(4);
    const linkH = linkFs + 2 * linkPad;
    const linkY = SVG_H - LABEL_PAD_Y - BODY_PAD - linkH;

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} xmlns="http://www.w3.org/2000/svg">
        <rect width={SVG_W} height={SVG_H} fill={WHITE} />
        {shared}
        {whiskybase && (
          <a href={whiskybase} target="_blank" rel="noopener noreferrer">
            <rect
              x={bodyL}
              y={linkY}
              width={bodyW}
              height={linkH}
              fill="none"
              stroke={BLACK}
              strokeWidth={pt(1)}
            />
            <T
              text={linkText}
              x={bodyL + bodyW / 2}
              y={bl(linkY + linkPad, linkFs)}
              size={linkFs}
              fill={BLACK}
              anchor="middle"
            />
          </a>
        )}
      </svg>
    );
  }

  // --- front face (from bottom up) ---
  const bodyBottom = SVG_H;

  // Bottom section
  const bottomY = bodyBottom - BOTTOM_HEIGHT;
  const colW = bodyW / 2;

  // Separator
  const sepY = bottomY - SEP_MARGIN_BOTTOM;

  // Labelled section (right-aligned, above separator)
  const labelledBottom = sepY - SEP_MARGIN_TOP;
  const labelledDateH = LABELLED_DATE_FONT_SIZE + 2 * LABELLED_DATE_PAD_Y;
  const labelledDateTop = labelledBottom - labelledDateH;
  const labelledLabelTop = labelledDateTop - pt(1) - LABELLED_LABEL_FONT_SIZE;

  // Description
  const descTop = nameTop + NAME_BLOCK_HEIGHT + DESC_MARGIN_TOP;
  const descLines = description ? description.split('\n').slice(0, 2) : [];

  // Footer values
  const abvParsed = parseAbvParts(abv);
  const metaParsed = parseAbvParts(metaValue);

  const footerValue = (parsed: ReturnType<typeof parseAbvParts>, x: number) => {
    if (parsed.mode === 'split') {
      return (
        <text x={x} y={bodyBottom} fontFamily={FONT_FAMILY} fontWeight="bold" fill={BLACK}>
          <tspan fontSize={BOTTOM_VALUE_FONT_SIZE}>{parsed.integer}</tspan>
          <tspan fontSize={BOTTOM_VALUE_SMALL_FONT_SIZE}>{parsed.fractionWithDot}</tspan>
        </text>
      );
    }
    const small = parsed.value.length > 4;
    const fs = small ? BOTTOM_VALUE_SMALL_FONT_SIZE : BOTTOM_VALUE_FONT_SIZE;
    return <T text={parsed.value} x={x} y={bodyBottom} size={fs} fill={BLACK} />;
  };

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={SVG_W} height={SVG_H} fill={WHITE} />
      {shared}

      {/* DEBUG: overlay reference image */}
      {debug && (
        <image
          href={`${import.meta.env.BASE_URL}overlay.png`}
          x={0}
          y={0}
          width={SVG_W}
          height={SVG_H}
          opacity={0.3}
        />
      )}

      {/* Description */}
      {descLines.map((line, i) => {
        const lineTop = descTop + i * DESC_FONT_SIZE * DESC_LINE_HEIGHT;
        return (
          <T
            key={i}
            text={line}
            x={bodyL}
            y={bl(lineTop, DESC_FONT_SIZE)}
            size={DESC_FONT_SIZE}
            fill={BLACK}
          />
        );
      })}

      {/* Labelled (right-aligned) */}
      <T
        text="LABELLED"
        x={bodyR}
        y={bl(labelledLabelTop, LABELLED_LABEL_FONT_SIZE)}
        size={LABELLED_LABEL_FONT_SIZE}
        fill={BLACK}
        anchor="end"
      />
      <rect
        x={SVG_W - LABELLED_DATE_W + HEADER_PAD_X}
        y={labelledDateTop}
        width={LABELLED_DATE_W}
        height={LABELLED_DATE_H}
        fill={BLACK}
      />
      <T
        text={labelledAt}
        x={bodyR}
        y={bl(labelledDateTop + LABELLED_DATE_PAD_Y, LABELLED_DATE_FONT_SIZE)}
        size={LABELLED_DATE_FONT_SIZE}
        fill={WHITE}
        anchor="end"
      />

      {/* Separator */}
      <line
        x1={bodyL - HEADER_PAD_X}
        y1={sepY}
        x2={bodyR + HEADER_PAD_X}
        y2={sepY}
        stroke={BLACK}
        strokeWidth={pt(0.5)}
      />

      {/* Bottom: %VOL */}
      <T
        text="%VOL"
        x={bodyL}
        y={bl(bottomY, BOTTOM_LABEL_FONT_SIZE)}
        size={BOTTOM_LABEL_FONT_SIZE}
        fill={BLACK}
      />
      {footerValue(abvParsed, bodyL)}

      {/* Bottom: Meta */}
      <T
        text={meta}
        x={bodyL + colW}
        y={bl(bottomY, BOTTOM_LABEL_FONT_SIZE)}
        size={BOTTOM_LABEL_FONT_SIZE}
        fill={BLACK}
      />
      {footerValue(metaParsed, bodyL + colW)}
    </svg>
  );
};

export default BottleLabelSvg;
