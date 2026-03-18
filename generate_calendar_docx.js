const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  PageOrientation,
} = require("docx");

// Theme Colors
const THEME = {
  TITLE: "1E2761", // Navy Blue
  WEEKDAY_BG: "F5F7FA", // Light Gray for weekday header
  WEEKEND_SUNDAY: "D32F2F", // Red for Sunday
  WEEKEND_SATURDAY: "1976D2", // Blue for Saturday
  BORDER: "B0BEC5", // Gray Border
  TEXT: "333333", // Dark Gray
  DAY_TEXT: "757575", // Light Gray for dates
};

// Target Month: March 2026
const year = 2026;
const month = 3; // 1-indexed for display
const monthName = "March 2026";
const daysInMonth = new Date(year, month, 0).getDate(); // 31 days
const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 = Sunday, 1 = Monday, etc. (March 1, 2026 is Sunday)

// Page properties for US Letter Landscape
// As per docx-js rules for landscape, pass short edge as width, long edge as height
const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const MARGIN = 720; // 0.5 inch margins
const CONTENT_WIDTH = PAGE_HEIGHT - MARGIN * 2; // 15840 - 1440 = 14400 DXA
const COL_WIDTH = Math.floor(CONTENT_WIDTH / 7);

// Weekdays Header
const weekdays = [
  "일 (Sun)",
  "월 (Mon)",
  "화 (Tue)",
  "수 (Wed)",
  "목 (Thu)",
  "금 (Fri)",
  "토 (Sat)",
];
const headerCells = weekdays.map((day, index) => {
  let color = THEME.TEXT;
  if (index === 0) color = THEME.WEEKEND_SUNDAY;
  if (index === 6) color = THEME.WEEKEND_SATURDAY;

  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: day,
            bold: true,
            color: color,
            font: "Malgun Gothic",
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    ],
    width: { size: COL_WIDTH, type: WidthType.DXA },
    shading: { fill: THEME.WEEKDAY_BG, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    borders: createBorders(),
  });
});

function createBorders() {
  const border = { style: BorderStyle.SINGLE, size: 4, color: THEME.BORDER };
  return { top: border, bottom: border, left: border, right: border };
}

// Generate Calendar Rows
const rows = [new TableRow({ children: headerCells })];

let currentDate = 1;
// Maximum 6 rows for calendar dates
for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
  const cells = [];
  for (let colIdx = 0; colIdx < 7; colIdx++) {
    let cellContent = "";
    let dayColor = THEME.TEXT;

    if (colIdx === 0) dayColor = THEME.WEEKEND_SUNDAY;
    if (colIdx === 6) dayColor = THEME.WEEKEND_SATURDAY;

    if (rowIdx === 0 && colIdx < firstDayOfWeek) {
      // Empty cells before the 1st of the month
      cellContent = "";
    } else if (currentDate <= daysInMonth) {
      cellContent = currentDate.toString();
      currentDate++;
    }

    cells.push(
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cellContent,
                bold: true,
                size: 28,
                color: dayColor,
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: { after: 1200 }, // Provide some vertical space for writing
          }),
        ],
        width: { size: COL_WIDTH, type: WidthType.DXA },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        borders: createBorders(),
      }),
    );
  }
  rows.push(new TableRow({ children: cells }));

  // Stop adding rows if we've rendered all days
  if (currentDate > daysInMonth) {
    break;
  }
}

// Create Document
const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: {
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            orientation: PageOrientation.LANDSCAPE,
          },
          margin: {
            top: MARGIN,
            right: MARGIN,
            bottom: MARGIN,
            left: MARGIN,
          },
        },
      },
      children: [
        new Paragraph({
          text: `${year}년 ${month}월 (${monthName})`,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          run: {
            size: 48,
            bold: true,
            color: THEME.TITLE,
            font: "Malgun Gothic",
          },
        }),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: Array(7).fill(COL_WIDTH),
          rows: rows,
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Monthly_Calendar_Template.docx", buffer);
  console.log(
    "Monthly Calendar created successfully: Monthly_Calendar_Template.docx",
  );
});
