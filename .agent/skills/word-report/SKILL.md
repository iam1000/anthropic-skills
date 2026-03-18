---
name: word-report
description: "회사 공식 보고서 양식이 적용된 Word 문서(.docx)를 생성하는 스킬. 1쪽 오른쪽 위에 결재란(팀장/부장/대표 사인란)이 포함된 보고서를 만든다. '보고서', '보고서 작성', '워드 보고서', '결재란', '사인란', '품의서', '기안서' 등의 키워드가 나오면 반드시 이 스킬을 사용할 것. 일반적인 Word 문서가 아니라 '보고서' 형태의 공식 문서를 요청할 때 트리거한다. 이 스킬은 docx 스킬을 확장하므로, 먼저 docx SKILL.md를 읽어 기본 문서 생성 방법을 숙지한 뒤 이 스킬의 보고서 양식을 적용한다."
---

# 워드 보고서 스킬 (Word Report with Approval Stamps)

## 개요

이 스킬은 한국 기업에서 사용하는 공식 보고서 양식을 자동으로 적용한다. 핵심은 **1쪽 오른쪽 위에 결재란(팀장/부장/대표)**을 배치하고, 표지 서식과 본문 구조를 갖춘 보고서를 만드는 것이다.

## 사전 준비

이 스킬을 사용하기 전에 반드시 **docx SKILL.md**를 먼저 읽어 docx-js 사용법을 확인한다. 이 스킬은 docx 스킬의 확장이므로, 테이블 생성, 스타일 설정, 페이지 설정 등의 기본 지식이 필요하다.

```
Read the docx SKILL.md for base document creation patterns
```

## 보고서 구조

보고서는 다음 구조로 구성된다:

1. **1쪽 (표지)**
   - 오른쪽 위: 결재란 (2행 3열 테이블)
   - 중앙: 보고서 제목, 부제, 작성일, 작성자 정보
2. **2쪽~ (본문)**
   - 머리글: 보고서 제목 (이탤릭, 오른쪽 정렬)
   - 바닥글: 페이지 번호 (가운데 정렬)
   - 본문 내용 (제목, 본문, 표 등)

## 결재란 (Approval Stamp Table)

결재란은 보고서의 가장 핵심 요소다. 1쪽 오른쪽 위에 위치하며, 2행 3열의 테이블로 구성된다.

### 구조
```
┌────────┬────────┬────────┐
│  팀장  │  부장  │  대표  │   ← 1행: 직책 라벨 (가운데 정렬, 굵게)
├────────┼────────┼────────┤
│        │        │        │   ← 2행: 서명/도장 공간 (빈칸, 높이 약 60pt)
└────────┴────────┴────────┘
```

### docx-js 구현 코드

결재란은 **오른쪽 정렬된 작은 테이블**로 구현한다. 테이블 전체 너비를 페이지의 약 40% 정도로 설정하고 오른쪽 정렬한다.

```javascript
const { Table, TableRow, TableCell, Paragraph, TextRun, AlignmentType,
        BorderStyle, WidthType, VerticalAlign } = require('docx');

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
          stampLabelCell("대표"),
        ]
      }),
      new TableRow({
        children: [
          stampSignCell(),
          stampSignCell(),
          stampSignCell(),
        ]
      })
    ]
  });
}
```

## 전체 보고서 템플릿

아래는 결재란과 표지를 포함한 보고서의 전체 구조다. 보고서 내용은 요청에 맞게 채운다.

```javascript
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak
} = require('docx');

// ===== (위의 결재란 함수들을 여기에 포함) =====

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
            text: "[보고서 제목]",
            size: 52, bold: true, color: "1B4F72", font: "Arial"
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({
            text: "[부제 또는 설명]",
            size: 26, color: "555555", font: "Arial"
          })]
        }),
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: "작성일: YYYY년 MM월 DD일",
            size: 22, color: "808080", font: "Arial"
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: "작성자: [이름/부서]",
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
              text: "[보고서 제목]",
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
        // 본문 내용을 여기에 작성
        // new Paragraph({ heading: HeadingLevel.HEADING_1, children: [...] }),
        // new Paragraph({ children: [...] }),
      ]
    }
  ]
});

// ===== 파일 저장 =====
const OUTPUT_PATH = "보고서.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log("보고서 생성 완료: " + OUTPUT_PATH);
});
```

## 커스터마이징 가이드

### 결재란 직책 변경

조직에 따라 결재란 직책을 변경할 수 있다. 기본은 팀장/부장/대표이며, 사용자가 다른 직책을 요청하면 그에 맞게 수정한다.

예시:
- 담당/팀장/본부장
- 과장/부장/이사/대표 (4열)
- 실장/본부장/대표이사

4열 이상인 경우 `STAMP_CELL_WIDTH`를 줄여 테이블 전체 너비가 페이지 절반 이하를 유지하도록 한다.

### 결재란 셀 크기 조정

서명 공간의 높이를 조정하려면 `stampSignCell()`의 `spacing`을 변경한다:
- 작은 서명란: `{ before: 200, after: 200 }`
- 기본 서명란: `{ before: 400, after: 400 }` (권장)
- 큰 서명란 (도장용): `{ before: 600, after: 600 }`

## 체크리스트

보고서 생성 시 확인할 사항:

1. 결재란이 1쪽 오른쪽 위에 올바르게 위치하는가?
2. 결재란의 직책 라벨이 요청에 맞는가? (기본: 팀장/부장/대표)
3. 서명 공간이 충분한 높이로 비어있는가?
4. 표지에 제목, 작성일, 작성자가 포함되어 있는가?
5. 본문 섹션에 머리글(제목)과 바닥글(페이지 번호)이 있는가?
6. 문서 생성 후 `python scripts/office/validate.py` 로 검증했는가?
