const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_4x3';
pres.author = '임태균';
pres.title = '스킬사용법 설명';

// Title Slide
let slide1 = pres.addSlide();
slide1.addText("스킬사용법 설명", { 
    x: 1, y: 2, w: 8, h: 1.5, fontSize: 48, bold: true, align: "center", color: "1E3A8A" 
});
slide1.addText("작성자: 임태균", { 
    x: 1, y: 4, w: 8, h: 1, fontSize: 24, align: "center", color: "64748B" 
});

// Content Slide 1
let slide2 = pres.addSlide();
slide2.addText("1. 스킬(Skill)이란?", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 32, bold: true, color: "0F172A" });
slide2.addText([
  { text: "AI 에이전트의 구체적인 작업을 수행하도록 돕는 특수 워크플로우", options: { bullet: true, breakLine: true } },
  { text: "지침(SKILL.md), 실행 코드스크립트, 템플릿 파일 등으로 구성", options: { bullet: true, breakLine: true } },
  { text: "단순 질문/답변을 넘어선 '실제 산출물' 생산에 최적화", options: { bullet: true } }
], { x: 0.5, y: 1.8, w: 9, h: 3, fontSize: 22, color: "334155" });

// Content Slide 2
let slide3 = pres.addSlide();
slide3.addText("2. 대표적인 스킬 소개", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 32, bold: true, color: "0F172A" });
slide3.addTable([
  [
    { text: "스킬명", options: { fill: { color: "3B82F6" }, color: "FFFFFF", bold: true, align: "center" } }, 
    { text: "주요 기능", options: { fill: { color: "3B82F6" }, color: "FFFFFF", bold: true, align: "center" } }
  ],
  ["pptx / docx", "파워포인트, 워드 문서 생성 및 데이터 처리"],
  ["pdf", "PDF 텍스트 추출, 통합, 분할, 문서 생성"],
  ["internal-comms", "사내 공지, 뉴스레터 등 내부 통신용 포맷 작성"],
  ["frontend-design", "현대적이고 수려한 웹 프론트엔드 UI 디자인 작성"]
], {
  x: 0.5, y: 1.8, w: 9, h: 2.5,
  colW: [3, 6],
  border: { pt: 1, color: "CBD5E1" },
  fill: { color: "F8FAFC" },
  fontSize: 18,
  valign: "middle"
});

// Conclusion Slide
let slide4 = pres.addSlide();
slide4.addText("3. 사용 방법", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 32, bold: true, color: "0F172A" });
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 1, y: 2, w: 8, h: 2,
  fill: { color: "EFF6FF" },
  line: { color: "3B82F6", width: 2 }
});
slide4.addText(`"프론트엔드 디자인 스킬을 사용해서 로그인 UI 만들어줘"\n"PPTX 스킬로 이 데이터를 발표 자료로 바꿔줘"`, { 
  x: 1, y: 2, w: 8, h: 2, 
  fontSize: 24, 
  align: "center", 
  valign: "middle",
  color: "1E40AF",
  bold: true
});
slide4.addText("위와 같이 사용할 스킬의 이름과 원하는 내용을 함께 자연어로 요청하시면 바로 동작합니다.", {
  x: 0.5, y: 4.5, w: 9, h: 1,
  fontSize: 20,
  align: "center",
  color: "475569"
});

pres.writeFile({ fileName: "skill_guide_presentation.pptx" }).then(fileName => {
    console.log("created file: " + fileName);
}).catch(err => {
    console.error(err);
});
