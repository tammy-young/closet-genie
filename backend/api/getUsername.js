import 'dotenv/config';
import * as cheerio from 'cheerio';

const sellerInfoUrl = (id) => { return `http://www.stardoll.com/en/user/sellItems.php?id=${id}` }

async function getUsername(userId) {
  const response = await fetch(sellerInfoUrl(userId), {
    withCredentials: true,
    headers: {
      Cookie: "pdhUser=" + process.env.PDH_USER + ";"
    }
  });
  const data = await response.text();
  const $ = cheerio.load(data);
  return $('.uname').text().trim();
}

export default getUsername;
