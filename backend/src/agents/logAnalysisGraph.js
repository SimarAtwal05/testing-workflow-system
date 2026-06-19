const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const models_to_try = [
  "gemini-2.0-flash",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

const getModel = (modelName) =>
  new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.2,
  });

const buildPrompt = (logs) => `
You are a DevOps log analysis engine.

Return ONLY valid JSON:
{
  "issue": "",
  "severity": "low|medium|high|critical",
  "root_cause": "",
  "fix_suggestion": "",
  "code_patch": "",
  "confidence": 0-100
}

LOGS:
${JSON.stringify(logs, null, 2)}
`;

const analyzeLogs = async (logs) => {
  let lastError = null;

  for (const modelName of models_to_try) {
    try {
      const model = getModel(modelName);

      const res = await model.invoke(buildPrompt(logs));
      const text = res.content;

      // extract JSON safely
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");

      if (start === -1 || end === -1) continue;

      const parsed = JSON.parse(text.slice(start, end + 1));

      return {
        ...parsed,
        model_used: modelName,
      };
    } catch (err) {
      console.log(`❌ Model failed: ${modelName} ->`, err.message);
      lastError = err;
      continue;
    }
  }

  throw new Error("All models failed: " + lastError?.message);
};

module.exports = { analyzeLogs };