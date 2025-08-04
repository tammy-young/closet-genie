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
    <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300" data-div-id={index}>
      <div className="relative overflow-hidden rounded-xl mb-4">
        <ItemImage itemId={item.id} itemType={itemType} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex-grow justify-between flex flex-col">
        <h6 className='mb-2 font-bold text-lg leading-tight text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300'>{item.name}</h6>
        <p className='mb-3 text-gray-600 dark:text-gray-300 font-medium'>{brandName}</p>
        {
          showPrices ? (
            <div className='flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-2'>
              <div className='flex items-center space-x-1'>
                <p className='mb-0 font-semibold text-gray-800 dark:text-gray-200'>{item.price}</p>
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {getCurrencyIcon({ item })}
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default ItemCard;
