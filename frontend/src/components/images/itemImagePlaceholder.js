
const ItemImage = ({ itemId, itemType }) => {
  return (
    <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl flex justify-center items-center overflow-hidden group-hover:from-purple-50 group-hover:to-pink-50 dark:group-hover:from-purple-900/20 dark:group-hover:to-pink-900/20 transition-all duration-300">
      {/* eslint-disable-next-line */}
      <img 
        src={`http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`} 
        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
        alt="Fashion item"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="hidden w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">👕</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Image not found</p>
        </div>
      </div>
    </div>
  )
}

export default ItemImage;
