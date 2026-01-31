import { Container, LogoutBtn, Logo, DropDownBtn, SearchBtn } from '../index';
import { Link } from 'react-router-dom';
import './Header.css';

function Header1() {

    return (
        <header className="bg-gray-50 text-black py-2 shadow">
            <Container>
                <nav className="flex  items-center">
                    <div className="mr-2">
                        <Link to="/">
                            <Logo width="120px" />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                        <SearchBtn />   
                    </div>
                    <div className="relative flex items-center">
                        <DropDownBtn />
                    </div>
                    
                </nav>
            </Container>
            
        </header>
    );
}

export default Header1;