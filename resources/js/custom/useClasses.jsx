import axios from "axios";

const useClasses = async () => {
    try{
        const response = await axios.get('/api/Classe')
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export default useClasses;