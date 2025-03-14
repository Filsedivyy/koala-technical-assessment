import HierarchyItem from "./components/hierarchy-item-row";
import HierarchyItemsTable from "./components/hierarchy-items-table";
import { CharacterRecord } from "./types";

import data from './data.json';


const App = () => {



  return (
    <div className="px-6">
      <HierarchyItemsTable data={data} onDelete={() => { }} />
    </div>
  )
};

export default App;
