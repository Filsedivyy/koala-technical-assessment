import React, { useState, useMemo } from 'react';
import { CharacterRecord } from '../types';
import { useDispatch } from 'react-redux';
import { removeItem } from '../state/hierarchy-slice';
import TableRow from './table-row';

interface HierarchyItemRowProps {
    data: CharacterRecord;
}

const HierarchyItemRow: React.FC<HierarchyItemRowProps> = ({ data }) => {
    const [visibility, setVisibility] = useState({
        character: false,
        nemeses: [] as boolean[],
    });

    const dispatch = useDispatch();

    const handleDeleteRecord = (recordId: string) => () => {
        dispatch(removeItem(recordId));
    };

    const toggleVisibilityCharacter = () => {
        if (data.children?.has_nemesis) {
            setVisibility(prevState => ({
                ...prevState,
                character: !prevState.character,
                nemeses: prevState.character ? [] : prevState.nemeses,
            }));
        }
    };

    const toggleVisibilityNemesis = (index: number) => {
        const newVisibility = [...visibility.nemeses];
        const nemesisRecord = data.children?.has_nemesis?.records[index];

        if (nemesisRecord && nemesisRecord.children?.has_secrete) {
            if (nemesisRecord.children.has_secrete.records.length === 0) {
                newVisibility[index] = false;
            } else {
                newVisibility[index] = !newVisibility[index];
            }
            setVisibility(prevState => ({
                ...prevState,
                nemeses: newVisibility
            }));
        }
    };

    const nemesisRecords = useMemo(() => data.children?.has_nemesis?.records || [], [data]);
    return (
        <div className="p-4 border-b">
            <TableRow
                data={data.data}
                onExpand={toggleVisibilityCharacter}
                isExpanded={visibility.character}
                onDelete={handleDeleteRecord(data.data.ID)}
            />
            {visibility.character && nemesisRecords.map((nemesisRecord, index) => (
                <div key={nemesisRecord.data.ID} className="ml-6">
                    <TableRow
                        data={nemesisRecord.data}
                        onExpand={() => toggleVisibilityNemesis(index)}
                        isExpanded={visibility.nemeses[index]}
                        onDelete={handleDeleteRecord(nemesisRecord.data.ID)}
                    />
                    {visibility.nemeses[index] && nemesisRecord.children?.has_secrete?.records.map((secreteRecord) => (
                        <div key={secreteRecord.data.ID} className="ml-12">
                            <TableRow
                                onDelete={handleDeleteRecord(secreteRecord.data.ID)}
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










