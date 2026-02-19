const PptxGenJS = require("pptxgenjs");

// 1. 프레젠테이션 생성
let pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9';

// 2. 테마 색상 정의 (라이트 모드: 화이트 & 네이비 & 오렌지 포인트)
const theme = {
    bg: "FFFFFF",       // 화이트
    title: "1E2761",    // 네이비 블루
    text: "333333",     // 짙은 회색
    codeBg: "F0F0F0",   // 코드 블록 배경 (연회색)
    codeText: "D81B60", // 코드 텍스트 (핑크)
    accent1: "FF6F00",  // 오렌지 (강조)
    accent2: "00897B",  // 틸 (보조)
};

// 3. 마스터 슬라이드 정의
pres.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { color: theme.bg },
    objects: [
        // 상단 장식 바
        { rect: { x: 0, y: 0, w: "100%", h: 0.15, fill: { color: theme.accent1 } } },
        // 하단 바닥글 배경
        { rect: { x: 0, y: 5.35, w: "100%", h: 0.4, fill: { color: "F5F5F5" } } },
        // 슬라이드 번호 및 제목
        { text: { text: "Git 관리 절차서", options: { x: 0.5, y: 5.45, fontSize: 10, color: "666666" } } },
        { mlSlideNumber: { x: 9.0, y: 5.45, w: 1, h: 0.25, fontSize: 10, color: "666666", align: "right" } }
    ]
});

// 슬라이드 추가 헬퍼 함수
function addSlide(titleText) {
    let slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
    if (titleText) {
        slide.addText(titleText, { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, 
            fontSize: 28, fontFace: "Malgun Gothic", bold: true, color: theme.title 
        });
        // 구분선
        slide.addShape(pres.shapes.LINE, { 
            x: 0.5, y: 1.3, w: 9, h: 0, 
            line: { color: theme.accent2, width: 2 } 
        });
    }
    return slide;
}

// 코드 블록 추가 헬퍼 함수
function addCodeBlock(slide, code, yPos) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: yPos, w: 8.4, h: 1.2,
        fill: { color: theme.codeBg }, line: { color: "CCCCCC", width: 1 }
    });
    slide.addText(code, {
        x: 1.0, y: yPos + 0.1, w: 8.0, h: 1.0,
        fontSize: 14, fontFace: "Consolas", color: theme.codeText, valign: "middle"
    });
}

// -------------------------------------------------------------------------
// SLIDE 1: 표지
// -------------------------------------------------------------------------
let slide1 = pres.addSlide();
slide1.background = { color: theme.bg };

// 메인 타이틀
slide1.addText("GitHub & 로컬 Git 연결 가이드", {
    x: 0.5, y: 1.8, w: 9, h: 1.5,
    fontSize: 44, fontFace: "Malgun Gothic", bold: true, color: theme.title, align: "center"
});

// 서브 타이틀
slide1.addText("효율적인 버전 관리를 위한 단계별 절차서", {
    x: 1.5, y: 3.2, w: 7, h: 0.8,
    fontSize: 20, fontFace: "Malgun Gothic", color: theme.accent2, align: "center"
});

slide1.addText("작성일: 2026. 02. 19", {
    x: 3, y: 4.5, w: 4, h: 0.5,
    fontSize: 14, fontFace: "Malgun Gothic", color: "888888", align: "center"
});


// -------------------------------------------------------------------------
// SLIDE 2: 전체 절차 요약
// -------------------------------------------------------------------------
let slide2 = addSlide("전체 진행 순서");

const steps = [
    "1. Git 초기화 (Init)",
    "2. 원격 저장소 추가 (Remote Add)",
    "3. 연결 확인 (Remote Verify)",
    "4. 최신 내용 가져오기 (Pull)",
    "5. 브랜치 연결 (Upstream)",
    "6. 작업 동기화 (Add/Commit/Push)"
];

let startY = 1.8;
steps.forEach((step, index) => {
    // 번호 박스
    slide2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 1.0, y: startY + (index * 0.6), w: 0.4, h: 0.4,
        fill: { color: theme.accent1 }, line: { width: 0 }
    });
    slide2.addText((index + 1).toString(), {
        x: 1.0, y: startY + (index * 0.6), w: 0.4, h: 0.4,
        fontSize: 14, color: "FFFFFF", align: "center", bold: true
    });
    
    // 텍스트
    slide2.addText(step.substring(3), { // 번호 제외한 텍스트
        x: 1.6, y: startY + (index * 0.6), w: 7, h: 0.4,
        fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
    });
});


// -------------------------------------------------------------------------
// SLIDE 3: 1. Git 초기화
// -------------------------------------------------------------------------
let slide3 = addSlide("1. Git 초기화 (Initialization)");

slide3.addText("로컬 폴더를 Git이 관리하는 저장소로 만듭니다.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

slide3.addText("명령어:", { x: 0.8, y: 2.5, w: 2, h: 0.3, fontSize: 16, bold: true, color: theme.title });
addCodeBlock(slide3, "git init", 2.9);

slide3.addText("※ 이미 .git 폴더가 있다면 이 단계는 생략 가능합니다.", {
    x: 0.8, y: 4.5, w: 8, h: 0.5, fontSize: 14, color: "888888", italic: true
});


// -------------------------------------------------------------------------
// SLIDE 4: 2. 원격 저장소 추가
// -------------------------------------------------------------------------
let slide4 = addSlide("2. 원격 저장소 (Remote) 추가");

slide4.addText("GitHub의 URL을 'origin'이라는 이름으로 등록합니다.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

slide4.addText("명령어:", { x: 0.8, y: 2.5, w: 2, h: 0.3, fontSize: 16, bold: true, color: theme.title });
addCodeBlock(slide4, "git remote add origin https://github.com/사용자/저장소.git", 2.9);


// -------------------------------------------------------------------------
// SLIDE 5: 3. 연결 확인
// -------------------------------------------------------------------------
let slide5 = addSlide("3. 연결 상태 확인");

slide5.addText("등록된 원격 저장소가 올바른지 확인합니다.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

addCodeBlock(slide5, "git remote -v", 2.5);

slide5.addText("정상 출력 예시:", { x: 0.8, y: 3.9, w: 3, h: 0.3, fontSize: 16, bold: true, color: theme.title });
slide5.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.3, w: 8.4, h: 0.8, fill: { color: "EFEFEF" } });
slide5.addText("origin  https://github.com/... (fetch)\norigin  https://github.com/... (push)", {
    x: 1.0, y: 4.4, w: 8.0, h: 0.6, fontSize: 12, fontFace: "Consolas", color: "555555"
});


// -------------------------------------------------------------------------
// SLIDE 6: 4. 내용 가져오기 & 5. 브랜치 연결
// -------------------------------------------------------------------------
let slide6 = addSlide("4. Pull & 5. Upstream 설정");

slide6.addText("원격 저장소의 내용을 가져오고(Pull), 브랜치를 연결합니다.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

// Step 4
slide6.addText("Step 4. 원격 내용 가져오기 (충돌 방지)", { x: 0.8, y: 2.5, w: 8, h: 0.3, fontSize: 16, bold: true, color: theme.accent1 });
addCodeBlock(slide6, "git pull origin main", 2.9);

// Step 5
slide6.addText("Step 5. 브랜치 연결 (이후 git push만 입력 가능하도록)", { x: 0.8, y: 4.3, w: 8, h: 0.3, fontSize: 16, bold: true, color: theme.accent1 });
addCodeBlock(slide6, "git branch --set-upstream-to=origin/main main\n# 또는 처음 푸시할 때: git push -u origin main", 4.7);


// -------------------------------------------------------------------------
// SLIDE 7: 6. 작업 동기화 (Workflow)
// -------------------------------------------------------------------------
let slide7 = addSlide("6. 변경 사항 동기화 (Workflow)");

// 3단계 다이어그램
let boxY = 2.5;
let boxH = 1.2;
let gap = 0.5;

// Stage 1: Add
slide7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: boxY, w: 2.5, h: boxH, fill: { color: "E3F2FD" }, line: { color: "2196F3" } });
slide7.addText("1. ADD", { x: 0.5, y: boxY + 0.1, w: 2.5, h: 0.4, align: "center", bold: true, color: "1565C0" });
slide7.addText("git add .", { x: 0.5, y: boxY + 0.5, w: 2.5, h: 0.4, align: "center", fontFace: "Consolas", fontSize: 12 });

slide7.addShape(pres.shapes.RIGHT_ARROW, { x: 3.1, y: boxY + 0.4, w: 0.4, h: 0.4, fill: { color: "CCCCCC" } });

// Stage 2: Commit
slide7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.6, y: boxY, w: 2.5, h: boxH, fill: { color: "E8F5E9" }, line: { color: "4CAF50" } });
slide7.addText("2. COMMIT", { x: 3.6, y: boxY + 0.1, w: 2.5, h: 0.4, align: "center", bold: true, color: "2E7D32" });
slide7.addText('git commit -m "msg"', { x: 3.6, y: boxY + 0.5, w: 2.5, h: 0.4, align: "center", fontFace: "Consolas", fontSize: 12 });

slide7.addShape(pres.shapes.RIGHT_ARROW, { x: 6.2, y: boxY + 0.4, w: 0.4, h: 0.4, fill: { color: "CCCCCC" } });

// Stage 3: Push
slide7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: boxY, w: 2.5, h: boxH, fill: { color: "FCE4EC" }, line: { color: "E91E63" } });
slide7.addText("3. PUSH", { x: 6.7, y: boxY + 0.1, w: 2.5, h: 0.4, align: "center", bold: true, color: "C2185B" });
slide7.addText("git push", { x: 6.7, y: boxY + 0.5, w: 2.5, h: 0.4, align: "center", fontFace: "Consolas", fontSize: 12 });


// 설명 텍스트
slide7.addText("작업 후에는 항상 이 3단계를 순서대로 실행하여 GitHub에 저장합니다.", {
    x: 0.5, y: 4.5, w: 9, h: 0.5, fontSize: 16, color: theme.text, align: "center"
});


// 4. 파일 저장
pres.writeFile({ fileName: "Git_Management_Guide.pptx" })
    .then(fileName => {
        console.log(`파일 생성 완료: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });
