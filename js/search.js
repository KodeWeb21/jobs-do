const contenedorVacantes = document.querySelector('.contenedor-vacantes');
const url = 'http://127.0.0.1:5500/jobs.json';

const obtenerTodosLosTrabajo = (url) =>{
    return fetch(url)
    .then(respuesta=>respuesta.json())
    .then(jobs=>jobs)
    .catch(error=>console.error(new Error(error)));
}

const pintarTrabajo = async () =>{
    const trabajos = await obtenerTodosLosTrabajo(url);
    const queryString = location.search;
    const parametros = new URLSearchParams(queryString);
    const areaJobs = parametros.get('area')
    const fragment = document.createDocumentFragment();
    const trabajosDelArea = trabajos.filter((job)=>job.area.toLowerCase() === areaJobs.toLowerCase());
    console.log(trabajosDelArea);
    const vacante = document.getElementById('vacante');
    const tituloVacante = vacante.content.querySelector('.vacante__titulo');
    const descripcionVacante = vacante.content.querySelector('.vacante__descripcion');
    const vacanteBoton = vacante.content.querySelector('.vacante__boton');
   for(const trabajo of trabajosDelArea){
    tituloVacante.textContent = trabajo.puesto;
    descripcionVacante.textContent = trabajo.descripcion;
    vacanteBoton.setAttribute('href',trabajo.url)
    vacanteBoton.textContent = 'Aplicar en Aldaba';
    const clon = document.importNode(vacante.content,true);
    fragment.appendChild(clon);
   }
   contenedorVacantes.appendChild(fragment);
}

pintarTrabajo();