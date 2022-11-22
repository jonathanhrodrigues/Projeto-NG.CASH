import { format } from 'date-fns';
import './footer.css';
import logo from '../../_assets/logo-ngcash-branco.88c5860.svg';


export function Footer () {
    return (
        <div className='Footer__container'>
            <img  className='Footer__logo' src={logo} alt="NG.cash-logo" />
            <p>{format(new Date(), 'yyyy')} - Todos os direitos reservados</p>
            
        </div>

    );

};