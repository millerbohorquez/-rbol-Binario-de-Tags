<script>
  import { Select } from 'svelte-forms-lib';

    // @ts-nocheck
    import { postData } from '../../api.js'; 
    import { onMount } from 'svelte';

    let idSolicitud = 1; 

    let nuevaFila = {
        ID_solicitud: idSolicitud,
        ID_talla: "",
        BackLog_de_Alto_Nivel: "",
    };
   
   
    let filasBacklog = [
      
    ]; 

  
  onMount(() => {
   
    let cantidadDeFilas = 1;  

    for (let i = 1; i < cantidadDeFilas; i++) {
            filasBacklog.push({
                id: i + 1,
                ID_solicitud: 1,
                ID_talla: "",
                BackLog_de_Alto_Nivel: "",
                enEdicion: false, 
            });
        }
    });
  
    
    let opcionesAudiovisual = ["Login de Aplicativo", "Formulario de PQRS", "Registro aplicativo"];
    let opcionesTalla = ["XS", "S", "M", "L", "XL"];
    
    
    let dificultadProyecto = [];
    let calculosTotales = [];

   

    let accordions = { ean: false }; 

    function agregarFilaBacklogNueva() {
        filasBacklog = [
            ...filasBacklog,
            {
                id: filasBacklog.length + 1,
                ID_solicitud: idSolicitud,
                ID_talla: "",
                BackLog_de_Alto_Nivel: "",
                enEdicion: false,
            },
        ];
    }
    
    function toggleAccordion(section) {
        accordions[section] = !accordions[section];
    }

    function eliminarFilaBacklog(id) {
        
        filasBacklog = filasBacklog.filter(fila => fila.id !== id);
    }

    function editarFila(id) {
        filasBacklog = filasBacklog.map(fila => {
            if (fila.id === id) {
                fila.enEdicion = !fila.enEdicion; 
            }
            return fila;
        });
    }

    function guardarEdicion(filaEditada) {
    
    filasBacklog = filasBacklog.map(fila => {
        if (fila.id === filaEditada.id) {
            return {
                ...fila, 
                BackLog_de_Alto_Nivel: filaEditada.BackLog_de_Alto_Nivel, 
                ID_talla: filaEditada.ID_talla, 
                enEdicion: false, 
            };
        }
        return fila; 
    });
    }
    function cancelarEdicion(filaEditada) {
    filasBacklog = filasBacklog.map(fila => {
        if (fila.id === filaEditada.id) {
            return { ...fila, enEdicion: false };
        }
        return fila;
    });
    }
    
    export { enviarSolicitud, enviarTallajes, agregarFilaBacklogNueva, eliminarFilaBacklog };
    
   
    async function enviarSolicitud() {
    try {
        const datosSolicitud = {
            tipoProyecto: "Backlog de Alto Nivel", 
            descripcion: "Solicitud inicial para gestionar tallaje de backlog",
            fecha: new Date().toISOString(), 
            creador: "NombreUsuario", 
        };

        const response = await postData('/tallaje', datosSolicitud);

        if (response.success) {
            idSolicitud = response.ID_solicitud; 
            console.log("ID de solicitud guardado:", idSolicitud);
        } else {
            console.error("Error en la respuesta del servidor:", response.error);
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
    }
    }


    function agregarFilaBacklog() {
        if (!nuevaFila.BackLog_de_Alto_Nivel || !nuevaFila.ID_talla) {
            alert("Debe completar ambos campos antes de agregar.");
            return;
        }

        filasBacklog = [
            ...filasBacklog,
            {
                id: filasBacklog.length + 1,
                ID_solicitud: nuevaFila.ID_solicitud,
                ID_talla: nuevaFila.ID_talla,
                BackLog_de_Alto_Nivel: nuevaFila.BackLog_de_Alto_Nivel,
            },
        ];

        
        nuevaFila.BackLog_de_Alto_Nivel = "";
        nuevaFila.ID_talla = "";
    }


    async function enviarTallajes() {
        if (idSolicitud === null) {
            console.error("ID de solicitud no está disponible");
            return;
        }

      
        const datosTallaje = filasBacklog.map(fila => ({
            ID_solicitud: idSolicitud, 
            ID_talla: fila.ID_talla, 
            BackLog_de_Alto_Nivel: fila.BackLog_de_Alto_Nivel 
        }));

        try {
            const response = await postData('/tallaje', datosTallaje);
            if (response.success) {
                console.log("Tallajes enviados correctamente:", response.results);
            } else {
                console.error("Error al enviar tallajes:", response.error);
            }
        } catch (error) {
            console.error("Error al enviar tallajes:", error);
        }
    }



    async function calcularDificultadProyecto() {
    try {
        const response = await postData('/tallaje', filasBacklog);
        console.log("Respuesta del backend:", response);
        
        if (response.success) {
            dificultadProyecto = response.results;
            calculosTotales = response.calculosTotales || {}; 
            
            console.log("Dificultad del Proyecto:", dificultadProyecto);
            console.log("Cálculos Totales:", calculosTotales);
        } else {
            console.error("Error al calcular la dificultad del proyecto:", response.error);
        }
    } catch (error) {
        console.error("Error al calcular la dificultad del proyecto:", error);
    }
}

</script>

  


<style>
    .main-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px; 
    padding: 20px;
    margin-bottom: 18%;
    }


    .left-section {
    flex: 1;
    background-color: #D9D9D9;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }


    .right-section {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    }


    .table-container {
    background-color: #D9D9D9;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }


    .title-section {
    font-weight: bold;
    font-size: 25px;
    color: #04132a;
    margin-bottom: 15px;
    text-align: center;
    }

    table {
    width: 100%;
    border-collapse: collapse;
    }

    th, td {
    padding: 10px;
    text-align: center;
    border: 1px solid #D9D9D9;
    }

    button.add {
    width: 100px;
    height: 45px;  
    margin-left: 4%;    
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    color: #f3ebeb;
    border: none;
    background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
    border-radius: 25px;
    }

    button.add:hover{
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    }

    button.delete{
    width: 50px;
    height: 30px;
    margin: 20px 0px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    color: #e6dbdb;
    border: none;
    background: linear-gradient(135deg, #99534e, #d51919, #a02828, #6a4242); 
    border-radius: 25px;
    }

    button.delete:hover{
    background: linear-gradient(135deg, #683d3d, #604747, #d51919, #4a1f1f); 
    }
    button.send {
    width: 50px;
    height: 30px;  
    margin: 20px 10px;
    margin-right: 38px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    color: #f3ebeb;
    border: none;
    background: linear-gradient(135deg, #2ecc71, #27ae60, #228b22, #3cb371);
    border-radius: 25px;
    }

    button.send:hover{
    background: linear-gradient(135deg, #3cb371, #228b22, #27ae60, #2ecc71); 
    }

    button.save {
    width: 50px;
    height: 30px;  
    margin: 20px 0px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    color: #f3ebeb;
    border: none;
    background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
    border-radius: 25px;
    }

    button.save:hover{
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    }

    button.edit {
    width: 50px;
    height: 30px;  
    margin: 20px 0px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    color: #f3ebeb;
    border: none;
    background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
    border-radius: 25px;
    }

    button.edit:hover{
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    }
    .buttons-container{
    display: flex;
    justify-content:end;
        
    }

    input.nombre{
    width: 80%;
    padding: 8px;
    font-size: 1rem;
    border-radius: 15px;
    border: 1px transparent solid;
    }

    input.talla{
    width: 60%;
    padding: 8px;
    font-size: 1rem;
    border-radius: 15px;
    border: 1px transparent solid;
    }
    

</style>

<div class="main-wrapper">
    <div class="left-section">
        <h2 class="title-section">BackLog de Alto Nivel</h2>
        <table>
            <thead>
                <tr>
                    <th style="width: 47%;">Requerimiento</th>
                    <th style="width: 20%;">Talla</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                
                <tr>
                    <td>
                        <input
                            class="nombre"
                            list="nombreOptions"
                            bind:value={nuevaFila.BackLog_de_Alto_Nivel}
                            placeholder="Seleccione requerimiento"
                        />
                        <datalist id="nombreOptions">
                            <option value="">Seleccione un nombre</option>
                            {#each opcionesAudiovisual as opcion}
                                <option value={opcion}>{opcion}</option>
                            {/each}
                        </datalist>
                    </td>
                    <td>
                        <input
                            class="talla"
                            list="tallaOptions"
                            bind:value={nuevaFila.ID_talla}
                            placeholder="Seleccione una talla"
                        />
                        <select id="tallaOptions">
                            <option value="">Seleccione una talla</option>
                            {#each opcionesTalla as opcion}
                                <option value={opcion}>{opcion}</option>
                            {/each}
                        </select>
                    </td>
                    <td>
                        <button class="add" on:click={agregarFilaBacklog}>
                            Agregar
                        </button>
                    </td>
                </tr>
    
               
                {#each filasBacklog as fila}
    <tr>
        {#if fila.enEdicion}
        
        <td>
            <input
                class="nombre"
                list="nombreOptions"
                bind:value={fila.BackLog_de_Alto_Nivel}
                placeholder="Seleccione requerimiento"
            />
            <datalist id="nombreOptions">
                <option value="">Seleccione un nombre</option>
                {#each opcionesAudiovisual as opcion}
                    <option value={opcion}>{opcion}</option>
                {/each}
            </datalist>
        </td>
        <td>
            <input
                class="talla"
                list="tallaOptions"
                bind:value={fila.ID_talla}
                placeholder="Seleccione una talla"
            />
            <datalist id="tallaOptions">
                <option value="">Seleccione una talla</option>
                {#each opcionesTalla as opcion}
                    <option value={opcion}>{opcion}</option>
                {/each}
            </datalist>
        </td>
        <td>
            <button title="Guardar" class="save" on:click={() => guardarEdicion(fila)}>
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
            <button title="Cancelar" class="delete" on:click={() => cancelarEdicion(fila)}>
                <i class="fa-solid fa-ban"></i>
            </button>
        </td>
        {:else}
       
        <td>{fila.BackLog_de_Alto_Nivel}</td>
        <td>{fila.ID_talla}</td>
        <td>
            <button title="Eliminar Fila" class="delete" on:click={() => eliminarFilaBacklog(fila.id)}>
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <button title="Editar fila" class="edit" on:click={() => editarFila(fila.id)}>
                <i class="fa-solid fa-pencil"></i>
            </button>
        </td>
        {/if}
    </tr>
    {/each}
            </tbody>
        </table>
        <div class="buttons-container">
            <button  class="send" on:click={calcularDificultadProyecto} title="Enviar"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
    </div> 
    

    
    <div class="right-section">
        <div class="table-container">
            <h2 class="title-section">Dificultad del Proyecto por talla</h2>
            <table>
                <thead>
                    <tr>
                        <th>Talla</th>
                        <th>Requerimiento</th>
                        <th>Descripción</th>
                        <th>Escenario Optimista</th>
                        <th>Escenario Realista</th>
                        <th>Escenario Negativo</th>
                        <th>Horas Recomendadas</th>
                        <th>Días de Proyecto</th>
                        <th>Semanas de Proyecto</th>
                        <th>Meses de Proyecto</th>
                    </tr>
                </thead>
                <tbody>
                    {#each dificultadProyecto as item}
                    <tr>
                        <td>{item.tallaproyecto}</td>
                        <td>{item.BackLog_de_Alto_Nivel}</td>
                        <td>{item.description}</td>
                        <td>{item.scenarioOptimistic}</td>
                        <td>{item.scenarioRealistic}</td>
                        <td>{item.scenarioPessimistic}</td>
                        <td>{item.horasTotales}</td>
                        <td>{item.diasProyecto}</td>
                        <td>{item.semanasProyecto}</td>
                        <td>{item.mesesProyecto}</td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>


        <div class="table-container">
            <h2 class="title-section">Dificultad general de tallas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Talla</th>
                        <th>Descripción</th>
                        <th>Escenario Optimista</th>
                        <th>Escenario Realista</th>
                        <th>Escenario Negativo</th>
                        <th>Horas Recomendadas</th>
                        <th>Días de Proyecto</th>
                        <th>Semanas de Proyecto</th>
                        <th>Meses de Proyecto</th>
                    </tr>
                </thead>
                <tbody>
                    {#if calculosTotales.talla_Nombre}
                    <tr>
                        <td>{calculosTotales.talla_Nombre}</td>
                        <td>{calculosTotales.descriptio}</td>
                        <td>{calculosTotales.scenarioOptimisti}</td>
                        <td>{calculosTotales.scenarioRealisti}</td>
                        <td>{calculosTotales.scenarioPessimisti}</td>
                        <td>{calculosTotales.horas_Totales}</td>
                        <td>{calculosTotales.dias_Proyecto}</td>
                        <td>{calculosTotales.semanas_Proyecto}</td>
                        <td>{calculosTotales.meses_Proyecto}</td>
                    </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>