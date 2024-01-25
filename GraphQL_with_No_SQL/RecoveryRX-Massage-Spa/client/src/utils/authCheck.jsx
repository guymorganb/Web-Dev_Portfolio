import decode from 'jwt-decode'

 const authCheck =(data, loading, error)=>{
    if (loading) return;
    const token = localStorage.getItem('id_token');
    const decodedToken = token && decode(token);

    // No token in localStorage or token is expired.
    if (!token || (decodedToken && decodedToken.exp < (Date.now() / 1000))) {
        console.log("If statment")
        return false;
        // window.location.replace('/')
      //   throw render('/')
    }
  //    have a valid token, verify user data.
    if (data && decodedToken) {
        const isAuth = (decodedToken.data._id === data.me._id);
        const isAuth2 = (decodedToken.data.email === data.me.email);
        if (!isAuth || !isAuth2) {
            return false;
        //   window.location.replace('/')
        }else{
            console.log("true")
            return true
        }
    } else if(error) {
        console.error("Error fetching user:", error);
        return false;
    }
}

export default authCheck