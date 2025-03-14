import React, { useState } from 'react';
import { CharacterRecord } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonStyle } from './button';

interface HierarchyItemRowProps {
    data: CharacterRecord;
    onDelete: (id: string) => void;
}


const HierarchyItemRow: React.FC<HierarchyItemRowProps> = ({ data, onDelete }) => {
    const [isVisibleCharacter, setIsVisibleCharacter] = useState(false);
    const [isVisibleNemesis, setIsVisibleNemesis] = useState<boolean[]>([]);

    // Function to toggle the visibility of the main row
    function toggleVisibilityCharacter() {
        setIsVisibleCharacter(!isVisibleCharacter);
        if (isVisibleCharacter) {
            setIsVisibleNemesis([]); // Close all nemesis rows when character is hidden
        }
    }

    // Function to toggle the visibility of nemesis rows
    function toggleVisibilityNemesis(index: number) {
        const newVisibility = [...isVisibleNemesis];
        newVisibility[index] = !newVisibility[index];
        setIsVisibleNemesis(newVisibility);
    }


    return (
        <div className="p-4 border-b">
            <table className="w-full border border-gray-300">
                <tbody>
                    <tr>
                        <td className="p-4">
                            <Button
                                style={ButtonStyle.BLUE}
                                onClick={toggleVisibilityCharacter}
                                disabled={data.children.has_nemesis ? false : true} // Cannot expand if no character data
                            >
                                {isVisibleCharacter ? (
                                    <FontAwesomeIcon icon={faChevronUp} className="h-5 w-5" />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5" />
                                )}
                            </Button>
                        </td>
                        {Object.values(data.data).map((value, index) => (
                            <td key={index} className="p-2">{value}</td>
                        ))}
                        <td className="p-4">
                            <Button onClick={() => onDelete(data.data.ID)} style={ButtonStyle.RED}>
                                <FontAwesomeIcon icon={faTrashAlt} className="size-[16px]" />
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {isVisibleCharacter && data.children?.has_nemesis?.records.map((nemesisRecord, index) => (
                <div key={nemesisRecord.data.ID} className="ml-6">
                    <table className="w-full border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="p-4">
                                    <Button
                                        style={ButtonStyle.BLUE}
                                        onClick={() => toggleVisibilityNemesis(index)}
                                        disabled={nemesisRecord.children.has_secrete ? false : true}// Cannot expand if no nemesis data
                                    >
                                        {isVisibleNemesis[index] ? (
                                            <FontAwesomeIcon icon={faChevronUp} className="h-5 w-5" />
                                        ) : (
                                            <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5" />
                                        )}
                                    </Button>
                                </td>
                                {Object.values(nemesisRecord.data).map((value, index) => (
                                    <td key={index} className="p-2">{value}</td>
                                ))}
                                <td className="p-4">
                                    <Button onClick={() => onDelete(nemesisRecord.data.ID)} style={ButtonStyle.RED}>
                                        <FontAwesomeIcon icon={faTrashAlt} className="size-[16px]" />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {isVisibleNemesis[index] && nemesisRecord.children?.has_secrete?.records.map((secreteRecord) => (
                        <div key={secreteRecord.data.ID} className="ml-12">
                            <table className="w-full border border-gray-300">
                                <tbody>
                                    <tr>
                                        <td className="p-4"></td>
                                        {Object.values(secreteRecord.data).map((value, index) => (
                                            <td key={index} className="p-2">{value}</td>
                                        ))}
                                        <td className="p-4">
                                            <Button onClick={() => onDelete(secreteRecord.data.ID)} style={ButtonStyle.RED}>
                                                <FontAwesomeIcon icon={faTrashAlt} className="size-[16px]" />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HierarchyItemRow;






