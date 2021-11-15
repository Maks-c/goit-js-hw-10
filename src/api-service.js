const URL = 'https://restcountries.com/v3.1/';

function fetchCountry(name) {
  const url = `${URL}/name/${name}?fields=name,capital,population,flags,languages`
  return fetch(url)
    .then(response =>{
    if (!response.ok){

      throw new Error(response.status)
    }
    return response.json()
  }
)}

export default fetchCountry