const contenedorVacantes = document.querySelector('.contenedor-vacantes');
const url = 'https://jobs-do.netlify.app/jobs.json';

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
    const idJob = parseInt(parametros.get('job'))
    console.log(trabajos);
    const trabajo = trabajos.filter((job)=>job.id === idJob);
    console.log(trabajo);
    const vacante = document.getElementById('vacante');
    const tituloVacante = vacante.content.querySelector('.vacante__titulo');
    const descripcionVacante = vacante.content.querySelector('.vacante__descripcion');
    const vacanteBoton = vacante.content.querySelector('.vacante__boton');
    tituloVacante.textContent = trabajo[0].puesto;
    descripcionVacante.textContent = trabajo[0].descripcion;
    vacanteBoton.setAttribute('href',trabajo[0].url)
    vacanteBoton.textContent = 'Aplicar en Aldaba';
    const clon = document.importNode(vacante.content,true);
    contenedorVacantes.appendChild(clon);
}

pintarTrabajo();