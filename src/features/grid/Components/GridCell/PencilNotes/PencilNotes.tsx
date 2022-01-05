import { useAppSelector } from "../../../../../app/hooks";
import { selectCellPencilNotes } from "../../../State/Selectors/CellSelectors";
import { IdOnlyProps } from "../../../Interface/IdOnlyProps";

export function PencilNotes(props: IdOnlyProps) {
  const pencils: number[] = useAppSelector((state) =>
    selectCellPencilNotes(state, props.id)
  );
  const convertedPencils: string = pencils.join("");
  return (pencils.length === 0) ? null : <text className="cell-pencil-values">{convertedPencils}</text>;
}
