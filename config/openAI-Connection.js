const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

module.exports = openai;