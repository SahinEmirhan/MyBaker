import axios from 'axios';

export default defineNuxtRouteMiddleware(async (to , from)=>{
        try{

                if(process.server) return

                
                const person = await axios.get('http://localhost:3000/users/' , { withCredentials : true });
                const token = useCookie('token')
                if(person.data.success)
                {
                        return ;
                }else {
                        return navigateTo("/login")
                }
                
                

        } catch(err)
        {
            console.log('err :>> ', err);
                return navigateTo("/login")
        }
})