import './nav.css'

function Nav() {
    
    return (
       <nav className="nav-bar">
        <ul className="nav">
        <li><a href="#">HOME</a></li>
        <li><a href="#">SELECT MODEL</a></li>
        <li><a href="#">SHOP</a></li>
        <li><a href="#">CONTACT</a></li>
        <li><a href="#">ABOUT</a></li>
      </ul>

      <div class="btn-nav">
        <button type="button" className="login">Login</button>
        <button type="button" className="Sign-up">Sign-up</button>
      </div>
      </nav>
    )
}



export default Nav;


