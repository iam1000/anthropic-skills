const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType, 
        PageNumber, Header, Footer } = require("docx");

// Theme Colors (Approximate for Word)
const THEME = {
    TITLE: "1E2761",   // Navy Blue
    ACCENT: "FF6F00",  // Orange
    TEXT: "333333",    // Dark Gray
    CODE_BG: "F0F0F0", // Light Gray
    CODE_TEXT: "D81B60" // Pink
};

// Helper to create a code block paragraph
function createCodeBlock(code) {
    return new Paragraph({
        children: [
            new TextRun({
                text: code,
                font: "Consolas",
                size: 24, // 12pt
                color: THEME.CODE_TEXT,
            })
        ],
        spacing: { before: 120, after: 120 },
        shading: {
            type: ShadingType.CLEAR,
            fill: THEME.CODE_BG,
        },
        border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
        },
        indent: { left: 240, right: 240 } // slight padding simulation
    });
}

// Helper to create a section title
function createSectionTitle(text) {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: THEME.ACCENT }
        }
    });
}

const doc = new Document({
    styles: {
        paragraphStyles: [
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: {
                    size: 32,
                    bold: true,
                    color: THEME.TITLE,
                    font: "Malgun Gothic"
                },
                paragraph: {
                    spacing: { before: 240, after: 120 },
                },
            },
            {
                id: "Normal",
                name: "Normal",
                quickFormat: true,
                run: {
                    size: 24, // 12pt
                    color: THEME.TEXT,
                    font: "Malgun Gothic"
                },
                paragraph: {
                    spacing: { line: 360 }, // 1.5 line spacing
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
                            new TextRun({ text: "GitHub & 로컬 Git 연결 가이드", color: "888888", size: 20 })
                        ],
                        alignment: AlignmentType.RIGHT
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                children: [PageNumber.CURRENT],
                                color: "888888",
                                size: 20
                            })
                        ],
                    })
                ]
            })
        },
        children: [
            // Title Page
            new Paragraph({
                text: "GitHub & 로컬 Git 연결 가이드",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { before: 1000, after: 240 },
                run: { size: 48, bold: true, color: THEME.TITLE, font: "Malgun Gothic" } // 24pt
            }),
            new Paragraph({
                text: "효율적인 버전 관리를 위한 단계별 절차서",
                alignment: AlignmentType.CENTER,
                spacing: { after: 480 },
                run: { size: 32, color: THEME.ACCENT, font: "Malgun Gothic" } // 16pt
            }),
            new Paragraph({
                text: "작성일: 2026. 02. 19",
                alignment: AlignmentType.CENTER,
                spacing: { after: 1000 },
                run: { size: 24, color: "888888", font: "Malgun Gothic" }
            }),
            
            // Page Break
            new Paragraph({
                children: [],
                pageBreakBefore: true
            }),

            // Section 1
            createSectionTitle("1. Git 초기화 (Initialization)"),
            new Paragraph({
                text: "로컬 폴더를 Git이 관리하는 저장소로 만듭니다. (이미 .git 폴더가 있다면 생략 가능)",
                spacing: { after: 120 }
            }),
            createCodeBlock("git init"),

            // Section 2
            createSectionTitle("2. 원격 저장소 (Remote) 추가"),
            new Paragraph({
                text: "GitHub의 URL을 'origin'이라는 이름으로 등록합니다.",
                spacing: { after: 120 }
            }),
            createCodeBlock("git remote add origin https://github.com/사용자/저장소.git"),

            // Section 3
            createSectionTitle("3. 연결 상태 확인"),
            new Paragraph({
                text: "등록된 원격 저장소가 올바른지 확인합니다.",
                spacing: { after: 120 }
            }),
            createCodeBlock("git remote -v"),
            new Paragraph({
                text: "정상 출력 예시:",
                spacing: { before: 120, after: 60 },
                run: { bold: true }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "origin  https://github.com/... (fetch)\norigin  https://github.com/... (push)",
                        font: "Consolas",
                        size: 20,
                        color: "555555"
                    })
                ],
                shading: { type: ShadingType.CLEAR, fill: "EFEFEF" }
            }),

            // Section 4 & 5
            createSectionTitle("4. Pull & 5. Upstream 설정"),
            new Paragraph({
                text: "원격 저장소의 내용을 가져오고(Pull), 브랜치를 연결합니다.",
                spacing: { after: 120 }
            }),
            
            new Paragraph({
                text: "Step 4. 원격 내용 가져오기 (충돌 방지)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 120, after: 60 }
            }),
            createCodeBlock("git pull origin main"),

            new Paragraph({
                text: "Step 5. 브랜치 연결 (이후 git push만 입력 가능하도록)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 60 }
            }),
            createCodeBlock("git branch --set-upstream-to=origin/main main\n# 또는 처음 푸시할 때: git push -u origin main"),

            // Section 6
            createSectionTitle("6. 변경 사항 동기화 (Workflow)"),
            new Paragraph({
                text: "작업 후에는 항상 다음 3단계를 순서대로 실행하여 GitHub에 저장합니다.",
                spacing: { after: 120 }
            }),
            
            // Workflow Table
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ text: "1. ADD", alignment: AlignmentType.CENTER, run: { bold: true, color: "1565C0" } })],
                                shading: { fill: "E3F2FD", type: ShadingType.CLEAR },
                            }),
                            new TableCell({
                                children: [new Paragraph({ text: "2. COMMIT", alignment: AlignmentType.CENTER, run: { bold: true, color: "2E7D32" } })],
                                shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                            }),
                            new TableCell({
                                children: [new Paragraph({ text: "3. PUSH", alignment: AlignmentType.CENTER, run: { bold: true, color: "C2185B" } })],
                                shading: { fill: "FCE4EC", type: ShadingType.CLEAR },
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ text: "git add .", alignment: AlignmentType.CENTER, run: { font: "Consolas" } })],
                            }),
                            new TableCell({
                                children: [new Paragraph({ text: 'git commit -m "msg"', alignment: AlignmentType.CENTER, run: { font: "Consolas" } })],
                            }),
                            new TableCell({
                                children: [new Paragraph({ text: "git push", alignment: AlignmentType.CENTER, run: { font: "Consolas" } })],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Git_Management_Guide.docx", buffer);
    console.log("Document created successfully");
});
