
const ItemImage = ({ itemId, itemType }) => {
  return (
    <div className="flex justify-center pb-3">
      <div className="bg-neutral-100 p-4 w-full sm:h-44 h-56 lg:h-56 rounded flex justify-center items-center">
        {/* eslint-disable-next-line */}
        <img src={`http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`} className="h-full" alt="Image not found"></img>
      </div>
    </div>
  )
}

export default ItemImage;
