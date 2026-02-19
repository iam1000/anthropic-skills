const PptxGenJS = require("pptxgenjs");

// 1. Create a new Presentation
let pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9';

// 2. Define Theme Colors (Midnight Executive)
const theme = {
    bg: "1E2761",       // Navy Blue
    title: "FFFFFF",    // White
    text: "CADCFC",     // Ice Blue
    accent1: "00C9A7",  // Teal/Mint Green (Standout)
    accent2: "845EC2",  // Purple
    accent3: "FF6F91",  // Pink/Coral (Highlight)
    chartColors: ["00C9A7", "845EC2", "FF6F91", "FFC75F", "F9F871"]
};

// 3. Define Master Slide (Common Layout)
pres.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { color: theme.bg },
    objects: [
        // Decorative Bar at bottom
        { rect: { x: 0, y: 5.5, w: "100%", h: 0.125, fill: { color: theme.accent1 } } },
        // Slide Number
        { text: { text: "AI Trends 2026", options: { x: 0.5, y: 5.25, fontSize: 10, color: theme.text, align: "left" } } }, 
        { mlSlideNumber: { x: 9.0, y: 5.25, w: 1, h: 0.25, fontSize: 10, color: theme.text, align: "right" } }
    ]  
});

// Helper function to create slides easily
function addSlide(titleText) {
    let slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
    if (titleText) {
        slide.addText(titleText, { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, 
            fontSize: 32, fontFace: "Arial", bold: true, color: theme.title,
            align: "left"
        });
        // Underline equivalent (using shape)
        slide.addShape(pres.shapes.RECTANGLE, { 
            x: 0.5, y: 1.4, w: 1.5, h: 0.05, 
            fill: { color: theme.accent1 }, line: { width: 0 } 
        });
    }
    return slide;
}

// -------------------------------------------------------------------------
// SLIDE 1: Title Slide
// -------------------------------------------------------------------------
let slide1 = pres.addSlide();
slide1.background = { color: theme.bg };

// Main Title
slide1.addText("2026 AI Technology Trends", {
    x: 0.5, y: 1.5, w: 9, h: 1.5,
    fontSize: 54, fontFace: "Arial Black", color: theme.title, align: "center", bold: true
});

// Subtitle
slide1.addText("The Era of Agentic Intelligence & Multimodal Reasoners", {
    x: 1, y: 3.0, w: 8, h: 0.8,
    fontSize: 24, fontFace: "Arial", color: theme.accent1, align: "center"
});

// Presenter info
slide1.addText("Presented by Antigravity", {
    x: 1, y: 4.5, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Arial", color: theme.text, align: "center"
});


// -------------------------------------------------------------------------
// SLIDE 2: Agenda
// -------------------------------------------------------------------------
let slide2 = addSlide("Agenda");

const agendaItems = [
    "Introduction: The Exponential Growth",
    "Key Trend 1: Agentic AI (From Chat to Action)",
    "Key Trend 2: Multimodal Reasoners",
    "Key Trend 3: Efficient SLMs (Small Language Models)",
    "Industry Impact: Coding, Healthcare, Finance",
    "Future Outlook & Challenges"
];

let startY = 2.0;
agendaItems.forEach((item, index) => {
    // Bullet point shape
    slide2.addShape(pres.shapes.OVAL, {
        x: 0.8, y: startY + (index * 0.5) + 0.1, w: 0.15, h: 0.15,
        fill: { color: theme.accent1 }, line: { width: 0 }
    });
    // Text
    slide2.addText(item, {
        x: 1.2, y: startY + (index * 0.5), w: 8, h: 0.4,
        fontSize: 20, color: theme.text
    });
});


// -------------------------------------------------------------------------
// SLIDE 3: The Evolution of AI
// -------------------------------------------------------------------------
let slide3 = addSlide("The Evolution of AI Models");

// Create a visual timeline using shapes
const steps = [
    { year: "2022", title: "Text Generation", desc: "ChatGPT launch, focusing on text-based Q&A." },
    { year: "2024", title: "Multimodal", desc: "Vision, Audio integration. Understanding images." },
    { year: "2026", title: "Agentic AI", desc: "Autonomous actions, reasoning, tool usage." }
];

steps.forEach((step, i) => {
    let xPos = 0.5 + (i * 3.2);
    
    // Year Box
    slide3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: xPos, y: 2.0, w: 2.8, h: 2.5,
        fill: { color: "2D3B7A" }, line: { color: theme.accent1, width: 2 }
    });
    
    // Year Text
    slide3.addText(step.year, {
        x: xPos, y: 2.2, w: 2.8, h: 0.5,
        fontSize: 24, bold: true, color: theme.accent1, align: "center"
    });
    
    // Title
    slide3.addText(step.title, {
        x: xPos, y: 2.8, w: 2.8, h: 0.5,
        fontSize: 18, bold: true, color: theme.title, align: "center"
    });
    
    // Description
    slide3.addText(step.desc, {
        x: xPos + 0.2, y: 3.4, w: 2.4, h: 1.0,
        fontSize: 14, color: theme.text, align: "center"
    });
    
    // Arrow (except last one)
    if (i < steps.length - 1) {
        slide3.addShape(pres.shapes.RIGHT_ARROW, {
            x: xPos + 2.9, y: 3.1, w: 0.4, h: 0.3,
            fill: { color: theme.text }
        });
    }
});


// -------------------------------------------------------------------------
// SLIDE 4: Trend 1 - Agentic AI
// -------------------------------------------------------------------------
let slide4 = addSlide("Trend 1: Agentic AI");

slide4.addText("Agents that 'DO' things, not just 'SAY' things.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 20, color: theme.accent1, italic: true
});

// Left Column: Characteristics
slide4.addText([
    { text: "Autonomous Execution", options: { bullet: true, breakLine: true } },
    { text: "Dynamic Tool Usage (API, Web, CLI)", options: { bullet: true, breakLine: true } },
    { text: "Planning & Self-Correction", options: { bullet: true, breakLine: true } },
    { text: "Long-running tasks", options: { bullet: true } }
], { x: 0.5, y: 2.5, w: 4.5, h: 2.5, fontSize: 18, color: theme.text });

// Right Column: Workflow Diagram (Simplified)
slide4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 2.5, w: 4, h: 0.6, fill: { color: theme.accent2 } });
slide4.addText("User Request", { x: 5.5, y: 2.5, w: 4, h: 0.6, align: "center", color: theme.title });

slide4.addShape(pres.shapes.DOWN_ARROW, { x: 7.3, y: 3.2, w: 0.4, h: 0.4, fill: { color: theme.text } });

slide4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 3.7, w: 4, h: 0.6, fill: { color: theme.accent1 } });
slide4.addText("Agentic Planner", { x: 5.5, y: 3.7, w: 4, h: 0.6, align: "center", color: "1E2761", bold: true });

slide4.addShape(pres.shapes.DOWN_ARROW, { x: 7.3, y: 4.4, w: 0.4, h: 0.4, fill: { color: theme.text } });

slide4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 4.9, w: 4, h: 0.6, fill: { color: theme.accent3 } });
slide4.addText("Action Execution", { x: 5.5, y: 4.9, w: 4, h: 0.6, align: "center", color: "1E2761", bold: true });


// -------------------------------------------------------------------------
// SLIDE 5: Trend 2 - Multimodal Reasoners
// -------------------------------------------------------------------------
let slide5 = addSlide("Trend 2: Multimodal Reasoners");

slide5.addText("Text, Audio, Video, and Code handled natively by a single model.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, color: theme.text
});

// Chart demonstrating capabilities
let chartData = [{
    name: "Model Performance",
    labels: ["Text", "Code", "Math", "Vision", "Audio"],
    values: [98, 92, 95, 88, 85]
}];

slide5.addChart(pres.charts.RADAR, chartData, {
    x: 2.5, y: 2.5, w: 5, h: 3,
    chartColors: [theme.accent1],
    chartArea: { fill: { transparency: 100 } }, // Transparent bg
    catAxisLabelColor: theme.text,
    valAxisLabelColor: theme.text,
    valGridLine: { color: "4A5568", style: "dash" },
    showTitle: false,
    showLegend: false
});


// -------------------------------------------------------------------------
// SLIDE 6: Trend 3 - Efficient SLMs
// -------------------------------------------------------------------------
let slide6 = addSlide("Trend 3: Rise of SLMs");

slide6.addText("Small Language Models: Running on your laptop & phone.", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 18, color: theme.text
});

// Comparison Table
let rows = [
    [
        { text: "Feature", options: { bold: true, fill: { color: theme.accent2 }, color: "FFFFFF" } },
        { text: "Large Language Models (LLM)", options: { bold: true, fill: { color: theme.accent2 }, color: "FFFFFF" } },
        { text: "Small Language Models (SLM)", options: { bold: true, fill: { color: theme.accent2 }, color: "FFFFFF" } }
    ],
    ["Parameter Count", "100B - 1T+", "1B - 10B"],
    ["Deployment", "Cloud / Data Center", "Edge / Local Device"],
    ["Cost", "High (API calls)", "Low / Zero"],
    ["Privacy", "Data sent to cloud", "Data stays local"],
    ["Use Case", "Complex reasoning, General knowledge", "Specific tasks, RAG, Coding"]
];

slide6.addTable(rows, {
    x: 0.5, y: 2.5, w: 9, h: 2.5,
    border: { color: theme.bg, pt: 1 },
    fill: { color: "2D3B7A" },
    color: theme.text,
    autoPage: false
});


// -------------------------------------------------------------------------
// SLIDE 7: Future Outlook & Conclusion
// -------------------------------------------------------------------------
let slide7 = addSlide("Future Outlook");

slide7.addText("What's next for AI?", {
    x: 0.5, y: 1.8, w: 9, h: 0.5, fontSize: 20, color: theme.accent1
});

// 3 Big Circles for concepts
const concepts = [
    { title: "Regulation", text: "AI Safety & Governance", color: theme.accent3 },
    { title: "AGI", text: "Towards General Intelligence", color: theme.accent1 },
    { title: "Human-AI", text: "Co-pilot to Auto-pilot", color: theme.accent2 }
];

concepts.forEach((c, i) => {
    let xPos = 1.0 + (i * 3.0);
    // Circle
    slide7.addShape(pres.shapes.OVAL, {
        x: xPos, y: 2.8, w: 2.0, h: 2.0,
        fill: { color: c.color }, line: { width: 0 }
    });
    // Inner Text
    slide7.addText(c.title, {
        x: xPos, y: 3.5, w: 2.0, h: 0.6,
        fontSize: 18, bold: true, color: "1E2761", align: "center"
    });
});

slide7.addText("The future is about AI that understands context and acts autonomously.", {
    x: 0.5, y: 5.0, w: 9, h: 0.5, fontSize: 16, color: theme.text, align: "center", italic: true
});


// 4. Save the Presentation
pres.writeFile({ fileName: "AI_Trends_2026.pptx" })
    .then(fileName => {
        console.log(`Created file: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });
