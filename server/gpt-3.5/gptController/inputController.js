const { openai } = require('../openAi.js');

exports.handleInput = async function (req, res) {
  const input = req.body.input;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
    max_tokens: 150,
    temperature: 0.9,
    stop: ['\n', 'Board:', ' AI Assistant:' , 'Question by student:'],
  });

  let output = response.data.choices[0].message.content;

  // const stopSequences = ['AI Assistant:', 'Board:', 'Question by student:'];

  // const stopIndex = stopSequences.reduce(
  //   (minIndex, sequence) => {
  //     const index = output.indexOf(sequence);
  //     return index >= 0 && (index < minIndex || minIndex === -1) ? index : minIndex;
  //   },
  //   -1
  // );

  // if (stopIndex !== -1) {
  //   output = output.slice(0, stopIndex).trim();
  // }

  res.json({ output });
};
