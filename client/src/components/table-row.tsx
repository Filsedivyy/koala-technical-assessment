import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonStyle } from './button';

interface TableRowProps {
    data: Record<string, any>;
    onDelete: () => void;
    onExpand?: () => void;
    isExpanded: boolean;
}

const TableRow: FC<TableRowProps> = ({ data, onDelete, onExpand, isExpanded }) => {
    return (
        <div className="p-4 border-b">
            <table className="w-full border border-gray-300">
                <tbody>
                    <tr>
                        {/* Expand Button */}
                        {onExpand && (
                            <td className="p-4">
                                <Button style={ButtonStyle.BLUE} onClick={onExpand}>
                                    {isExpanded ? (
                                        <FontAwesomeIcon icon={faChevronUp} className="size-[20px]" />
                                    ) : (
                                        <FontAwesomeIcon icon={faChevronDown} className="size-[20px]" />
                                    )}
                                </Button>
                            </td>
                        )}
                        {/* Data Cells */}
                        {Object.values(data).map((value, index) => (
                            <td key={index} className="p-[4px]">{value}</td>
                        ))}
                        {/* Delete Button */}
                        <td className="p-[4px]">
                            <Button onClick={onDelete} style={ButtonStyle.RED}>
                                <FontAwesomeIcon icon={faTrashAlt} className="size-[16px]" />
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableRow;
