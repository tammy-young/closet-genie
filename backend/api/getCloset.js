import 'dotenv/config';

const closetPageURL = (id, index) => { return `http://www.stardoll.com/en/com/user/getSuiteFiltered.php?id=${id}&storage&storagePage=${index}` }

async function getCloset(userId) {
  let closetItems = [];
  let storageIndex = 1;

  while (true) {
    let response = await fetch(closetPageURL(userId, storageIndex));
    let pageData = await response.json();

    // no more items
    if (pageData.items.item.length === 0) {
      break;
    }

    // add items to closetItems
    closetItems = closetItems.concat(pageData.items.item);

    storageIndex++;
  }

  return { closet: closetItems };
}

export default getCloset;
