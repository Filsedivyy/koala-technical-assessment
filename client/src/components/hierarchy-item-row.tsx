import React, { useState, useEffect } from 'react';
import { CharacterRecord } from '../types';
import { useDispatch } from 'react-redux';
import { removeItem } from '../state/hierarchy-slice';
import TableRow from './table-row';

interface HierarchyItemRowProps {
    data: CharacterRecord;
}

const HierarchyItemRow: React.FC<HierarchyItemRowProps> = ({ data }) => {
    const [isVisibleCharacter, setIsVisibleCharacter] = useState(false);
    const [isVisibleNemesis, setIsVisibleNemesis] = useState<boolean[]>([]);
    const dispatch = useDispatch();

    function toggleVisibilityCharacter() {
        if (data.children?.has_nemesis) {
            setIsVisibleCharacter(!isVisibleCharacter);
            if (isVisibleCharacter) {
                setIsVisibleNemesis([]);
            }
        }
    }

    function toggleVisibilityNemesis(index: number) {
        const newVisibility = [...isVisibleNemesis];
        const nemesisRecord = data.children?.has_nemesis?.records[index];

        if (nemesisRecord && nemesisRecord.children?.has_secrete) {
            if (nemesisRecord.children.has_secrete.records.length === 0) {
                newVisibility[index] = false;
            } else {
                newVisibility[index] = !newVisibility[index];
            }
            setIsVisibleNemesis(newVisibility);
        }
    }

    const handleDelete = (rowId: string) => {
        dispatch(removeItem(rowId));
    };

    return (
        <div className="p-4 border-b">
            {/* Main Row */}
            <TableRow

                data={data.data}
                onExpand={toggleVisibilityCharacter}
                isExpanded={isVisibleCharacter}
                onDelete={() => handleDelete(data.data.ID)}
            />
            {/* NEMESIS DATA */}
            {isVisibleCharacter && data.children?.has_nemesis?.records.map((nemesisRecord, index) => (
                <div key={nemesisRecord.data.ID} className="ml-6">
                    <TableRow
                        data={nemesisRecord.data}
                        onExpand={() => toggleVisibilityNemesis(index)}
                        isExpanded={isVisibleNemesis[index]}
                        onDelete={() => handleDelete(nemesisRecord.data.ID)}
                    />
                    {/* SECRETE DATA */}
                    {isVisibleNemesis[index] && nemesisRecord.children?.has_secrete?.records.map((secreteRecord) => (
                        <div key={secreteRecord.data.ID} className="ml-12">
                            <TableRow
                                onDelete={() => handleDelete(secreteRecord.data.ID)}
                                data={secreteRecord.data}
                                isExpanded={false}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HierarchyItemRow;










