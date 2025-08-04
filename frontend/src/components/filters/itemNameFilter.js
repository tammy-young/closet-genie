import Input from '@mui/material/Input';

export default function ItemNameFilter({ itemName, onFilterChange }) {
  return (
    <Input
      type="text"
      placeholder="Search for items..."
      className='!shadow-sm !border !border-gray-300 dark:!bg-gray-900 dark:!text-gray-200 dark:!placeholder-gray-400 !rounded-lg dark:!border-gray-700'
      sx={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: { xs: '100%', sm: 'auto', md: '30%' },
        padding: '0.75rem 1rem',
      }}
      value={itemName}
      onChange={(e) => {
        onFilterChange(e.target.value);
      }} />
  )
}
