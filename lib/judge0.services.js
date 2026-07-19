export const JUDGE0_STATUS = {
    IN_QUEUE: 1,
    PROCESSING: 2,
    ACCEPTED: 3,
    WRONG_ANSWER: 4,
    TIME_LIMIT_EXCEEDED: 5,
    COMPILATION_ERROR: 6,
    RUNTIME_ERROR: 7,
};

export function getJudge0LanguageId(language) {
    const languageMap = {
        CPP: 54,
        JAVA: 62,
        JAVASCRIPT: 63,
        PYTHON: 71
    };

    return languageMap[language.toUpperCase()];
}

export const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


async function judge0Fetch(endpoint, options = {}) {
    const response = await fetch(
        `${process.env.JUDGE0_API_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        }
    );

    if (!response.ok) {
        throw new Error(`Judge0 Error: ${response.status}`);
    }

    return response.json();
}

export async function submitBatch(submissions) {
    return judge0Fetch(
        "/submissions/batch?base64_encoded=false",
        {
            method: "POST",
            body: JSON.stringify({
                submissions,
            }),
        }
    );
}

export async function pollBatchResults(tokens) {
    const MAX_ATTEMPTS = 60;
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
        const data = await judge0Fetch(
            `/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=false`
        );

        const results = data.submissions;

        const allDone = results.every(
            (result) =>
                result.status.id !== JUDGE0_STATUS.IN_QUEUE &&
                result.status.id !== JUDGE0_STATUS.PROCESSING
        );

        if (allDone) {
            return results;
        }

        await sleep(1000);
        attempts++;
    }

    throw new Error("Judge0 polling timeout");
}

export async function validateReferenceSolutions(
    referenceSolution,
    testCases
) {
    for (const [language, code] of Object.entries(referenceSolution)) {

        if (!code?.trim()) continue;

        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const submissions = testCases.map(tc => ({
            source_code: code,
            language_id: languageId,
            stdin: tc.input,
            expected_output: tc.output,
        }));

        const batch = await submitBatch(submissions);

        const tokens = batch.map(item => item.token);

        const results = await pollBatchResults(tokens);

        const failed = results.find(
            result => result.status.id !== 3
        );

        if (failed) {
            throw new Error(
                `${language} reference solution failed validation`
            );
        }
    }

    return true;
}