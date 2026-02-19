const PptxGenJS = require("pptxgenjs");

// 1. 프레젠테이션 생성
let pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9';

// 2. 테마 정의 (Light Theme: Clean & Professional)
const theme = {
    bg: "FFFFFF",       // 화이트
    title: "1E2761",    // 네이비 블루
    text: "424242",     // 짙은 회색
    accent1: "FF6F00",  // 오렌지 (Primary Accent)
    accent2: "00897B",  // 틸 (Secondary Accent)
    boxFill: "F5F7FA",  // 연한 회색 박스
    codeBg: "ECEFF1",   // 코드 블록 배경
    codeText: "D81B60"  // 코드 텍스트 색상
};

// 3. 마스터 슬라이드
pres.defineSlideMaster({
    title: "MASTER",
    background: { color: theme.bg },
    objects: [
        // 상단 바
        { rect: { x: 0, y: 0, w: "100%", h: 0.15, fill: { color: theme.accent2 } } },
        // 하단 바닥글
        { rect: { x: 0, y: 5.35, w: "100%", h: 0.4, fill: { color: "FAFAFA" } } },
        { text: { text: "Antigravity Skills Guide", options: { x: 0.5, y: 5.45, fontSize: 10, color: "9E9E9E" } } },
        { mlSlideNumber: { x: 9.0, y: 5.45, w: 1, h: 0.25, fontSize: 10, color: "9E9E9E", align: "right" } }
    ]
});

// 헬퍼 함수
function addSlide(title) {
    let slide = pres.addSlide({ masterName: "MASTER" });
    if (title) {
        slide.addText(title, { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, 
            fontSize: 28, fontFace: "Malgun Gothic", bold: true, color: theme.title 
        });
        slide.addShape(pres.shapes.LINE, { 
            x: 0.5, y: 1.3, w: 9, h: 0, 
            line: { color: theme.accent1, width: 2 } 
        });
    }
    return slide;
}

function addBulletPoints(slide, items, startY = 1.8) {
    items.forEach((item, i) => {
        slide.addShape(pres.shapes.OVAL, {
            x: 0.6, y: startY + (i * 0.6) + 0.15, w: 0.1, h: 0.1,
            fill: { color: theme.accent1 }
        });
        slide.addText(item, {
            x: 0.9, y: startY + (i * 0.6), w: 8.5, h: 0.4,
            fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
        });
    });
}

function addCodeBox(slide, code, y, h = 1.0) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: y, w: 8.4, h: h,
        fill: { color: theme.codeBg }, line: { color: "CFD8DC" }
    });
    slide.addText(code, {
        x: 1.0, y: y + 0.1, w: 8.0, h: h - 0.2,
        fontSize: 14, fontFace: "Consolas", color: theme.codeText
    });
}

// -------------------------------------------------------------------------
// SLIDE 1: 타이틀
// -------------------------------------------------------------------------
let s1 = pres.addSlide();
s1.background = { color: theme.bg };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4, h: 5.625, fill: { color: theme.title } }); // 왼쪽 네이비 배경
s1.addText("Antigravity\nSkills\n사용법 가이드", {
    x: 0.3, y: 1.5, w: 3.5, h: 3,
    fontSize: 40, fontFace: "Malgun Gothic", bold: true, color: "FFFFFF", align: "left"
});
s1.addText("AI 에이전트의 능력을 확장하는\n실전 활용 매뉴얼", {
    x: 4.5, y: 2.5, w: 5, h: 1.5,
    fontSize: 24, fontFace: "Malgun Gothic", color: theme.text
});
s1.addText("2026. 02. 19", { x: 4.5, y: 4.5, fontSize: 14, color: "9E9E9E" });


// -------------------------------------------------------------------------
// SLIDE 2: Antigravity Skills란?
// -------------------------------------------------------------------------
let s2 = addSlide("1. Antigravity Skills란?");
s2.addText("AI 에이전트가 특정 작업을 전문적으로 수행하도록 돕는 '도구 모음'입니다.", {
    x: 0.5, y: 1.6, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

// 3가지 핵심 요소
let coreY = 2.8;
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: coreY, w: 2.8, h: 1.8, fill: { color: theme.boxFill } });
s2.addText("지침 (Instructions)", { x: 0.5, y: coreY + 0.2, w: 2.8, align: "center", bold: true, color: theme.accent2 });
s2.addText("SKILL.md 파일에 정의된\nAI 행동 규칙 및 프롬프트", { x: 0.6, y: coreY + 0.7, w: 2.6, align: "center", fontSize: 14 });

s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.6, y: coreY, w: 2.8, h: 1.8, fill: { color: theme.boxFill } });
s2.addText("스크립트 (Scripts)", { x: 3.6, y: coreY + 0.2, w: 2.8, align: "center", bold: true, color: theme.accent2 });
s2.addText("Python, JS 등으로 작성된\n실제 실행 가능한 코드", { x: 3.7, y: coreY + 0.7, w: 2.6, align: "center", fontSize: 14 });

s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: coreY, w: 2.8, h: 1.8, fill: { color: theme.boxFill } });
s2.addText("리소스 (Resources)", { x: 6.7, y: coreY + 0.2, w: 2.8, align: "center", bold: true, color: theme.accent2 });
s2.addText("템플릿, 예제 파일 등\n작업에 필요한 자산", { x: 6.8, y: coreY + 0.7, w: 2.6, align: "center", fontSize: 14 });


// -------------------------------------------------------------------------
// SLIDE 3: 설치 및 환경 설정
// -------------------------------------------------------------------------
let s3 = addSlide("2. 설치 및 환경 설정");
addBulletPoints(s3, [
    "Git 저장소 클론 (Clone)",
    "Node.js 및 Python 필수 의존성 설치",
    "각 스킬 폴더(.agent/skills) 확인"
]);

addCodeBox(s3, 
`# 1. 저장소 가져오기
git clone https://github.com/iam1000/anthropic-skills.git

# 2. 필수 라이브러리 설치 (예: pptxgenjs, docx 등)
npm install -g pptxgenjs docx
pip install pandas openpyxl markitdown`, 
3.5, 1.5);


// -------------------------------------------------------------------------
// SLIDE 4: 주요 사용 가능 스킬
// -------------------------------------------------------------------------
let s4 = addSlide("3. 주요 사용 가능 스킬 목록");

const skills = [
    { name: "PPTX", desc: "파워포인트 슬라이드 생성, 수정 및 텍스트 추출" },
    { name: "DOCX", desc: "Word 문서 생성, 서식 적용 및 컨텐츠 분석" },
    { name: "XLSX", desc: "Excel 데이터 시트 생성, 수식 적용 및 데이터 정제" },
    { name: "PDF", desc: "PDF 문서의 텍스트 추출 및 구조 분석" },
    { name: "Front-end Design", desc: "HTML/CSS 기반의 웹 UI 디자인 생성" }
];

skills.forEach((skill, i) => {
    let rowY = 1.8 + (i * 0.7);
    s4.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: rowY, w: 1.5, h: 0.5, fill: { color: theme.accent2 } });
    s4.addText(skill.name, { x: 0.8, y: rowY, w: 1.5, h: 0.5, color: "FFFFFF", align: "center", bold: true, fontSize: 14 });
    s4.addShape(pres.shapes.RECTANGLE, { x: 2.3, y: rowY, w: 6.5, h: 0.5, fill: { color: "F0F0F0" } });
    s4.addText(skill.desc, { x: 2.5, y: rowY, w: 6.3, h: 0.5, color: theme.text, fontSize: 14 });
});


// -------------------------------------------------------------------------
// SLIDE 5: PPTX 스킬 활용법
// -------------------------------------------------------------------------
let s5 = addSlide("4. PPTX 스킬: 슬라이드 자동화");
s5.addText("Python의 markitdown과 Node.js의 PptxGenJS를 활용합니다.", { x: 0.5, y: 1.6, w: 9, h: 0.5, fontSize: 16 });

s5.addText("1) 기존 파일 분석 (텍스트 추출)", { x: 0.8, y: 2.3, fontSize: 16, bold: true, color: theme.title });
addCodeBox(s5, "python -m markitdown presentation.pptx", 2.6, 0.5);

s5.addText("2) 새 프리젠테이션 생성 (JS Script)", { x: 0.8, y: 3.4, fontSize: 16, bold: true, color: theme.title });
addCodeBox(s5, 
`let pres = new PptxGenJS();
let slide = pres.addSlide();
slide.addText("Hello World", { x:1, y:1, fontSize:24 });
pres.writeFile({ fileName: "Output.pptx" });`, 
3.7, 1.4);


// -------------------------------------------------------------------------
// SLIDE 6: DOCX 스킬 활용법
// -------------------------------------------------------------------------
let s6 = addSlide("5. DOCX 스킬: 문서 작성 자동화");
s6.addText("docx-js 라이브러리를 사용하여 전문적인 Word 문서를 생성합니다.", { x: 0.5, y: 1.6, w: 9, h: 0.5, fontSize: 16 });

s6.addText("주요 기능:", { x: 0.8, y: 2.2, fontSize: 16, bold: true });
addBulletPoints(s6, [
    "제목, 본문, 글머리 기호 등 스타일 지정",
    "표(Table) 생성 및 병합",
    "이미지 삽입 및 페이지 번호 매기기",
    "헤더/푸터 설정"
], 2.5);

s6.addText("※ 주의: Google Docs와 호환성을 위해 표 너비는 DXA 단위 사용 권장", {
    x: 0.8, y: 4.7, w: 8, h: 0.4, fontSize: 12, color: "D81B60", italic: true
});


// -------------------------------------------------------------------------
// SLIDE 7: XLSX 스킬 활용법
// -------------------------------------------------------------------------
let s7 = addSlide("6. XLSX 스킬: 데이터 시트 관리");
s7.addText("ExcelJS 또는 Python pandas를 이용해 데이터를 처리합니다.", { x: 0.5, y: 1.6, w: 9, h: 0.5, fontSize: 16 });

// 좌우 배치
s7.addText("데이터 생성 (Create)", { x: 0.8, y: 2.5, w: 4, h: 0.5, bold: true, color: theme.accent1, align: "center" });
s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 3.0, w: 4, h: 2.0, fill: { color: theme.boxFill } });
s7.addText("- 대량의 데이터 자동 입력\n- 복잡한 수식 적용\n- 조건부 서식 설정\n- 차트 데이터 구성", {
    x: 1.0, y: 3.2, w: 3.6, h: 1.6, fontSize: 14
});

s7.addText("데이터 분석 (Analyze)", { x: 5.2, y: 2.5, w: 4, h: 0.5, bold: true, color: theme.accent2, align: "center" });
s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 3.0, w: 4, h: 2.0, fill: { color: theme.boxFill } });
s7.addText("- CSV/Excel 파일 읽기\n- 데이터 정제 (Cleaning)\n- 피벗 테이블 생성\n- 요약 리포트 추출", {
    x: 5.4, y: 3.2, w: 3.6, h: 1.6, fontSize: 14
});


// -------------------------------------------------------------------------
// SLIDE 8: 커스텀 스킬 만들기
// -------------------------------------------------------------------------
let s8 = addSlide("7. 나만의 커스텀 스킬 만들기");
s8.addText("새로운 디렉토리를 만들고 SKILL.md만 정의하면 됩니다.", { x: 0.5, y: 1.6, w: 9, h: 0.5, fontSize: 16 });

s8.addText("SKILL.md 구조 예시:", { x: 0.8, y: 2.2, fontSize: 16, bold: true });
addCodeBox(s8, 
`---
name: my-custom-skill
description: 이 스킬이 언제 사용되어야 하는지 설명
---

# 상세 지침 (Instructions)
AI가 수행해야 할 단계별 작업을 마크다운으로 기술

## 예제
- 입력 예시 -> 출력 예시`, 
2.6, 2.5);


// -------------------------------------------------------------------------
// SLIDE 9: Best Practices (팁)
// -------------------------------------------------------------------------
let s9 = addSlide("8. 효과적인 사용을 위한 팁");

// 카드 형태 4개
const tips = [
    { title: "명확한 지시", text: "스킬 사용 시 구체적인 파일명과 원하는 출력 형태를 명시하세요." },
    { title: "검증 단계", text: "생성된 파일은 항상 열어서 시각적 오류가 없는지 확인해야 합니다." },
    { title: "백업 필수", text: "덮어쓰기(Overwrite) 옵션 사용 전 원본 파일을 백업하세요." },
    { title: "로그 확인", text: "에러 발생 시 터미널 로그를 통해 디버깅 정보를 확인하세요." }
];

tips.forEach((tip, i) => {
    let x = (i % 2) === 0 ? 0.8 : 5.2;
    let y = i < 2 ? 1.8 : 3.5;
    
    s9.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: y, w: 4.2, h: 1.4, fill: { color: "FFFFFF" }, line: { color: theme.accent2 } });
    s9.addText(tip.title, { x: x + 0.1, y: y + 0.1, w: 4.0, h: 0.4, bold: true, color: theme.accent1, fontSize: 16 });
    s9.addText(tip.text, { x: x + 0.1, y: y + 0.5, w: 4.0, h: 0.8, fontSize: 14, color: theme.text });
});


// -------------------------------------------------------------------------
// SLIDE 10: 마무리
// -------------------------------------------------------------------------
let s10 = addSlide("9. 마치며");
s10.addText("Antigravity Skills로 워크플로우를 혁신하세요.", {
    x: 0.5, y: 2.5, w: 9, h: 1.0, fontSize: 24, align: "center", bold: true, color: theme.title
});

s10.addText("문의 및 피드백 환영", { x: 0.5, y: 4.0, w: 9, fontSize: 16, align: "center", color: theme.text });
s10.addText("Thank You", { x: 0.5, y: 1.5, w: 9, fontSize: 60, align: "center", color: theme.accent2, bold: true, transparency: 90 }); // 배경에 은은하게


// 파일 저장
pres.writeFile({ fileName: "Antigravity_Skills_Guide.pptx" })
    .then(fileName => {
        console.log(`파일 생성 완료: ${fileName}`);
    });
