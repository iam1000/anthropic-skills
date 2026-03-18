from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
import re

# Font Setup (Korean Support)
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
styles.add(ParagraphStyle(name='MdTitle', fontName=font_name, fontSize=24, leading=28, spaceAfter=20, textColor=colors.navy, alignment=1)) # Center
styles.add(ParagraphStyle(name='MdNormal', fontName=font_name, fontSize=11, leading=16, spaceAfter=6))
styles.add(ParagraphStyle(name='TableCell', fontName=font_name, fontSize=10, leading=14))
styles.add(ParagraphStyle(name='TableHeader', fontName=font_name, fontSize=11, leading=14, textColor=colors.white, alignment=1))

# Process Markdown
doc = SimpleDocTemplate("AVAILABLE_SKILLS.pdf", pagesize=landscape(A4), rightMargin=30, leftMargin=30, topMargin=40, bottomMargin=40)
story = []

with open("AVAILABLE_SKILLS.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

table_data = []
in_table = False

for line in lines:
    line = line.strip()
    if not line:
        continue

    # Clean markdown bold/code for ReportLab
    line = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line)
    line = re.sub(r'`(.*?)`', r'<font name="Courier">\1</font>', line)
    line = line.replace("<br>", "<br/>")

    if line.startswith("# "):
        # Title
        story.append(Paragraph(line[2:], styles['MdTitle']))
        story.append(Spacer(1, 20))
    
    elif line.startswith("|"):
        # Table Row
        if "---" in line: # Skip separator
            continue
        
        in_table = True
        # Split row by | and ignore first and last empty elements from leading/trailing |
        cells = [c.strip() for c in line.split("|")][1:-1]
        
        parsed_cells = []
        for i, text in enumerate(cells):
             style = styles['TableHeader'] if len(table_data) == 0 else styles['TableCell']
             parsed_cells.append(Paragraph(text, style))
        
        if parsed_cells:
            table_data.append(parsed_cells)

# Render Table
if table_data:
    t = Table(table_data, colWidths=[120, 320, 320])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.navy),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, -1), font_name),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.whitesmoke),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.whitesmoke]),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
    ]))
    story.append(t)

doc.build(story)
print("PDF generated: AVAILABLE_SKILLS.pdf")
