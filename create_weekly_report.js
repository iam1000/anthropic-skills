const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak
} = require('docx');

// 결재란 스타일 상수
const STAMP_BORDER = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const STAMP_BORDERS = {
  top: STAMP_BORDER, bottom: STAMP_BORDER,
  left: STAMP_BORDER, right: STAMP_BORDER
};
const STAMP_CELL_WIDTH = 1200; // 각 셀 너비 (DXA) — 3열 합계 3600
const STAMP_TABLE_WIDTH = 3600;

// 결재란 라벨 셀 (1행)
function stampLabelCell(text) {
  return new TableCell({
    borders: STAMP_BORDERS,
    width: { size: STAMP_CELL_WIDTH, type: WidthType.DXA },
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, size: 18, font: "Arial" })]
    })]
  });
}

// 결재란 서명 공간 셀 (2행 — 빈칸)
function stampSignCell() {
  return new TableCell({
    borders: STAMP_BORDERS,
    width: { size: STAMP_CELL_WIDTH, type: WidthType.DXA },
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({ spacing: { before: 400, after: 400 } }) // 서명 공간 확보
    ]
  });
}

// 결재란 테이블 생성
function createApprovalStampTable() {
  return new Table({
    width: { size: STAMP_TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: [STAMP_CELL_WIDTH, STAMP_CELL_WIDTH, STAMP_CELL_WIDTH],
    alignment: AlignmentType.RIGHT, // 오른쪽 정렬 — 결재란의 핵심
    rows: [
      new TableRow({
        children: [
          stampLabelCell("팀장"),
          stampLabelCell("부장"),
          stampLabelCell("대표")
        ]
      }),
      new TableRow({
        children: [
          stampSignCell(),
          stampSignCell(),
          stampSignCell()
        ]
      })
    ]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1B4F72" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E86C1" },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [
    // ===== 1쪽: 표지 (결재란 포함) =====
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      children: [
        // (1) 결재란 — 페이지 최상단, 오른쪽 정렬
        createApprovalStampTable(),

        // (2) 표지 내용 — 중앙 배치
        new Paragraph({ spacing: { before: 2400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({
            text: "주간 업무 보고서",
            size: 52, bold: true, color: "1B4F72", font: "Arial"
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({
            text: "[ 2026년 3월 3주차 ]",
            size: 26, color: "555555", font: "Arial"
          })]
        }),
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: "작성일: 2026년 03월 18일",
            size: 22, color: "808080", font: "Arial"
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: "작성자: [부서명] [이름]",
            size: 22, color: "808080", font: "Arial"
          })]
        }),
      ]
    },

    // ===== 2쪽~: 본문 =====
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({
              text: "주간 업무 보고서",
              size: 18, color: "808080", font: "Arial", italics: true
            })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "- ", size: 18, color: "808080" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080" }),
              new TextRun({ text: " -", size: 18, color: "808080" })
            ]
          })]
        })
      },
      children: [
        new Paragraph({ text: "1. 금주 주요 업무 실적", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          text: "[AI 에이전트 스킬 고도화] 전체 스킬 목록 전수 조사 및 활용 가이드 정리 완료",
          bullet: { level: 0 }
        }),
        new Paragraph({
          text: "[자동화] pptx 스킬을 통한 '스킬 사용법 가이드' 프레젠테이션 자동 생성 파이프라인 구축",
          bullet: { level: 0 }
        }),
        new Paragraph({
          text: "[신규 스킬 추가] 패키징된 word-report.skill 파일 해동 및 사내 문서 특화 스킬로 정식 등록 완료",
          bullet: { level: 0 }
        }),
        new Paragraph({
          text: "[자동화] word-report 스킬 기반 결재란이 포함된 공식 주간 업무 보고서 템플릿 생성 체계 마련",
          bullet: { level: 0 }
        }),
        
        new Paragraph({ text: "2. 차주 주요 업무 계획", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          text: "SH공사 미팅 예정 (일시: 3/19 14시)",
          bullet: { level: 0 }
        }),

        new Paragraph({ text: "3. 주요 이슈 및 건의사항", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          text: "특이 동향 없음",
          bullet: { level: 0 }
        }),
      ]
    }
  ]
});

// ===== 파일 저장 =====
const OUTPUT_PATH = "Weekly_Report.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log("보고서 생성 완료: " + OUTPUT_PATH);
});
