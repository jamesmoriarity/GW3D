import { useAppSelector} from '../../app/hooks';
import { selectLinks } from './navSlice';
import { Logo } from '../nav/Logo';
import { NavLink, NavLinkObj} from './NavLink';

export function Nav() {
  const links: NavLinkObj[] = useAppSelector(selectLinks);
  const linkComps = links.map( function (link: NavLinkObj, index: number) {
    return <NavLink link={link} index={index} key={index}/>
  });

  return(  <div>
              <Logo />
              <div>
                <span>Learn: </span>
                {linkComps}
              </div>
            </div>
  );
}
