import React from 'react';
import { CharacterData } from '../types';
import HierarchyItemRow from './hierarchy-item-row';

interface HierarchyItemsTableProps {
    data: CharacterData;
    onDelete: (id: string) => void;
}

const HierarchyItemsTable: React.FC<HierarchyItemsTableProps> = ({ data, onDelete }) => {
    return (
        <div className="w-full border border-gray-300">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Expand</th>
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
                    {data.map((character) => (
                        <HierarchyItemRow key={character.data.ID} data={character} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HierarchyItemsTable;