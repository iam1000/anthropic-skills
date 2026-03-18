const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, PageBreak, Indent
} = require('docx');

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Malgun Gothic", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Malgun Gothic" },
        paragraph: { spacing: { before: 240, after: 120 } }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Malgun Gothic" },
        paragraph: { spacing: { before: 200, after: 100 } }
      }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // 표지 (Title Page)
      new Paragraph({ spacing: { before: 2400 } }),
      new Paragraph({ text: "브라더 공기관", alignment: AlignmentType.CENTER }),
      new Paragraph({ text: "기본 보고서 양식", alignment: AlignmentType.CENTER, heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: "2024. 5. 23.", alignment: AlignmentType.CENTER }),
      new Paragraph({ text: "", children: [new PageBreak()] }),
      
      // 목차 (TOC)
      new Paragraph({ text: "목  차", heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: "Ⅰ. 개요 1" }),
      new Paragraph({ text: "Ⅱ. 추진배경 2" }),
      new Paragraph({ text: "Ⅲ. 현황 및 문제점 4" }),
      new Paragraph({ text: "Ⅳ. 개선(해결)방안 6" }),
      new Paragraph({ text: "Ⅴ. 향후계획 10" }),
      new Paragraph({ text: " [붙 임]" }),
      new Paragraph({ text: "  1. 세부내용", indent: { left: 720 } }),
      new Paragraph({ text: "  2. 세부내용", indent: { left: 720 } }),
      new Paragraph({ text: " [참 고]" }),
      new Paragraph({ text: "  1. 세부내용", indent: { left: 720 } }),
      new Paragraph({ text: "", children: [new PageBreak()] }),

      // 본문 (Body)
      new Paragraph({ text: "제 목", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
      new Paragraph({ spacing: { after: 400 } }),
      
      new Paragraph({ text: "Ⅰ. 추진 배경", heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ spacing: { after: 200 } }),
      
      new Paragraph({ text: "Ⅱ. 현황 및 문제점", heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } }),
      new Paragraph({ spacing: { after: 200 } }),

      new Paragraph({ text: "Ⅲ. 개선 방안", heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } }),
      new Paragraph({ spacing: { after: 200 } }),

      new Paragraph({ text: "Ⅳ. 추진 계획", heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: "□ 헤드라인M 폰트 16포인트(문단 위 15)" }),
      new Paragraph({ text: "○ 휴면명조 15포인트(문단위 10)", indent: { left: 500 } }),
      new Paragraph({ text: "― 휴면명조 15포인트(문단 위 6)", indent: { left: 1000 } }),
      new Paragraph({ text: "※ 중고딕 13포인트(문단 위 3)", indent: { left: 1500 } })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('한글hwpx.docx', buffer);
  console.log("변환 완료: 한글hwpx.docx");
});
