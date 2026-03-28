
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export async function getArticles(query, section, fromDate, toDate, orderBy) {
   try {
       const params = {
           'api-key': API_KEY,
           'show-fields': 'thumbnail,trailText,byline'
       };

       if (query) params.q = query;
       if (section) params.section = section;
       if (fromDate) params['from-date'] = fromDate;
       if (toDate) params['to-date'] = toDate;
       if (orderBy) {
           if (orderBy === 'relevance' && !query) {
               params['order-by'] = 'newest';
           } else {
               params['order-by'] = orderBy;
           }
       }

       return await axios.get(API_URL, { params })
   } catch (exception) {
       return alert('Something went wrong with fetching search data! Please try again later.')
   }
}