
const contenedorVacantes = document.querySelector('.contenedor-vacantes');

 const obtenerTodosLosTrabajo = () =>{
    const url = 'http://127.0.0.1:5500/jobs.json';
    return fetch(url)
    .then(respuesta=>respuesta.json())
    .then(jobs=>jobs)
    .catch(error=>console.error(new Error(error)));
}

const desbordamientoTexto = (cadena) =>{
    return cadena.slice(0,200).concat('...');
}

const pintarTrabajos = async () =>{
    const trabajos = await obtenerTodosLosTrabajo();
    const fragment = document.createDocumentFragment();
    const vacante = document.getElementById('vacante');
    const tituloVacante = vacante.content.querySelector('.vacante__titulo');
    const descripcionVacante = vacante.content.querySelector('.vacante__descripcion');
    const vacanteBoton = vacante.content.querySelector('.vacante__boton');
    console.log(trabajos);
   for(const trabajo of trabajos){
    tituloVacante.textContent = trabajo.puesto;
    descripcionVacante.textContent = desbordamientoTexto(trabajo.descripcion.trim());
    const jobUrl = `jobs/job.html?job=${trabajo.id}&desc=${trabajo.puesto}`
    vacanteBoton.setAttribute('href',jobUrl)
    vacanteBoton.textContent = 'Ver más';
    const clon = document.importNode(vacante.content,true);
    fragment.appendChild(clon);
   }
   contenedorVacantes.appendChild(fragment);
  
}

pintarTrabajos();