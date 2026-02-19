import sys
import os
import math
import random

# Add the skill directory to sys.path to import modules
skill_path = os.path.abspath(".agent/skills/slack-gif-creator")
sys.path.append(skill_path)

from core.gif_builder import GIFBuilder
from core.easing import interpolate
from PIL import Image, ImageDraw, ImageFont

# --------------------------------------------------------------------------------
# Configuration
# --------------------------------------------------------------------------------

WIDTH = 480
HEIGHT = 480
FPS = 20
DURATION = 4.0 # seconds
NUM_FRAMES = int(FPS * DURATION)
BG_COLOR = (240, 248, 255) # AliceBlue
TEXT_COLOR = (255, 69, 0)   # OrangeRed
CONFETTI_COLORS = [
    (255, 0, 0),    # Red
    (0, 255, 0),    # Green
    (0, 0, 255),    # Blue
    (255, 255, 0),  # Yellow
    (255, 0, 255),  # Magenta
    (0, 255, 255),  # Cyan
    (255, 165, 0)   # Orange
]

# --------------------------------------------------------------------------------
# Helper Functions
# --------------------------------------------------------------------------------

def draw_confetti(draw, particles):
    """Draws confetti particles on the frame."""
    for p in particles:
        x, y, size, color, angle = p
        # Simple rectangle for confetti
        # Rotate logic would be complex with standard PIL, so we interpret angle as aspect ratio change
        # to simulate 3D rotation
        
        width = size * math.cos(angle)
        height = size * 0.6
        
        x1 = x - width / 2
        y1 = y - height / 2
        x2 = x + width / 2
        y2 = y + height / 2
        
        # Ensure coordinates are ordered (top-left, bottom-right)
        left = min(x1, x2)
        top = min(y1, y2)
        right = max(x1, x2)
        bottom = max(y1, y2)
        
        draw.rectangle([left, top, right, bottom], fill=color)

def update_confetti(particles):
    """Updates confetti positions."""
    new_particles = []
    for p in particles:
        x, y, size, color, angle = p
        
        # Gravity + Sway
        y += 5 + size * 0.2
        x += math.sin(y * 0.05) * 2
        angle += 0.1
        
        if y < HEIGHT + 20: # Keep if still on screen (or slightly above for continuous feeling)
            new_particles.append((x, y, size, color, angle))
        else:
             # Reset to top for loop continuity (optional)
             pass
             
    # Add new particles to keep the flow
    if len(new_particles) < 100:
        for _ in range(5):
             new_particles.append((
                random.randint(0, WIDTH),
                random.randint(-50, -10), # Start above screen
                random.randint(5, 12),
                random.choice(CONFETTI_COLORS),
                random.random() * math.pi
            ))
            
    return new_particles

# --------------------------------------------------------------------------------
# Main Animation Loop
# --------------------------------------------------------------------------------

def create_celebration_gif():
    builder = GIFBuilder(width=WIDTH, height=HEIGHT, fps=FPS)
    
    # Initialize confetti
    confetti_particles = []
    for _ in range(100):
        confetti_particles.append((
            random.randint(0, WIDTH),
            random.randint(-HEIGHT, 0), # Start spread out above
            random.randint(5, 12),
            random.choice(CONFETTI_COLORS),
            random.random() * math.pi
        ))

    # Load font (prioritize Korean fonts)
    try:
        # MacOS Korean font
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/AppleGothic.ttf", 60)
    except IOError:
        try:
            # Modern MacOS Korean font
            font = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 60)
        except IOError:
            try:
                 font = ImageFont.truetype("/usr/share/fonts/truetype/nanum/NanumGothic.ttf", 60)
            except IOError:
                 print("Warning: Korean font not found, text may not render correctly.")
                 font = ImageFont.load_default()

    text = "축하합니다"
    
    # Pre-calculate text size to center it
    dummy_img = Image.new('RGB', (1, 1))
    dummy_draw = ImageDraw.Draw(dummy_img)
    text_bbox = dummy_draw.textbbox((0, 0), text, font=font)
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]
    
    center_x = WIDTH // 2
    center_y = HEIGHT // 2

    for i in range(NUM_FRAMES):
        frame = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
        draw = ImageDraw.Draw(frame)
        
        # 1. Update and Draw Confetti
        confetti_particles = update_confetti(confetti_particles)
        draw_confetti(draw, confetti_particles)
        
        # 2. Animate Text (Scale Pulse)
        # Pulse frequency: 2 times per second
        t = i / float(FPS)
        scale = 1.0 + 0.1 * math.sin(t * math.pi * 2 * 2) 
        
        # We can't easily scale text in PIL 2D drawing without resampling.
        # Instead, we'll draw text on a temporary image and resize it.
        
        # Create temp image for text with transparent background
        txt_img_size = (int(text_w * 1.5), int(text_h * 1.5))
        txt_img = Image.new('RGBA', txt_img_size, (0, 0, 0, 0))
        txt_draw = ImageDraw.Draw(txt_img)
        
        # Draw text centered in temp image
        txt_draw.text(
            ((txt_img_size[0] - text_w) // 2, (txt_img_size[1] - text_h) // 2),
            text,
            font=font,
            fill=TEXT_COLOR + (255,) # Add alpha
        )
        
        # Resize text image based on scale
        scaled_w = int(txt_img_size[0] * scale)
        scaled_h = int(txt_img_size[1] * scale)
        
        if scaled_w > 0 and scaled_h > 0:
            scaled_txt_img = txt_img.resize((scaled_w, scaled_h), resample=Image.BICUBIC)
            
            # Composite onto main frame
            paste_x = center_x - scaled_w // 2
            paste_y = center_y - scaled_h // 2
            
            frame.paste(scaled_txt_img, (paste_x, paste_y), scaled_txt_img)
        
        builder.add_frame(frame)

    # Save
    output_filename = "celebration.gif"
    builder.save(output_filename, num_colors=128, optimize_for_emoji=False) # High quality for text
    print(f"Created {output_filename}")

if __name__ == "__main__":
    create_celebration_gif()
