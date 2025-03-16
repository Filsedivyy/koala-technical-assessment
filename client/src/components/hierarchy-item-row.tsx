import React, { useState, useMemo } from "react";
import { CharacterRecord } from "../types";
import { useDispatch } from "react-redux";
import { removeItem } from "../state/hierarchy-slice";
import TableRow from "./table-row";

interface HierarchyItemRowProps {
    data: CharacterRecord;
}

const HierarchyItemRow: React.FC<HierarchyItemRowProps> = ({ data }) => {
    const [visibility, setVisibility] = useState({
        character: false,
        nemeses: [] as boolean[],
    });
    const [childDeleted, setChildDeleted] = useState({
        nemeses: [] as boolean[],
        secretes: [] as boolean[],
    });
    const dispatch = useDispatch();

    function handleDeleteRecord(recordId: string, type: "nemesis" | "secrete", index?: number) {
        dispatch(removeItem(recordId)); // UPDATE data via REDUX

        if (type == "nemesis" && index != undefined) {
            // COPIES previous state of nemeses and marks the specific nemesis as deleted
            setChildDeleted((prevState) => {
                const newNemeses = [...prevState.nemeses];
                newNemeses[index] = true;
                return { ...prevState, nemeses: newNemeses };
            });
        }
        else if (type == "secrete") {
            setChildDeleted((prevState) => {
                // COPIES previous state of secretes and adds a new deleted secrete
                const newSecretes = [...prevState.secretes];
                newSecretes.push(true);
                return { ...prevState, secretes: newSecretes };
            });
        }
    };

    function toggleVisibilityCharacter() {
        if (data.children?.has_nemesis) {
            const allNemesesDeleted = data.children.has_nemesis.records.every((_, index) => childDeleted.nemeses[index]);
            if (!allNemesesDeleted) {
                setVisibility((prevState) => ({
                    ...prevState,
                    character: !prevState.character,
                    nemeses: prevState.character ? [] : prevState.nemeses,
                }));
            }
        }
    };

    function toggleVisibilityNemesis(index: number) {
        const newVisibility = [...visibility.nemeses];
        const nemesisRecord = data.children?.has_nemesis?.records[index];

        if (nemesisRecord && nemesisRecord.children?.has_secrete) {
            if (nemesisRecord.children.has_secrete.records.length === 0) {
                newVisibility[index] = false;
            } else {
                newVisibility[index] = !newVisibility[index];
            }
            setVisibility((prevState) => ({
                ...prevState,
                nemeses: newVisibility,
            }));
        }
    };

    const nemesisRecords = useMemo(() => data.children?.has_nemesis?.records || [], [data]);

    const allChildrenDeleted = nemesisRecords.every((_, index) => childDeleted.nemeses[index]);

    function isNemesisDeleted(index: number) {
        const nemesisRecord = data.children?.has_nemesis?.records[index];
        if (nemesisRecord && nemesisRecord.children?.has_secrete) {
            return nemesisRecord.children.has_secrete.records.every((_, secretIndex) => childDeleted.secretes[secretIndex]);
        }
        return false;
    };

    return (
        <div className="p-4 border-b">
            {/*CHARACTER ROW */}
            <TableRow
                data={data.data}
                onExpand={toggleVisibilityCharacter}
                isExpanded={visibility.character}
                onDelete={() => handleDeleteRecord(data.data.ID, "nemesis")}
                disabled={allChildrenDeleted}
            />
            {visibility.character &&
                nemesisRecords.map((nemesisRecord, index) => {
                    const allSecretesDeleted = isNemesisDeleted(index);
                    return (
                        <div key={nemesisRecord.data.ID} className="ml-6">
                            {/*NEMESIS ROWS */}
                            <TableRow
                                data={nemesisRecord.data}
                                onExpand={() => toggleVisibilityNemesis(index)}
                                isExpanded={visibility.nemeses[index]}
                                onDelete={() => handleDeleteRecord(nemesisRecord.data.ID, "nemesis", index)}
                                disabled={childDeleted.nemeses[index] || allSecretesDeleted}
                            />
                            {visibility.nemeses[index] &&
                                nemesisRecord.children?.has_secrete?.records.map((secreteRecord, secretIndex) => (
                                    <div key={secreteRecord.data.ID} className="ml-12">
                                        {/*SECRETE ROWS */}
                                        <TableRow
                                            onDelete={() => handleDeleteRecord(secreteRecord.data.ID, "secrete")}
                                            data={secreteRecord.data}
                                            isExpanded={false}
                                            disabled={childDeleted.secretes[secretIndex]}
                                        />
                                    </div>
                                ))}
                        </div>
                    );
                })}
        </div>
    );
};

export default HierarchyItemRow;










