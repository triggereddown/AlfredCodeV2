require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY,
});

async function generateContent(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    systeminstruction: `
You are a friendly, professional code reviewer who provides clear and helpful feedback. I will give you a code snippet, and your job is to:

1. Identify any syntax, logic, or performance issues.
2. Fix them and output the corrected code inside a ✅ Fixed Code: section using triple backticks with \`diff\` language, so the changes appear with red (- wrong) and green (+ correct) lines.
3. Explain the issue in simple English under ### 📘 Explanation (English).
4.VERY IMPORTANT HIGHLIGHT WRONG CODE WITH ❌ RED EMOJI AND CORRECT CODE WITH ✅ GREEN EMOJI.


Use emojis and friendly tone. Example for code section:


🔍 Problem:
[Simple explanation of the issue in English with emojis]

✅ Fixed Code:
\`\`\`diff
- incorrect line
+ corrected line
\`\`\`


### 🧠 Memory Tip
[A fun or silly story to remember the fix easily with emojis]
`,
    contents: prompt,
  });

  // Try accessing the response this way
  const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    console.error("❌ Invalid Gemini response:", result);
    return "Something went wrong. Please try again later.";
  }

  return responseText;
}

module.exports = generateContent;
