import { useEffect, useState } from 'react';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';
import ItemImage from './images/itemImagePlaceholder';

const getCurrencyIcon = ({ item }) => {
  return (
    item.currencyType === 1 ? <StardollarIcon /> : <StarcoinIcon />
  );
}

const ItemCard = ({ item, index, itemType, allBrands }) => {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    if (Object.keys(allBrands).length !== 0) {
      setBrandName(allBrands[item.brand] ? allBrands[item.brand].replace(/&amp;/g, "&") : "");
    }
    // eslint-disable-next-line
  }, [allBrands]);

  return (
    <div className="card item-card bg-white !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4 border border-neutral-400 rounded p-4 flex flex-col" data-div-id={index}>
      <ItemImage itemId={item.id} itemType={itemType} />
      <h6 className='mb-0 font-bold text-lg leading-tight'>{item.name}</h6>
      <p className='mb-1'>{brandName}</p>
      <div className='flex flex-row space-x-3'>
        <div className='flex flex-row items-center'>
          <p className='mb-0'>{item.price}</p>
          {getCurrencyIcon({ item })}
        </div>
      </div>
      <div className='flex flex-row items-center'>
      </div>
    </div>
  )
}

export default ItemCard;
