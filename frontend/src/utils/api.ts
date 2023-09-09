// utils/api.js
import axios from 'axios'

const API_KEY = '7758aafc-9609-421d-a972-5da6e0681e0b'

export const fetchWordDefinition = async (word: string) => {
  const response = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`,
  )
  return response.data
}
