const PptxGenJS = require("pptxgenjs");

// 1. 프레젠테이션 생성
let pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9';

// 2. 테마 색상 정의 (화이트 & 네이비 - Light Mode)
const theme = {
    bg: "FFFFFF",       // 화이트 (배경)
    title: "1E2761",    // 네이비 블루 (제목)
    text: "333333",     // 짙은 회색 (본문)
    accent1: "00897B",  // 짙은 틸 (강조 - 흰 배경에서 잘 보이도록 명도 조절)
    accent2: "6A1B9A",  // 짙은 퍼플
    accent3: "D81B60",  // 짙은 핑크
    chartColors: ["00897B", "6A1B9A", "D81B60", "FFC107", "1E88E5"]
};

// 3. 마스터 슬라이드 정의 (공통 레이아웃)
pres.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { color: theme.bg },
    objects: [
        // 하단 장식 바
        { rect: { x: 0, y: 5.5, w: "100%", h: 0.125, fill: { color: theme.accent1 } } },
        // 슬라이드 번호 및 바닥글
        { text: { text: "2026 AI 기술 동향", options: { x: 0.5, y: 5.25, fontSize: 10, color: theme.text, align: "left" } } }, 
        { mlSlideNumber: { x: 9.0, y: 5.25, w: 1, h: 0.25, fontSize: 10, color: theme.text, align: "right" } }
    ]  
});

// 슬라이드 추가 헬퍼 함수
function addSlide(titleText) {
    let slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
    if (titleText) {
        slide.addText(titleText, { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, 
            fontSize: 32, fontFace: "Malgun Gothic", bold: true, color: theme.title,
            align: "left"
        });
        // 제목 밑줄 (도형으로 표현)
        slide.addShape(pres.shapes.RECTANGLE, { 
            x: 0.5, y: 1.4, w: 1.5, h: 0.05, 
            fill: { color: theme.accent1 }, line: { width: 0 } 
        });
    }
    return slide;
}

// -------------------------------------------------------------------------
// SLIDE 1: 타이틀 슬라이드
// -------------------------------------------------------------------------
let slide1 = pres.addSlide();
slide1.background = { color: theme.bg };

// 메인 타이틀
slide1.addText("2026 AI 기술 동향", {
    x: 0.5, y: 1.5, w: 9, h: 1.5,
    fontSize: 54, fontFace: "Malgun Gothic", color: theme.title, align: "center", bold: true
});

// 서브 타이틀
slide1.addText("에이전틱 인텔리전스와 멀티모달 추론의 시대", {
    x: 1, y: 3.0, w: 8, h: 0.8,
    fontSize: 24, fontFace: "Malgun Gothic", color: theme.accent1, align: "center"
});

// 발표자 정보
slide1.addText("발표: Antigravity", {
    x: 1, y: 4.5, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Malgun Gothic", color: theme.text, align: "center"
});


// -------------------------------------------------------------------------
// SLIDE 2: 목차 (Agenda)
// -------------------------------------------------------------------------
let slide2 = addSlide("목차 (Agenda)");

const agendaItems = [
    "서론: AI의 기하급수적 성장",
    "핵심 트렌드 1: 에이전틱 AI (대화에서 행동으로)",
    "핵심 트렌드 2: 멀티모달 리즈닝 (Multimodal Reasoning)",
    "핵심 트렌드 3: 효율적인 소형 언어 모델 (SLM)",
    "산업별 영향: 코딩, 헬스케어, 금융",
    "미래 전망 및 과제"
];

let startY = 2.0;
agendaItems.forEach((item, index) => {
    // 불릿 포인트 모양
    slide2.addShape(pres.shapes.OVAL, {
        x: 0.8, y: startY + (index * 0.5) + 0.1, w: 0.15, h: 0.15,
        fill: { color: theme.accent1 }, line: { width: 0 }
    });
    // 텍스트
    slide2.addText(item, {
        x: 1.2, y: startY + (index * 0.5), w: 8, h: 0.4,
        fontSize: 20, fontFace: "Malgun Gothic", color: theme.text
    });
});


// -------------------------------------------------------------------------
// SLIDE 3: AI 모델의 진화
// -------------------------------------------------------------------------
let slide3 = addSlide("AI 모델의 진화 과정");

// 타임라인 시각화
const steps = [
    { year: "2022", title: "텍스트 생성", desc: "ChatGPT 출시, 텍스트 기반 질의응답 중심." },
    { year: "2024", title: "멀티모달", desc: "시각, 청각 통합. 이미지를 이해하고 생성." },
    { year: "2026", title: "에이전틱 AI", desc: "자율적인 행동, 추론, 도구(Tool) 사용." }
];

steps.forEach((step, i) => {
    let xPos = 0.5 + (i * 3.2);
    
    // 연도 박스
    slide3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: xPos, y: 2.0, w: 2.8, h: 2.5,
        fill: { color: "2D3B7A" }, line: { color: theme.accent1, width: 2 }
    });
    
    // 연도 텍스트
    slide3.addText(step.year, {
        x: xPos, y: 2.2, w: 2.8, h: 0.5,
        fontSize: 24, fontFace: "Malgun Gothic", bold: true, color: theme.accent1, align: "center"
    });
    
    // 제목
    slide3.addText(step.title, {
        x: xPos, y: 2.8, w: 2.8, h: 0.5,
        fontSize: 18, fontFace: "Malgun Gothic", bold: true, color: theme.title, align: "center"
    });
    
    // 설명
    slide3.addText(step.desc, {
        x: xPos + 0.2, y: 3.4, w: 2.4, h: 1.0,
        fontSize: 14, fontFace: "Malgun Gothic", color: theme.text, align: "center"
    });
    
    // 화살표 (마지막 항목 제외)
    if (i < steps.length - 1) {
        slide3.addShape(pres.shapes.RIGHT_ARROW, {
            x: xPos + 2.9, y: 3.1, w: 0.4, h: 0.3,
            fill: { color: theme.text }
        });
    }
});


// -------------------------------------------------------------------------
// SLIDE 4: 트렌드 1 - 에이전틱 AI
// -------------------------------------------------------------------------
let slide4 = addSlide("트렌드 1: 에이전틱 AI (Agentic AI)");

slide4.addText("단순히 '말하는' AI가 아니라, 일을 '수행하는' AI", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 20, fontFace: "Malgun Gothic", color: theme.accent1, italic: true
});

// 왼쪽 열: 특징
slide4.addText([
    { text: "자율적인 실행 (Autonomous Execution)", options: { bullet: true, breakLine: true } },
    { text: "동적인 도구 사용 (API, 웹 검색, CLI)", options: { bullet: true, breakLine: true } },
    { text: "계획 수립 및 자가 수정 (Planning & Self-Correction)", options: { bullet: true, breakLine: true } },
    { text: "장기 실행 작업 처리", options: { bullet: true } }
], { x: 0.5, y: 2.5, w: 4.5, h: 2.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text });

// 오른쪽 열: 워크플로우 다이어그램 (간소화)
slide4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 2.5, w: 4, h: 0.6, fill: { color: theme.accent2 } });
slide4.addText("사용자 요청", { x: 5.5, y: 2.5, w: 4, h: 0.6, align: "center", fontFace: "Malgun Gothic", color: theme.title });

slide4.addShape(pres.shapes.DOWN_ARROW, { x: 7.3, y: 3.2, w: 0.4, h: 0.4, fill: { color: theme.text } });

slide4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 3.7, w: 4, h: 0.6, fill: { color: theme.accent1 } });
slide4.addText("에이전트 플래너 (판단/계획)", { x: 5.5, y: 3.7, w: 4, h: 0.6, align: "center", fontFace: "Malgun Gothic", color: "1E2761", bold: true });

slide4.addShape(pres.shapes.DOWN_ARROW, { x: 7.3, y: 4.4, w: 0.4, h: 0.4, fill: { color: theme.text } });

slide4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 4.9, w: 4, h: 0.6, fill: { color: theme.accent3 } });
slide4.addText("작업 실행 (Action)", { x: 5.5, y: 4.9, w: 4, h: 0.6, align: "center", fontFace: "Malgun Gothic", color: "1E2761", bold: true });


// -------------------------------------------------------------------------
// SLIDE 5: 트렌드 2 - 멀티모달 리즈닝
// -------------------------------------------------------------------------
let slide5 = addSlide("트렌드 2: 멀티모달 리즈닝");

slide5.addText("텍스트, 오디오, 비디오, 코드를 하나의 모델이 통합 처리", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

// 차트: 모델 성능 지표
let chartData = [{
    name: "모델 성능",
    labels: ["텍스트", "코드", "수학", "비전(시각)", "오디오"],
    values: [98, 92, 95, 88, 85]
}];

slide5.addChart(pres.charts.RADAR, chartData, {
    x: 2.5, y: 2.5, w: 5, h: 3,
    chartColors: [theme.accent1],
    chartArea: { fill: { transparency: 100 } }, // 투명 배경
    catAxisLabelColor: theme.text,
    valAxisLabelColor: theme.text,
    valGridLine: { color: "4A5568", style: "dash" },
    showTitle: false,
    showLegend: false
});


// -------------------------------------------------------------------------
// SLIDE 6: 트렌드 3 - 효율적인 SLM
// -------------------------------------------------------------------------
let slide6 = addSlide("트렌드 3: SLM (소형 언어 모델)의 부상");

slide6.addText("내 노트북과 스마트폰에서 돌아가는 고성능 AI", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, fontFace: "Malgun Gothic", color: theme.text
});

// 비교표
let rows = [
    [
        { text: "구분", options: { bold: true, fill: { color: theme.accent2 }, color: "FFFFFF" } },
        { text: "거대 언어 모델 (LLM)", options: { bold: true, fill: { color: theme.accent2 }, color: "FFFFFF" } },
        { text: "소형 언어 모델 (SLM)", options: { bold: true, fill: { color: theme.accent2 }, color: "FFFFFF" } }
    ],
    ["파라미터 수", "1,000억 개 이상 (100B+)", "10억~100억 개 (1B~10B)"],
    ["배포 환경", "클라우드 / 데이터 센터", "엣지 디바이스 / 로컬"],
    ["비용", "높음 (API 비용 발생)", "낮음 / 무료"],
    ["개인정보", "클라우드로 데이터 전송 필요", "로컬에서 처리 (보안 우수)"],
    ["주요 용도", "복합 추론, 방대한 지식", "특정 태스크, 코딩, RAG"]
];

slide6.addTable(rows, {
    x: 0.5, y: 2.5, w: 9, h: 2.5,
    border: { color: theme.title, pt: 1 },
    fill: { color: "F9F9F9" },
    color: theme.text,
    fontFace: "Malgun Gothic",
    autoPage: false
});


// -------------------------------------------------------------------------
// SLIDE 7: 미래 전망 및 결론
// -------------------------------------------------------------------------
let slide7 = addSlide("미래 전망");

slide7.addText("AI 기술은 어디로 향하고 있는가?", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 20, fontFace: "Malgun Gothic", color: theme.accent1
});

// 3개의 핵심 키워드 원형 배치
const concepts = [
    { title: "규제 및 안전", text: "AI 거버넌스 강화", color: theme.accent3 },
    { title: "AGI", text: "범용 인공지능을 향해", color: theme.accent1 },
    { title: "협업", text: "AI: 도구에서 파트너로", color: theme.accent2 }
];

concepts.forEach((c, i) => {
    let xPos = 1.0 + (i * 3.0);
    // 원형 도형
    slide7.addShape(pres.shapes.OVAL, {
        x: xPos, y: 2.8, w: 2.0, h: 2.0,
        fill: { color: c.color }, line: { width: 0 }
    });
    // 내부 텍스트
    slide7.addText(c.title, {
        x: xPos, y: 3.5, w: 2.0, h: 0.6,
        fontSize: 18, fontFace: "Malgun Gothic", bold: true, color: "1E2761", align: "center"
    });
});

slide7.addText("미래는 '맥락을 이해하고 스스로 행동하는 AI'가 주도할 것입니다.", {
    x: 0.5, y: 5.0, w: 9, h: 0.5, fontSize: 16, fontFace: "Malgun Gothic", color: theme.text, align: "center", italic: true
});


// 4. 파일 저장
pres.writeFile({ fileName: "AI_Trends_2026_KR_Light.pptx" })
    .then(fileName => {
        console.log(`파일 생성 완료: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });
