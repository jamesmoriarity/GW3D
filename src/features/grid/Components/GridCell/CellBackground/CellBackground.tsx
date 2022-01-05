import { useAppSelector } from "../../../../../app/hooks";
import { selectCellBackgroundClass, selectIsCellValid } from "../../../State/Selectors/CellSelectors";

export const baseClassName:string = "cell-background";
export const tagName:string = "rect"
export interface CellBackgroundProps{
  id:number,
  isOriginal:boolean
}
export const getClassNames = function(props:CellBackgroundProps, bgClassName:string, isValid:boolean){
  let classes:string[] = [baseClassName]
  if(bgClassName !== '') classes.push(bgClassName)
  if(bgClassName === '' && props.isOriginal) classes.push('original') // if autoColor
  if(!isValid){ classes.push('invalid')} 
  const classNames: string = classes.join(' ');
  return classNames
}
export function CellBackground(props: CellBackgroundProps) {
  let bgClassName: string = useAppSelector((state:any) => selectCellBackgroundClass(state, props.id))
  let isValid:boolean = useAppSelector((state:any) =>selectIsCellValid(state, props.id))
  let cName:string = getClassNames(props, bgClassName, isValid)
  if(cName === baseClassName) return null
  return <rect className={cName}></rect>
}