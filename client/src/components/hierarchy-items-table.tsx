import HierarchyItemRow from "./hierarchy-item-row";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Character } from "../types";



const HierarchyItemsTable = () => {
    const rows = useSelector((state: RootState) => state.hierarchy.items);
    const headers: (keyof Character)[] = [
        "ID", "Name", "Gender", "Ability", "Minimal distance", "Weight", "Born", "In space since", "Beer consumption (l/y)", "Knows the answer?"
    ];

    const TableHeader = (label: string) => {
        return (
            <th scope="col" className="px-4 py-2" key={label}>{label}</th>
        );
    }

    return (
        <div className="w-full overflow-x-auto shadow-lg border border-gray-300 rounded-lg">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        {headers.map(header => TableHeader(header))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length == 0 ? (
                        <tr>
                            <td colSpan={11} className="px-4 py-2 text-center text-gray-500">
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
