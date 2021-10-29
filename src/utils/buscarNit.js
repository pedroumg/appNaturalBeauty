import axios from "axios";


async function findClienteSat(nit) {
    try {
        const {data} = await axios.post('https://asecontables.microsystems.com.gt/api/getnit/index.php?op=search', { 'nit': nit })
        if(data.REQUEST_DATA[0].Respuesta==0 || data.RESPONSE[0].NIT=='CF') return false
        return  formatoNombre(data.RESPONSE[0].NOMBRE)
    } catch (error) {
        return error
    }
}

function formatoNombre(nombre){
    
    let cliente = nombre.split(',,')
    console.log(cliente);

    if(cliente.length>1){
        cliente =  cliente.length>1?cliente[1].replace(',',' ')+' '+cliente[0].replace(',',' ') : cliente[1]
       // cliente = cliente[1].replace(',',' ')+' '+cliente[0].replace(',',' ')
    }else{
        cliente =  nombre.substring(',',' ')
    }
    return cliente
}

export default findClienteSat;