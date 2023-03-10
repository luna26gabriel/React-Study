import { Link } from 'react-router-dom';

const Navibar = () => {
    return ( 
        <nav className="navbar">
            <h1>Luna Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
}
 
export default Navibar;