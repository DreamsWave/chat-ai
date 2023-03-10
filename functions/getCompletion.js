const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

module.exports.handler = async function (event, context) {
	let data;
	try {
		data = event.queryStringParameters;
		// data = JSON.parse(event.body);
	} catch (error) {
		console.log(error);
		return {
			statusCode: 400,
			body: { error: "prompt property not found" },
		};
	}

	try {
		if (data.prompt) {
			const configuration = new Configuration({
				apiKey: process.env.OPENAI_API_KEY,
			});
			const openai = new OpenAIApi(configuration);
			const completion = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: data.prompt,
				temperature: 0,
				max_tokens: 3000,
				top_p: 1,
				frequency_penalty: 0.5,
				presence_penalty: 0,
			});
			console.log(JSON.stringify(completion.data));
			return {
				statusCode: 200,
				body: { result: completion.data.choices[0].text.trim() },
			};
		}
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: { error: JSON.stringify(error) },
		};
	}
};
