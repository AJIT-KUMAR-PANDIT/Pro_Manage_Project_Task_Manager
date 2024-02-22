import React,{useEffect} from 'react'
import pageNotFound from '../../../Assets/404.gif';
import notLoading from '../../../Assets/Loading-bar.gif'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
          navigate('/');
        }, 5000); 
    
        return () => clearTimeout(redirectTimer);
      }, []); 
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', width: '100vw', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', width: '60vw', height: '60vh' }}>
                <img src={pageNotFound} alt='pageNotFound' style={{ width: '70%' }} />
                <br />
                <span style={{ textAlign: 'center' }}>Page Not Found
                    <br />
                    Redirecting You To SignUp</span>
                <br />
                <img src={notLoading} alt='notLoading' />
            </div>
        </div>
        </>
    )
}

export default NotFound;