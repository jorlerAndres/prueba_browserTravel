let selectCiudades=document.getElementById('ciudades');
let boxCiudad=document.getElementById('box-ciudad');
let boxCoordenadas=document.getElementById('box-coordenadas');
if(selectCiudades){
    selectCiudades.addEventListener('change',setDataCiudad)
}

document.addEventListener("DOMContentLoaded",function(){
  getCiudades();
  
})

async function getCiudades(){
    
  let url = "Controlador/dataControlador.php";
  
  let response = await fetch(url, {
    method: "GET",
    
  })
  console.log(response);
   if (response.ok) { 
    let json = await response.json();
    
    setCiudadesSelect(json);
  } else {
    alert("Error-HTTP: " + response.status);
  } 
}

function setCiudadesSelect(json){

  let select=document.getElementById('ciudades')
  //@se limita el for a 50 para temas de rapidez en las pruebas
   for (let index = 0; index < 50; index++) {

   
    const select_option = document.createElement("option");
    select_option.value = json[index].name;
    select_option.innerHTML =json[index].name;
    select.appendChild(select_option);
   
  } 

}


async function getData(e){
    
  let url = "Controlador/dataControlador.php?ciudad="+e.target.value;
  
  let response = await fetch(url, {
    method: "GET",
    
  })
  if (response.ok) { 
    let json = await response.json();
    return json;
  } else {
    alert("Error-HTTP: " + response.status);
  }
}

async function setDataCiudad(e){ 

  
  boxCiudad.classList.remove('movement_from_back')
  setTimeout(function(){boxCiudad.classList.add('movement_from_back');}, 100);
  const datos = await getData(e);
  arrayDatos = JSON.parse(datos)
  setTimeout(function(){

    document.getElementById('latitud_ciudad').innerHTML=arrayDatos.coord.lat
    document.getElementById('longitud_ciudad').innerHTML=arrayDatos.coord.lon
    document.getElementById('viento_velocidad').innerHTML=arrayDatos.wind.speed
    document.getElementById('id').innerHTML=arrayDatos.id
    document.getElementById('temperatura_general').innerHTML=arrayDatos.main.temp+'°'
    document.getElementById('temp_minima').innerHTML=arrayDatos.main.temp_min+'°'
    document.getElementById('temp_maxima').innerHTML=arrayDatos.main.temp_max+'°'
    document.getElementById('humedad_ciudad').innerHTML=arrayDatos.main.humidity
    document.getElementById('presion_ciudad').innerHTML=arrayDatos.main.pressure 
    document.getElementById('timezone').innerHTML=arrayDatos.timezone

  }, 100);
  

}

const formCoordenadas = document.getElementById("formCoordenadas");
if (formCoordenadas) {
  formCoordenadas.addEventListener("submit", setDataCoordenadas);
}

async function getDataCoordenadas(e){
  e.preventDefault();
  let url = "Controlador/dataControlador.php";

  if (formCoordenadas.checkValidity()) {
    let coordenadas = new FormData(formCoordenadas);
    let response = await fetch(url, {
      method: "POST",
      body: coordenadas,
      
    })
    if (response.ok) { 
      let json = await response.json();
      return json;
    } else {
      alert("Error-HTTP: " + response.status);
    }
  }
}

async function setDataCoordenadas(e){ 

 
  boxCoordenadas.classList.remove('movement_from_back')
  setTimeout(function(){boxCoordenadas.classList.add('movement_from_back');}, 100);
  const datos = await getDataCoordenadas(e);
  arrayDatos = JSON.parse(datos)
  setTimeout(function(){
    document.getElementById('viento_velocidad_coordenadas').innerHTML=arrayDatos.wind.speed
    document.getElementById('id').innerHTML=arrayDatos.id
    document.getElementById('temperatura_general_coordenadas').innerHTML=arrayDatos.main.temp+'°'
    document.getElementById('temp_minima_coordenadas').innerHTML=arrayDatos.main.temp_min+'°'
    document.getElementById('temp_maxima_coordenadas').innerHTML=arrayDatos.main.temp_max+'°'
    document.getElementById('humedad_coordenadas').innerHTML=arrayDatos.main.humidity
    document.getElementById('presion_coordenadas').innerHTML=arrayDatos.main.pressure 
    document.getElementById('timezone_coordenadas').innerHTML=arrayDatos.timezone
    document.getElementById('ciudad_coordenadas').innerHTML=arrayDatos.name 
    document.getElementById('pais_coordenadas').innerHTML=arrayDatos.sys.country
  }, 100)

}
