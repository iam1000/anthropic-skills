from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# --- 1. Font Setup (Using System Font for Korean Support) ---
# Trying to find a Korean font available on macOS
font_path = "/System/Library/Fonts/Supplemental/AppleGothic.ttf"
font_name = "AppleGothic"

if not os.path.exists(font_path):
    # Fallback to another common font if AppleGothic is missing
    font_path = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
    font_name = "AppleSDGothicNeo-Regular"

try:
    pdfmetrics.registerFont(TTFont(font_name, font_path))
    print(f"Registered font: {font_name} from {font_path}")
except Exception as e:
    print(f"Font registration failed: {e}")
    print("Using default Helvetica (Korean characters will not display correctly)")
    font_name = "Helvetica"

# --- 2. Styles Setup ---
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CustomTitle', 
                          fontName=font_name, 
                          fontSize=24, 
                          leading=30, 
                          spaceAfter=20, 
                          alignment=1, # Center
                          textColor=colors.navy))

styles.add(ParagraphStyle(name='CustomHeading1', 
                          fontName=font_name, 
                          fontSize=18, 
                          leading=22, 
                          spaceAfter=12,
                          textColor=colors.darkblue))

styles.add(ParagraphStyle(name='CustomNormal', 
                          fontName=font_name, 
                          fontSize=12, 
                          leading=18,
                          spaceAfter=6))
                          
styles.add(ParagraphStyle(name='CustomCode', 
                          fontName="Courier", 
                          fontSize=10, 
                          leading=14, 
                          backColor=colors.lightgrey,
                          borderPadding=5,
                          spaceAfter=10))

# --- 3. Content Generation ---
doc = SimpleDocTemplate("Antigravity_Skills_Guide_Direct.pdf", pagesize=A4)
story = []

# Title
story.append(Paragraph("Antigravity Skills 사용법 가이드", styles['CustomTitle']))
story.append(Spacer(1, 12))
story.append(Paragraph("AI 에이전트의 능력을 확장하는 실전 활용 매뉴얼", styles['CustomNormal']))
story.append(Spacer(1, 24))

# Section 1
story.append(Paragraph("1. Antigravity Skills란?", styles['CustomHeading1']))
story.append(Paragraph("AI 에이전트가 특정 작업을 전문적으로 수행하도록 돕는 '도구 모음'입니다.", styles['CustomNormal']))
story.append(Spacer(1, 12))

data1 = [
    ["지침 (Instructions)", "스크립트 (Scripts)", "리소스 (Resources)"],
    ["SKILL.md 파일에 정의된\n행동 규칙", "Python/JS로 작성된\n실행 코드", "템플릿 및 예제 파일"]
]
t1 = Table(data1, colWidths=[150, 150, 150])
t1.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.aliceblue),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.navy),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, -1), font_name),
    ('FONTSIZE', (0, 0), (-1, 0), 12),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, 1), (-1, -1), colors.whitesmoke),
    ('GRID', (0, 0), (-1, -1), 1, colors.black)
]))
story.append(t1)
story.append(Spacer(1, 24))

# Section 2
story.append(Paragraph("2. 주요 사용 가능 스킬", styles['CustomHeading1']))
skills_list = [
    "PPTX: 파워포인트 슬라이드 생성 및 수정",
    "DOCX: Word 문서 생성 및 서식 적용",
    "XLSX: Excel 데이터 시트 관리 및 분석",
    "PDF: PDF 문서 생성 및 텍스트 추출"
]
for skill in skills_list:
    story.append(Paragraph(f"• {skill}", styles['CustomNormal']))

story.append(Spacer(1, 24))

# Section 3: PPTX Usage
story.append(Paragraph("3. PPTX 스킬 활용법", styles['CustomHeading1']))
story.append(Paragraph("Python의 markitdown과 Node.js의 PptxGenJS를 활용합니다.", styles['CustomNormal']))
story.append(Spacer(1, 6))

story.append(Paragraph("1) 텍스트 추출 명령어:", styles['CustomNormal']))
story.append(Paragraph("python -m markitdown presentation.pptx", styles['CustomCode']))

story.append(Paragraph("2) 새 프리젠테이션 생성 (JS Script):", styles['CustomNormal']))
code_example = """let pres = new PptxGenJS();
let slide = pres.addSlide();
slide.addText("Hello World", { x:1, y:1, fontSize:24 });
pres.writeFile({ fileName: "Output.pptx" });"""
story.append(Paragraph(code_example.replace("\n", "<br/>"), styles['CustomCode']))
story.append(Spacer(1, 24))

# Section 4: DOCX Usage
story.append(Paragraph("4. DOCX 스킬 활용법", styles['CustomHeading1']))
story.append(Paragraph("docx-js 라이브러리를 사용하여 전문적인 Word 문서를 생성합니다.", styles['CustomNormal']))
story.append(Spacer(1, 6))
story.append(Paragraph("• 제목, 본문, 글머리 기호 등 스타일 지정", styles['CustomNormal']))
story.append(Paragraph("• 표(Table) 생성 및 병합", styles['CustomNormal']))
story.append(Paragraph("• 이미지 삽입 및 페이지 번호 매기기", styles['CustomNormal']))
story.append(Spacer(1, 24))

# Section 5: Best Practices
story.append(Paragraph("5. 효과적인 사용을 위한 팁", styles['CustomHeading1']))
tips = [
    ["명확한 지시", "스킬 사용 시 구체적인 파일명과 원하는 출력 형태를 명시하세요."],
    ["검증 단계", "생성된 파일은 항상 열어서 시각적 오류가 없는지 확인해야 합니다."],
    ["백업 필수", "덮어쓰기 옵션 사용 전 원본 파일을 백업하세요."]
]

t2 = Table(tips, colWidths=[120, 330])
t2.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
    ('TEXTCOLOR', (0, 0), (0, -1), colors.black),
    ('ALIGN', (0, 0), (0, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('FONTNAME', (0, 0), (-1, -1), font_name),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
]))
story.append(t2)
story.append(Spacer(1, 24))

# Footer
story.append(Paragraph("Generated by Antigravity Agent", styles['CustomNormal']))

# Build PDF
doc.build(story)
print(f"PDF generated successfully: Antigravity_Skills_Guide_Direct.pdf")
