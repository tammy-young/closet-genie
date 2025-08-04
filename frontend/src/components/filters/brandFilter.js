import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';

export default function BrandFilter({ brand, onFilterChange, brandsToId }) {
  return (
    <Autocomplete
      options={!brandsToId ? [{ name: "Loading...", brandId: 0 }] : brandsToId}
      placeholder='Brand Name'
      className='!shadow-sm !bg-white !border-gray-300 dark:!bg-gray-900 dark:!text-gray-200 dark:!placeholder-gray-400 !rounded-lg dark:!border-gray-700'
      autoHighlight
      getOptionLabel={(option) => option.name || ''}
      value={brand}
      isOptionEqualToValue={(option, value) => option.brandId === value?.brandId}
      slotProps={{
        listbox: {
          sx: (theme) => ({
            zIndex: theme.vars.zIndex.modal,
          }),
          className: 'dark:!bg-gray-800 rounded-xl'
        }
      }}
      onChange={(event, value) => {
        onFilterChange(value);
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px', minHeight: '35px', maxHeight: '100px' }} {...optionProps}
            className='-mt-2 mb-2 aria-selected:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:!bg-gray-600 dark:aria-selected:bg-gray-600 aria-selected:font-bold'>
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {option.name}
            </div>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Brand"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'white',
            },
          }}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }} />
      )}
    />
  )
}
