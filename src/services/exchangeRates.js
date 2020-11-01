// API  Site: https://billing.currencyfreaks.com/googleSignIn?googleAuthCode=4/0AfDhmri8DWFy2-oMvw0ql_bRklW6XCi2tfQtWxtGLRMmqDlu9xBTVGv2JU88ozw7Kxk0ZA&source=https://billing.currencyfreaks.com

const URL = 'https://api.currencyfreaks.com/latest?apikey=';
const API_KEY = '9f4f2c8d7bc446ef8a51df98d826b0c9';

export default function fetchExchangeRates() {
  const API = `${URL}${API_KEY}`;
  return fetch(API)
    .then(response => response.json())
    .catch(error => error)
}
