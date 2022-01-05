import { add, selectLinkByIndex, selectLinksLength} from './navSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export interface NavLinkObj {
  title: string;
  href: string;
}
export interface NavLinkProps {
  index: number;
  link: NavLinkObj;
}

export function NavLink(props: NavLinkProps) {
    const dispatch = useAppDispatch();
    const len = useAppSelector(selectLinksLength);
    const link = useAppSelector((state) => selectLinkByIndex(state, props.index));
    const isLast:boolean = props.index === len - 1
     return <span>
                <a  className="App-link" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.title}
         </a>
         <button onClick={(e)=>{dispatch(add({title:"added linc", href:"cnn.com"}))}}>add Something...</button>
                {(!isLast) ? <span>, </span> : ""}
            </span>
}