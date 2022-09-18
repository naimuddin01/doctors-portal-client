import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        // console.log('user inside useToken', user)
        const email = user?.user?.email; //double user er karon amader data ta user er vitor user tar vitore email
        const currentUser = {email: email} //sudu matro database e ekta object create kortece
        if(email){
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log('data inside useToken', data);
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
                
            })
        }

    }, [user]);
    return [token];
}

export default useToken;