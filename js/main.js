const url = 'http://127.0.0.1:5500/jobs.json';
const contenedorVacantes = document.querySelector('.contenedor-vacantes');
const  obtenerTodosLosTrabajo = (url) => {
    return fetch(url)
    .then(respuesta=>respuesta.json())
    .then(jobs=>jobs)
    .catch(error=>console.error(new Error(error)));
}

const pintarTrabajos = async () =>{
    const trabajos = await obtenerTodosLosTrabajo(url);
    const fragment = document.createDocumentFragment();
    const vacante = document.getElementById('vacante');
    const tituloVacante = vacante.content.querySelector('.vacante__titulo');
    const descripcionVacante = vacante.content.querySelector('.vacante__descripcion');
    const vacanteBoton = vacante.content.querySelector('.vacante__boton');
    console.log(trabajos);
   for(const trabajo of trabajos){
    tituloVacante.textContent = trabajo.puesto;
    descripcionVacante.textContent = trabajo.descripcion;
    vacanteBoton.setAttribute('href',trabajo.url)
    vacanteBoton.setAttribute('target','_blank');
    vacanteBoton.textContent = `Aplicar en ${trabajo.aplicar}`;
    const clon = document.importNode(vacante.content,true);
    fragment.appendChild(clon);
   }
   contenedorVacantes.appendChild(fragment);
  
}

pintarTrabajos();