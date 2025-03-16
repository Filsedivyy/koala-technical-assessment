import React from 'react';
import HierarchyItemRow from './hierarchy-item-row';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

interface HierarchyItemsTableProps { }

const HierarchyItemsTable: React.FC<HierarchyItemsTableProps> = () => {
    const rows = useSelector((state: RootState) => state.hierarchy.items);

    return (
        <div className="w-full border border-gray-300">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Gender</th>
                        <th className="p-2">Ability</th>
                        <th className="p-2">Minimal Distance</th>
                        <th className="p-2">Weight</th>
                        <th className="p-2">Born</th>
                        <th className="p-2">In Space Since</th>
                        <th className="p-2">Beer Consumption (l/y)</th>
                        <th className="p-2">Knows the Answer?</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length == 0 ? (
                        <tr>
                            <td colSpan={11} className="p-4 text-center text-gray-500">
                                No items available.
                            </td>
                        </tr>
                    ) : (
                        rows.map((character) => (
                            <HierarchyItemRow key={character.data.ID} data={character} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HierarchyItemsTable;
