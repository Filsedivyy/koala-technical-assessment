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
        dispatch(removeItem(recordId));

        if (type === "nemesis" && index !== undefined) {
            setChildDeleted((prevState) => {
                const newNemeses = [...prevState.nemeses];
                newNemeses[index] = true;
                return { ...prevState, nemeses: newNemeses };
            });
        } else if (type === "secrete") {
            setChildDeleted((prevState) => {
                const newSecretes = [...prevState.secretes, true];
                return { ...prevState, secretes: newSecretes };
            });
        }
    }

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
    }

    function toggleVisibilityNemesis(index: number) {
        const newVisibility = [...visibility.nemeses];
        const nemesisRecord = data.children?.has_nemesis?.records[index];

        if (nemesisRecord && nemesisRecord.children?.has_secrete) {
            newVisibility[index] = nemesisRecord.children.has_secrete.records.length !== 0 ? !newVisibility[index] : false;
            setVisibility((prevState) => ({
                ...prevState,
                nemeses: newVisibility,
            }));
        }
    }

    const nemesisRecords = useMemo(() => data.children?.has_nemesis?.records || [], [data]);
    return (
        <div className="p-4 border-b">
            <TableRow
                data={data.data}
                onExpand={toggleVisibilityCharacter}
                isExpanded={visibility.character}
                onDelete={() => handleDeleteRecord(data.data.ID, "nemesis")}
            />
            {visibility.character &&
                nemesisRecords.map((nemesisRecord, index) => {
                    return (
                        <div key={nemesisRecord.data.ID} className="ml-6">
                            <TableRow
                                data={nemesisRecord.data}
                                onExpand={() => toggleVisibilityNemesis(index)}
                                isExpanded={visibility.nemeses[index]}
                                onDelete={() => handleDeleteRecord(nemesisRecord.data.ID, "nemesis", index)}
                            />
                            {visibility.nemeses[index] &&
                                nemesisRecord.children?.has_secrete?.records.map((secreteRecord) => (
                                    <div key={secreteRecord.data.ID} className="ml-12">
                                        <TableRow
                                            onDelete={() => handleDeleteRecord(secreteRecord.data.ID, "secrete")}
                                            data={secreteRecord.data}
                                            isExpanded={false}
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









