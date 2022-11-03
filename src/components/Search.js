import { Input } from 'antd';


function Search({callbackToSearch}) {

   return (
    <div className='search-bar'>
      <label>Search for Patients:</label>
      <Input 
        placeholder="Filter by the last name ..."
        type="text" 
        onChange={(e) => { 
            callbackToSearch(e.target.value);
        }}
      />
      </div>
  );
}

export default Search;
