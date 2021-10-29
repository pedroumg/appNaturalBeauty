export default{
    state:{       
        /*establecimiento:{
            nombrecomercial:'PERFECT CAR IMPORTS',
            propietario:'PERFECT CAR IMPORTS Y COPROPIEDAD',
            nit:'106357441',
            direccion:'6A. CALLE 1-30 Zona 2, BARRIO LA ESPERANZA , Jalapa',
            codigopostal:'2101',
            municipio:'JALAPA',
            departamento:'JALAPA',
            codregimen:'GEN'
        }*/
        establecimiento:{
            nombrecomercial:'PEST.CONTROL',
            propietario:'Allan Bonilla',
            nit:'44653948',
            direccion:'6A. CALLE 1-30 Zona 2, BARRIO LA ESPERANZA , Jalapa',
            codigopostal:'0101',
            municipio:'GUATEMALA',
            departamento:'GUATEMALA',
            codregimen:'GEN'
        }
        
    },
    getters:{
        getEstablecimiento(state){
            return state.establecimiento
        }
    }
}