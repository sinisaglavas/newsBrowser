
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
//
// const params = {
//     'api-key': API_KEY,
//     q: query || '',
//     section: section || '',
//     'from-date': fromDate || '',
//     'to-date': toDate || '',
//     'order-by': orderBy || 'newest',
// };

export async function getArticles({query, section}) {
   try {
       return await axios.get(API_URL, {
           params: {
               'api-key': API_KEY,
               q: query || '',
               section: section || '',
               'show-fields': 'thumbnail,trailText,byline'
           },
       })
   } catch (exception) {
       return alert('Something went wrong with fetching search data! Please try again later.')
   }
}