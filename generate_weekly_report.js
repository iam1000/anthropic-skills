const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType, 
        PageNumber, Header, Footer, LevelFormat } = require("docx");

// Theme Colors
const THEME = {
    TITLE: "1E2761",   // Navy Blue
    ACCENT: "FF6F00",  // Orange
    TEXT: "333333",    // Dark Gray
    TABLE_HEADER: "E3F2FD", // Light Blue
    BORDER: "CCCCCC"
};

// --- Helper Functions ---

function createHeader(text, size = 28) {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: THEME.ACCENT }
        },
        run: { size: size, bold: true, color: THEME.TITLE, font: "Malgun Gothic" }
    });
}

function createSubHeader(text) {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        run: { size: 24, bold: true, color: THEME.TITLE, font: "Malgun Gothic" }
    });
}

function createLabelValue(label, value) {
    return new Paragraph({
        children: [
            new TextRun({ text: label + ": ", bold: true, font: "Malgun Gothic" }),
            new TextRun({ text: value, font: "Malgun Gothic" })
        ],
        spacing: { after: 120 }
    });
}

// --- Document Structure ---

const doc = new Document({
    styles: {
        paragraphStyles: [
            {
                id: "Normal",
                name: "Normal",
                quickFormat: true,
                run: {
                    size: 20, // 10pt
                    color: THEME.TEXT,
                    font: "Malgun Gothic"
                },
                paragraph: {
                    spacing: { line: 276 }, // 1.15 line spacing
                },
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                margin: {
                    top: 1440,
                    right: 1440,
                    bottom: 1440,
                    left: 1440,
                },
            },
        },
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Weekly Status Report", color: "888888", size: 18 })
                        ],
                        alignment: AlignmentType.RIGHT
                    })
                ]
            })
        },
        children: [
            // Title
            new Paragraph({
                text: "주간 업무 보고서",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 480 },
                run: { size: 40, bold: true, color: THEME.TITLE, font: "Malgun Gothic" }
            }),

            // Info Table (Grid like)
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: THEME.BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: THEME.BORDER },
                    left: { style: BorderStyle.SINGLE, size: 1, color: THEME.BORDER },
                    right: { style: BorderStyle.SINGLE, size: 1, color: THEME.BORDER },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: THEME.BORDER },
                    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: THEME.BORDER },
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ text: "작성일", run: { bold: true } })],
                                shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR },
                                width: { size: 15, type: WidthType.PERCENTAGE },
                            }),
                            new TableCell({
                                children: [new Paragraph("2026년 02월 19일")],
                                width: { size: 35, type: WidthType.PERCENTAGE },
                            }),
                            new TableCell({
                                children: [new Paragraph({ text: "작성자", run: { bold: true } })],
                                shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR },
                                width: { size: 15, type: WidthType.PERCENTAGE },
                            }),
                            new TableCell({
                                children: [new Paragraph("홍길동")],
                                width: { size: 35, type: WidthType.PERCENTAGE },
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ text: "부서명", run: { bold: true } })],
                                shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR },
                            }),
                            new TableCell({
                                children: [new Paragraph("개발팀")],
                            }),
                            new TableCell({
                                children: [new Paragraph({ text: "보고 기간", run: { bold: true } })],
                                shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR },
                            }),
                            new TableCell({
                                children: [new Paragraph("2026.02.16 ~ 2026.02.20")],
                            }),
                        ],
                    }),
                ],
            }),

            new Paragraph({ text: "", spacing: { after: 240 } }), // Spacer

            // 1. 금주 주요 업무 실적
            createHeader("1. 금주 주요 업무 실적"),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ text: "진행 항목", run: { bold: true }, alignment: AlignmentType.CENTER })], shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR }, width: { size: 35, type: WidthType.PERCENTAGE } }),
                            new TableCell({ children: [new Paragraph({ text: "진행 상태", run: { bold: true }, alignment: AlignmentType.CENTER })], shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR }, width: { size: 15, type: WidthType.PERCENTAGE } }),
                            new TableCell({ children: [new Paragraph({ text: "진행일자", run: { bold: true }, alignment: AlignmentType.CENTER })], shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR }, width: { size: 20, type: WidthType.PERCENTAGE } }),
                            new TableCell({ children: [new Paragraph({ text: "비고", run: { bold: true }, alignment: AlignmentType.CENTER })], shading: { fill: THEME.TABLE_HEADER, type: ShadingType.CLEAR }, width: { size: 30, type: WidthType.PERCENTAGE } }),
                        ]
                    }),
                     new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("Antigravity 가이드 작성")] }),
                            new TableCell({ children: [new Paragraph({ text: "완료", alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph({ text: "2026.02.19", alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph("PDF, DOCX, PPTX 생성 완료")] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("알고리즘 아트 생성")] }),
                            new TableCell({ children: [new Paragraph({ text: "진행 중", alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph({ text: "2026.02.19", alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph("p5.js 템플릿 적용")] }),
                        ]
                    }),
                     new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("API 연동 테스트")] }),
                            new TableCell({ children: [new Paragraph({ text: "대기", alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph({ text: "-", alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph("다음 주 예정")] }),
                        ]
                    }),
                ],
            }),

             new Paragraph({ text: "", spacing: { after: 240 } }), // Spacer

            // 2. 특이 사항 및 이슈
            createHeader("2. 특이 사항 및 이슈"),
             new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ text: "이슈 내용", run: { bold: true }, alignment: AlignmentType.CENTER })], shading: { fill: "FFEBEE", type: ShadingType.CLEAR }, width: { size: 60, type: WidthType.PERCENTAGE } }),
                            new TableCell({ children: [new Paragraph({ text: "대응 방안", run: { bold: true }, alignment: AlignmentType.CENTER })], shading: { fill: "FFEBEE", type: ShadingType.CLEAR }, width: { size: 40, type: WidthType.PERCENTAGE } }),
                        ]
                    }),
                     new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("LibreOffice 설치 부재로 인한 변환 오류")] }),
                            new TableCell({ children: [new Paragraph("Mac Keynote를 활용한 우회 변환 적용")] }),
                        ]
                    }),
                ],
            }),

            new Paragraph({ text: "", spacing: { after: 240 } }), // Spacer

            // 3. 차주 업무 계획
            createHeader("3. 차주 업무 계획"),
            new Paragraph({
                text: "• 신규 스킬(Mcp-builder) 테스트 및 검증",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• 팀 내부 공유 세미나 개최",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• 3월 프로젝트 일정 수립",
                bullet: { level: 0 }
            }),

        ],
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Weekly_Report_Template.docx", buffer);
    console.log("Weekly Report created successfully");
});
