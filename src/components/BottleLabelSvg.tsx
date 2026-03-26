import { LABEL_HEADER } from '@/constants/label';
import { measureText } from '@/data/geistBoldWidths';
import type { Bottle, Capitalization } from '@/routes/print/bottle/-types';
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
const BRAND_MARGIN_TOP = 4.0;

const NAME_MARGIN_TOP = 3.2;
const NAME_MAIN_FONT_SIZE = pt(10);
const NAME_LINE_HEIGHT = 1.15;

const SUB_FONT_SIZE = pt(5);
const SUB_LINE_HEIGHT = 1.15;
const SUB_MARGIN_TOP = 2;

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

/** Apply capitalization: defaults to uppercase unless explicitly overridden */
function cap(text: string, mode?: Capitalization): string {
  if (!text) return text;
  switch (mode) {
    case 'lowercase':
      return text.toLowerCase();
    case 'preserve':
      return text;
    default:
      return text.toUpperCase();
  }
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

function wrapText(text: string, fontSize: number, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = '';

  for (const word of words) {
    const test = cur ? `${cur} ${word}` : word;
    if (measureText(test, fontSize) <= maxWidth) {
      cur = test;
    } else {
      if (cur) {
        lines.push(cur);
        if (lines.length >= maxLines) return lines;
      }
      cur = word;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

/** Multi-line wrapping text using tspan elements */
type WrapProps = {
  text: string;
  x: number;
  y: number;
  width: number;
  size: number;
  fill: string;
  lineHeight?: number;
  maxLines?: number;
};
const Wrap = ({ text, x, y, width, size, fill, lineHeight = 1.15, maxLines = 2 }: WrapProps) => {
  if (!text) return null;
  const lines = wrapText(text, size, width, maxLines);
  const baseline = y + size * 0.8;
  return (
    <text
      x={x}
      fontSize={size}
      fontFamily={FONT_FAMILY}
      fontWeight="bold"
      fill={fill}
      dominantBaseline="auto"
    >
      {lines.map((line, i) => (
        <tspan key={i} x={x} y={baseline + i * size * lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

type Props = {
  bottle: Bottle;
  face?: 'front' | 'back';
  debug?: boolean;
};

const BottleLabelSvg = ({ bottle, face = 'front', debug = false }: Props) => {
  const {
    brand: rawBrand,
    name: rawName,
    description: rawDesc,
    labelledAt,
    abv,
    meta: rawMeta,
    metaValue: rawMetaValue,
    whiskybase,
  } = bottle;
  const {
    brandCapitalization,
    nameCapitalization,
    descriptionCapitalization,
    metaCapitalization,
    metaValueCapitalization,
  } = bottle;

  const brand = cap(rawBrand, brandCapitalization);
  const { main: nameMain, parenLine } = splitNameWithParenthetical(
    cap(rawName, nameCapitalization),
  );
  const description = rawDesc ? cap(rawDesc, descriptionCapitalization) : null;
  const meta = cap(rawMeta, metaCapitalization);
  const metaValue = cap(rawMetaValue, metaValueCapitalization);

  const bodyL = BODY_PAD;
  const bodyR = SVG_W - BODY_PAD;
  const bodyW = bodyR - bodyL;

  // Brand — shrink font if text overflows
  const brandTop = LABEL_PAD_Y + HEADER_HEIGHT + BODY_PAD + BRAND_MARGIN_TOP;
  const brandTextW = measureText(brand, BRAND_FONT_SIZE);
  const brandFontSize =
    brandTextW > bodyW ? BRAND_FONT_SIZE * (bodyW / brandTextW) : BRAND_FONT_SIZE;

  // Name — shrink font via binary search to fit within 2 lines (down to 85%)
  const nameTop = brandTop + brandFontSize + NAME_MARGIN_TOP;
  const nameFontSize = (() => {
    const maxLines = 2;
    if (wrapText(nameMain, NAME_MAIN_FONT_SIZE, bodyW, maxLines + 1).length <= maxLines) {
      return NAME_MAIN_FONT_SIZE;
    }
    let lo = NAME_MAIN_FONT_SIZE * 0.85;
    let hi = NAME_MAIN_FONT_SIZE;
    for (let i = 0; i < 10; i++) {
      const mid = (lo + hi) / 2;
      if (wrapText(nameMain, mid, bodyW, maxLines + 1).length <= maxLines) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return lo;
  })();
  const nameLines = wrapText(nameMain, nameFontSize, bodyW, 2);
  const nameBottom = nameTop + nameLines.length * nameFontSize * NAME_LINE_HEIGHT;

  // Paren (same size as desc, 2mm below name)
  const parenTop = parenLine ? nameBottom + SUB_MARGIN_TOP : nameBottom;
  const parenLines = parenLine ? wrapText(parenLine, SUB_FONT_SIZE, bodyW, 2) : [];
  const parenBottom = parenLine
    ? parenTop + parenLines.length * SUB_FONT_SIZE * SUB_LINE_HEIGHT
    : nameBottom;

  // Description (1mm below paren, or 2mm below name if no paren)
  const descMargin = description ? (parenLine ? 1 : SUB_MARGIN_TOP) : 0;
  const descTop = parenBottom + descMargin;

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
      <Wrap
        text={brand}
        x={bodyL}
        y={brandTop}
        width={bodyW}
        size={brandFontSize}
        fill={BLACK}
        maxLines={1}
      />
      <Wrap
        text={nameMain}
        x={bodyL}
        y={nameTop}
        width={bodyW}
        size={nameFontSize}
        fill={BLACK}
        lineHeight={NAME_LINE_HEIGHT}
        maxLines={2}
      />
      {parenLine && (
        <Wrap
          text={parenLine}
          x={bodyL}
          y={parenTop}
          width={bodyW}
          size={SUB_FONT_SIZE}
          fill={BLACK}
          lineHeight={SUB_LINE_HEIGHT}
          maxLines={2}
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
      {description && (
        <Wrap
          text={description}
          x={bodyL}
          y={descTop}
          width={bodyW}
          size={SUB_FONT_SIZE}
          fill={BLACK}
          lineHeight={SUB_LINE_HEIGHT}
          maxLines={3}
        />
      )}

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
