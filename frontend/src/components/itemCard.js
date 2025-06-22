import { useEffect, useState } from 'react';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';
import ItemImage from './images/itemImagePlaceholder';

const getCurrencyIcon = ({ item }) => {
  return (
    item.currencyType === 1 ? <StardollarIcon /> : <StarcoinIcon />
  );
}

const ItemCard = ({ item, index, itemType, allBrands, showPrices }) => {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    if (Object.keys(allBrands).length !== 0) {
      setBrandName(allBrands[item.brandId] ? allBrands[item.brandId].replace(/&amp;/g, "&") : "");
    }
    // eslint-disable-next-line
  }, [item]);

  return (
    <div className="card item-card bg-white dark:bg-neutral-800 dark:border-0 !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4 border border-neutral-300 rounded p-4 flex flex-col" data-div-id={index}>
      <ItemImage itemId={item.id} itemType={itemType} />
      <h6 className='mb-0 font-bold text-lg leading-tight dark:text-white'>{item.name}</h6>
      <p className='mb-1 dark:text-white'>{brandName}</p>
      {
        showPrices ? (
          <div className='flex flex-row items-center'>
            <p className='mb-0 dark:text-white'>{item.price}</p>
            {getCurrencyIcon({ item })}
          </div>
        ) : null
      }
    </div>
  )
}

export default ItemCard;
