import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ItemTypeFilter({ itemType, onFilterChange, itemTypeOptions }) {
  return (
    <Autocomplete
      options={itemTypeOptions}
      placeholder='Item Type'
      className='!bg-white !border !border-gray-300 !shadow-sm dark:!bg-gray-900 dark:!text-gray-300 dark:!placeholder-gray-400 !rounded-lg dark:!border-gray-700'
      autoHighlight
      getOptionLabel={(option) => option.name || ''}
      value={itemType}
      isOptionEqualToValue={(option, value) => option.value === value.value}
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
            className='-mt-2 mb-2 dark:bg-gray-800 aria-selected:bg-gray-200 dark:text-gray-400 dark:hover:!bg-gray-600 dark:aria-selected:bg-gray-600 aria-selected:font-bold'>
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {option.name}
            </div>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Item Type"
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
