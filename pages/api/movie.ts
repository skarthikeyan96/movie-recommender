// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log("calling the api")
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
  })

  const {genre, rating} = req.query

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Suggest me 5 ${genre} movies with IMDB rating more than ${rating} and also throw in some description about the movie. Please don't repeat the movies`,
    temperature: 0.7,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const movieResults = response.data.choices[0].text?.split("\n").filter((movie) => movie.length >1)


  res.status(200).json({ movies: movieResults})
}
