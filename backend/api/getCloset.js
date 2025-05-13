import 'dotenv/config';

const closetPageURL = (id, index) => { return `http://www.stardoll.com/en/com/user/getSuiteFiltered.php?id=${id}&storage&storagePage=${index}` }

async function getCloset(userId) {
  let closetItems = [];
  let closetBrands = [];
  let storageIndex = 1;

  while (true) {
    let response = await fetch(closetPageURL(userId, storageIndex));
    let pageData = await response.json();

    // no more items
    if (pageData.items.item.length === 0) {
      break;
    }

    // add brands to closetBrands
    let pageBrands = pageData.items.item.map(item => item.brandId);
    for (let brandId of pageBrands) {
      if (!closetBrands.includes(brandId)) {
        closetBrands.push(brandId);
      }
    }

    // add items to closetItems
    closetItems = closetItems.concat(pageData.items.item);

    storageIndex++;
  }

  return { closet: closetItems, brands: closetBrands };
}

export default getCloset;
