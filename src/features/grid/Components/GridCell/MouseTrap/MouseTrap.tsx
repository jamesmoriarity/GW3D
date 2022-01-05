import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { handleSelectCell } from "../../../gridSlice";
import { IdOnlyProps } from "../../../Interface/IdOnlyProps";
import { MouseEventHandler } from "react";
import { selectIsSelected } from "../../../State/Selectors/CellSelectors";

const getClassNames = function(isSelected:boolean){
  const classNames:string[] = ['mouse-trap'] 
  if (isSelected) classNames.push('selected')
  return classNames.join(' ')
}

export function MouseTrap(props: IdOnlyProps) {
  const isSelected: boolean = useAppSelector((state) => selectIsSelected(state, props.id));
  const classNames: string = getClassNames(isSelected)
  const dispatch = useAppDispatch();
  const clickHandler:MouseEventHandler<SVGRectElement> = (e:React.MouseEvent) => { 
    dispatch(handleSelectCell({ index: props.id, meta: e.metaKey })) 
  }
  return (
    <rect role="button" className={classNames} onClick={clickHandler}/>
  );
}
