import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { UserContext } from "./userContext";
import { PiGithubLogoFill } from "react-icons/pi";
import { RiLoginCircleFill } from "react-icons/ri";


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext); 
  const navigate = useNavigate(); 

  
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include', 
    })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo); 
      });
  }, [setUserInfo]);

 
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include', 
      method: 'POST', 
    })
      .then(() => {
        setUserInfo(null); 
        navigate('/login'); 
      });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo" >
      <PiGithubLogoFill className="bolg-logo"  />         
       Pvp Blog</Link> 
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link> 
            <a onClick={logout} style={{ cursor: 'pointer' }}><strong>Logout</strong></a> 
          </>
        ) : (
          <>
            <Link to="/login"><strong>
            Login</strong></Link> 
            <Link to="/register"><strong>Register</strong></Link> 
          </>
        )}
      </nav>
    </header>
  );
}

