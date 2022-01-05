export interface ModeSelectorButtonProps{
        mode:string,
        isSelected:boolean,
        clickHandler:Function
}
export const ModeSelectorButton = function(props:ModeSelectorButtonProps){
    const classes:string = (props.isSelected) ? 'selected' : ''
    let onClickHandler = () => props.clickHandler(props.mode)
    return(
        <button className={classes} onClick={onClickHandler}>{props.mode}</button> 
    )     
}