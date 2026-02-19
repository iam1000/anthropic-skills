from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
import re

# Font Setup
font_path = "/System/Library/Fonts/Supplemental/AppleGothic.ttf"
font_name = "AppleGothic"

if not os.path.exists(font_path):
    font_path = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
    font_name = "AppleSDGothicNeo-Regular"

try:
    pdfmetrics.registerFont(TTFont(font_name, font_path))
except Exception:
    font_name = "Helvetica" # Fallback

# Styles
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='MdTitle', fontName=font_name, fontSize=24, leading=28, spaceAfter=20, textColor=colors.navy))
styles.add(ParagraphStyle(name='MdHeading', fontName=font_name, fontSize=16, leading=20, spaceBefore=12, spaceAfter=8, textColor=colors.darkblue))
styles.add(ParagraphStyle(name='MdNormal', fontName=font_name, fontSize=11, leading=16, spaceAfter=6))
styles.add(ParagraphStyle(name='MdCode', fontName="Courier", fontSize=10, leading=12, backColor=colors.whitesmoke, borderPadding=5, spaceAfter=10, leftIndent=20))

# Content Processing
doc = SimpleDocTemplate("GIT_CONNECT_GUIDE.pdf", pagesize=A4)
story = []

with open("GIT_CONNECT_GUIDE.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

in_code_block = False
code_buffer = []

for line in lines:
    line = line.rstrip()
    
    if line.startswith("```"):
        if in_code_block:
            # End code block
            p = Preformatted("\n".join(code_buffer), styles['MdCode'])
            story.append(p)
            code_buffer = []
            in_code_block = False
        else:
            # Start code block
            in_code_block = True
        continue

    if in_code_block:
        code_buffer.append(line)
        continue

    if not line:
        continue

    if line.startswith("# "):
        story.append(Paragraph(line[2:], styles['MdTitle']))
        story.append(Spacer(1, 10))
    elif line.startswith("## "):
        story.append(Paragraph(line[3:], styles['MdHeading']))
    elif line.startswith("**") and line.endswith("**"):
        story.append(Paragraph(f"<b>{line[2:-2]}</b>", styles['MdNormal']))
    else:
        # Simple Bold replacement for markdown **text**
        processed_line = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line)
        story.append(Paragraph(processed_line, styles['MdNormal']))

if code_buffer: # Close any open code block at EOF
    p = Preformatted("\n".join(code_buffer), styles['MdCode'])
    story.append(p)

doc.build(story)
print("PDF generated: GIT_CONNECT_GUIDE.pdf")
