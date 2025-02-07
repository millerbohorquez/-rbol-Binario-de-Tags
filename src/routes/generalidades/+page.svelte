<script>
    // @ts-nocheck
    import { createForm } from "svelte-forms-lib";
    import { postData } from '../../api.js';
    import { getData } from '../../api.js';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let showMessage = false;
       
    let cargosAgrupados = {
        rq: [],            
        diseno: [],        
        arqui: [],         
        infra: [],       
        ciber: [],         
        desarrolloNC: [],  
        desarrolloDEV: [], 
        datos: [],         
        automa: [],        
        calidad: [],       
        metodologias: [],  
        copy: [],          
        disenografico: [], 
        estrategia: [],    
        formacion: [],     
        audiovisual: []   
    };


    async function fetchCargos() {
        try {
            const response = await getData('/cargos');

            
            response.forEach(cargo => {
                switch (cargo.area) {
                    case "Requerimientos":
                        cargosAgrupados.rq.push(cargo);
                        break;
                    case "Diseño":
                        cargosAgrupados.diseno.push(cargo);
                        break;
                    case "Arquitectura":
                        cargosAgrupados.arqui.push(cargo);
                        break;
                    case "Infra":
                        cargosAgrupados.infra.push(cargo);
                        break;
                    case "Seguridad":
                        cargosAgrupados.ciber.push(cargo);
                        break;
                    case "Desarrollo (NC)":
                        cargosAgrupados.desarrolloNC.push(cargo);
                        break;
                    case "Desarrollo":
                        cargosAgrupados.desarrolloDEV.push(cargo);
                        break;
                    case "Datos":
                        cargosAgrupados.datos.push(cargo);
                        break;
                    case "Automatizaciones":
                        cargosAgrupados.automa.push(cargo);
                        break;
                    case "Calidad (QA)":
                        cargosAgrupados.calidad.push(cargo);
                        break;
                    case "Gerencia":
                        cargosAgrupados.metodologias.push(cargo);
                        break;
                    case "Copy":
                        cargosAgrupados.copy.push(cargo);
                        break;
                    case "Grafico":
                        cargosAgrupados.disenografico.push(cargo);
                        break;
                    case "Estrategia": 
                        cargosAgrupados.estrategia.push(cargo);
                        break;
                    case "Soporte":
                        cargosAgrupados.formacion.push(cargo);
                        break;
                    case "Audiovisual":
                        cargosAgrupados.audiovisual.push(cargo);
                        break;
                    default:
                        console.warn("Área desconocida:", cargo.area);
                }
            });

        } catch (error) {
            console.error("Error al obtener los cargos:", error);
        }
    }

    onMount(fetchCargos);
    
    let accordions = {
        rq: false,
        diseno: false,
        arqui: false,
        infra: false,
        ciber: false,
        desarrolloNC: false,
        desarrolloDEV: false,
        datos: false,
        automa: false, 
        calidad: false, 
        metodologias: false, 
        copy: false,
        disenoGrafico: false,
        estrategia: false,
        formacion: false,
        audiovisual: false
    };
    

    const initialValues = [
        { id_solicitud: 1 },
        { nombre: "", id_cargo: "", id_area: "Requerimentos (RQ)" },
        { nombre: "", id_cargo: "", id_area: "Diseño UI/UX" },
        { nombre: "", id_cargo: "", id_area: "Arquitectura (ARQ)" },
        { nombre: "", id_cargo: "", id_area: "Infraestructura (INF)" },
        { nombre: "", id_cargo: "", id_area: "Ciberseguridad" },
        { nombre: "", id_cargo: "", id_area: "Desarrollo (DEV-NC/LC)" },
        { nombre: "", id_cargo: "", id_area: "Desarrollo (DEV)" },
        { nombre: "", id_cargo: "", id_area: "Datos (DBA)" },
        { nombre: "", id_cargo: "", id_area: "Automatizaciones (AUT)" },
        { nombre: "", id_cargo: "", id_area: "Aseguramiento de calidad (QA)" },
        { nombre: "", id_cargo: "", id_area: "Metodologías Ágiles/CMMI (M.A/C)" },
        { nombre: "", id_cargo: "", id_area: "Copy" },
        { nombre: "", id_cargo: "", id_area: "Diseño Gráfico" },
        { nombre: "", id_cargo: "", id_area: "Estrategia" },
        { nombre: "", id_cargo: "", id_area: "Formación" },
        { nombre: "", id_cargo: "", id_area: "Audiovisual" }
    ];

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: values => {
            let errs = {};
           
            return errs;
        },
        onSubmit: async () => {
            showMessage = true;
            try {
                const response = await postData('/stakeholders', $form);
                console.log("Formulario enviado correctamente:", response);
                setTimeout(() => {
                    showMessage = false;
                    goto('/backlog');  
                }, 3000);
            } catch (error) {
                console.error("Error al enviar el formulario:", error);
            }
        }
    });

    function toggleAccordion(section) {
        accordions[section] = !accordions[section];
    }
</script>

<style>


    .main-container {
        background-color: #E0E0E0;
        background-size: cover;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        padding: 55px; 
        box-sizing: border-box; 
    }

    .right {
        width: 120%;
        height: 90%;
        max-width: 1000px;
        background: #f2f8ff;
        border-radius: 25px;
        padding: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      
        
    }

    .title-section {
        text-align: center;
        margin-bottom: 30px;
    }

    .title {
        font-weight: bold;
        font-size: 25px;
        font-family: "Open Sans", sans-serif;
        color: #04132a;
    }

    form {
        height: 50%;
        display: grid;
        grid-template-columns: (4,4fr);
        gap: 5px;
    }

    .form-group {
        display: flex;
        width: 100%;
        flex-direction: column;
        
    }

    .form-label {
        font-weight: bold;
        text-align: center;
    }

    .fields-container {
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap; 
    }

    select, input {
        border: none;
        outline: none;
        background: none;
        font-size: 14px;
        color: black;
        padding: 5px;
        border: 2px solid #636363;
        border-radius: 10px;
        width: 100%;
        box-sizing: border-box;
    }

    select:hover, input:hover {
        border: 1px solid #207cca;
        cursor: pointer;
    }

    .envio {
        width: 100%;
        max-width: 200px;
        height: 45px;
        margin: 20px auto;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        color: #E0E0E0;
        border: none;
        background: #0049ff;
        border-radius: 25px;
        margin-top: 50px;
        background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
        
    }

    .envio:hover {
    
  
        background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
        transition: all .3s;
    }

    .mensajeError {
        color: rgb(255, 47, 47);
        font-size: smaller;
        font-weight: bold;
        font-family: 'Arial', sans-serif;
        text-align: left;
        margin-top: 5px;
    }

    .col{
        display: flex;
        gap: 2rem;

    }

    .accordion-button {
        padding: 0.25rem 0.5rem; 
        font-size: 0.875rem; 
        margin-left: 0.5rem; 
        border: none;
        border-radius: 10px;
        background-color: transparent; 
        cursor: pointer; 
        transition: color 0.3s; 

    }
    
    .accordion-button:hover {
        color: blue; 
    }
    .negrita{
        font-size: 16px;
    }
    em{
        color: red;
    }

    .accordion-button{
       resize: vertical;
      
    }




    .container {
    width: 100%;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    
    }

    .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    h3 {
    
    margin: 0;
    padding: 0;
    display: inline-block;

    }

    .toggle-button {
    background: none;
    border: none;
    cursor: pointer;
    }

    .arrow {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
    }

    .rotate {
    transform: rotate(180deg);
    }

    .content {
    margin-top: 20px;
    }

    .input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    }

 
  
    

    .info-icon {
     display: inline-block;
     width: 20px;
     height: 20px;
     background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae); 
     color: #fff;
     font-size: 14px;
     font-weight: bold;
     line-height: 20px;
     text-align: center;
     border-radius: 50%;
    
     
   
    }
    .information-container {
    position: relative;
    display: inline-block;
    cursor: pointer; 
    margin-left: 10px;
    }

    .information-text {
    visibility: hidden;
    width: 250px;
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    color: #fff;
    text-align: center;
    border-radius: 35px;
    padding: 1rem;
    position: absolute;
    z-index: 1;
    top: 100%;
    right: -130px; 
    transform: translateY(-135%); 
    opacity: 0;
    transition: opacity 0.3s;
    
    }

    .information-container:hover .information-text {
     visibility: visible;
     opacity: 1;
     
    }

    .information-text::before {
     content: "";
     position: absolute;
     top: 100%; 
     left: 50%;
     transform: translateX(-50%) scale(1.2); 
     border-width: 12px;
     border-style: solid;
     border-color: #4e7699 transparent transparent transparent; 
     border-radius: 50%; 
  
    }





    .info2-icon {
     display: inline-block;
     width: 20px;
     height: 20px;
     background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae); 
     color: #fff;
     font-size: 14px;
     font-weight: bold;
     line-height: 20px;
     text-align: center;
     border-radius: 50%;
     
     
   
    }
    .information2-container {
    position: relative;
    display: inline-block;
    cursor: pointer; 
    margin-left: 10px;
    }

    .information2-text {
    visibility: hidden;
    width: 250px;
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    color: #fff;
    text-align: center;
    border-radius: 35px;
    padding: 1rem;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: -660%; 
    transform: translateY(-135%); 
    opacity: 0;
    transition: opacity 0.3s;
    
    }

    .information2-container:hover .information2-text {
     visibility: visible;
     opacity: 1;
     
    }

    .information2-text::before {
     content: "";
     position: absolute;
     top: 100%; 
     left: 50%;
     transform: translateX(-50%) scale(1.2) ; 
     border-width: 12px;
     border-style: solid;
     border-color: #4e7699 transparent transparent transparent; 
     border-radius: 50%; 
  
    }

    .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    }

    .title2-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    }

    #confirmationMessage {
    display: none; 
    background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae);
    color: #fff; 
    padding: 1px; 
    border-radius: 5px; 
    font-size: 14px; 
    position: fixed; 
    top: 0; 
    left: 50%; 
    transform: translateX(-50%); 
    z-index: 1000; 
    margin-top: 3.6%;
    padding: 10px 20px 10px 20px;
    }
</style>


<div class="main-container">
    
    <div class="right">
        <section>
            <div id="confirmationMessage"  style="{showMessage ? 'display: block;' : 'display: none;'}">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="21" fill="none" viewBox="0 0 20 21">
                        <path fill="#fff"
                            d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z" />
                    </svg>Mensaje enviado
                </p>
                <p>Gracias por completar el formulario. ¡Nos comunicaremos contigo pronto!</p>
            </div>
        </section>

        <section class="title-section">
            <h2 class="title">GENERALIDADES DEL PROYECTO</h2>
        </section>

        <form  on:submit={handleSubmit}>

            
                
            <section class="col">
            
                <div class="container">
                <div class="header">
                    <div class="title-container">
                        <h3><em>*</em> Requerimientos (RQ)</h3>
                        <div class="information-container">
                          <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                          <span class="information-text">
                            Especificaciones y necesidades que el proyecto debe cumplir. Estos pueden incluir tanto requisitos funcionales como no funcionales. Son fundamentales para guiar el diseño y la implementación de la solución.
                          </span>
                        </div>
                      </div>
           
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('rq')}>
                        <svg class={`arrow ${accordions.rq ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                    </button>
                </div>

                    {#if accordions.rq}
                    <div class="content">
                        <div>
                            <label class="form-label" for="nombre">Nombre</label>
                            <input list="nombreRQOptions" bind:value={$form[1].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" required />
                            <datalist id="nombreRQOptions">
                                <option value="">Seleccione un nombre</option>
                                <option value="Miller">Miller</option>
                                <option value="Jorge">Jorge</option>
                                <option value="Chrystian">Chrystian</option>
                            </datalist>
                            {#if $errors[1]?.nombre}
                            <small class="mensajeError">{$errors[1].nombre}</small>
                            {/if}
                        </div>
                        <div>
                            <label class="form-label" for="id_cargo">Cargo</label>
                            <input list="responsableOptions" bind:value={$form[1].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un responsable" required />
                            <datalist id="responsableOptions">
                                <option value="">Seleccione un cargo</option>
                                {#each cargosAgrupados.rq as cargoItem}
                                  <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                {/each}
                            </datalist>
                            {#if $errors[1]?.id_cargo}
                            <small class="mensajeError">{$errors[1].id_cargo}</small>
                            {/if}
                        </div>
                    </div>
                    {/if}
             </div>  
         

             <div class="container">
                <div class="header">
                    <div class="title2-container">
                    <h3><em>*</em> Diseño UI/UX</h3>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Hace referencia al diseño de la interfaz de usuario (UI) y la experiencia de usuario (UX). Se enfoca en cómo los usuarios interactúan con la solución y busca optimizar tanto la funcionalidad como la estética.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Diseño')}>
                        <svg class={`arrow ${accordions.Diseño ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                    </button>
                </div>

                    {#if accordions.Diseño}
                    <div class="content">
                        <div>
                            <label class="form-label" for="nombre">Nombre</label>
                            <input list="nombreDisenoOptions" bind:value={$form[2].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" required />
                            <datalist id="nombreDisenoOptions">
                                <option value="">Seleccione un nombre</option>
                                <option value="Miller">Miller</option>
                                <option value="Jorge">Jorge</option>
                                <option value="Chrystian">Chrystian</option>
                            </datalist>
                            {#if $errors[2]?.nombre}
                                <small class="mensajeError">{$errors[2].nombre}</small>
                            {/if}
                        </div>
                        <div>
                            <label class="form-label" for="id_cargo">Cargo</label>
                            <input list="cargoDisenoOptions" bind:value={$form[2].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo" required />
                            <datalist id="cargoDisenoOptions">
                                <option value="">Seleccione un cargo</option>
                                {#each cargosAgrupados.diseno as cargoItem}
                                    <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                {/each}
                            </datalist>
                            {#if $errors[2]?.id_cargo}
                                <small class="mensajeError">{$errors[2].id_cargo}</small>
                            {/if}
                        </div>
                    </div>
                    {/if}
                </div>
            </section>

            <section class="col">
                
                <div class="container">
                    <div class="header">
                        <div class="title-container">
                        <h3><em>*</em> Arquitectura (ARQ)</h3>
                        <div class="information-container">
                            <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information-text">Define los principios, estándares y modelos que guían el diseño y desarrollo de los sistemas, asegurando coherencia y alineación con los objetivos estratégicos de la organización.</span>
                    </div>
                </div>
                        <button class="accordion-button" type="button" on:click={() => toggleAccordion('Arqui')}>
                            <svg class={`arrow ${accordions.Arqui ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                              </svg>
                        </button>
                    </div>
    
                        {#if accordions.Arqui}
                        <div class="content">
                        <div>
                            <label class="form-label" for="nombre">Nombre</label>
                            <input list="nombreArquitecturaOptions" bind:value={$form[3].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" required/>
                            <datalist id="nombreArquitecturaOptions">
                                <option value="">Seleccione un nombre</option>
                                <option value="Miller">Miller</option>
                                <option value="Jorge">Jorge</option>
                                <option value="Chrystian">Chrystian</option>
                            </datalist>
                            {#if $errors[3]?.nombre}
                                <small class="mensajeError">{$errors[3].nombre}</small>
                            {/if}
                        </div>
                        <div>
                            <label class="form-label" for="id_cargo">Cargo</label>
                            <input list="cargoArquitecturaOptions" bind:value={$form[3].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo" required/>
                            <datalist id="cargoArquitecturaOptions">
                                <option value="">Seleccione un cargo</option>
                                {#each cargosAgrupados.arqui as cargoItem}
                                   <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                {/each}
                            </datalist>
                            {#if $errors[3]?.id_cargo}
                                <small class="mensajeError">{$errors[3].id_cargo}</small>
                            {/if}
                        </div>
                    </div>
                    {/if}
                </div>
                

                <div class="container">
                    <div class="header">
                        <div class="title2-container">
                        <h3>Infraestrutura (INF)</h3>
                        <div class="information2-container">
                            <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information2-text">gestión y mantenimiento de los recursos físicos y tecnológicos que soportan las operaciones de la organización, incluyendo servidores, redes, almacenamiento y seguridad.</span>
                    </div>
                </div>
                        <button class="accordion-button" type="button" on:click={() => toggleAccordion('Infra')}>
                            <svg class={`arrow ${accordions.Infra ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                              </svg>
                        </button>
                    </div>
    
                        {#if accordions.Infra}
                        <div class="content">
                        <div>
                            <label class="form-label" for="nombre">Nombre</label>
                            <input list="nombreInfraestructuraOptions" bind:value={$form[4].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" />
                            <datalist id="nombreInfraestructuraOptions">
                                <option value="">Seleccione un nombre</option>
                                <option value="Miller">Miller</option>
                                <option value="Jorge">Jorge</option>
                                <option value="Chrystian">Chrystian</option>
                            </datalist>
                            {#if $errors[4]?.nombre}
                                <small class="mensajeError">{$errors[4].nombre}</small>
                            {/if}
                        </div>
                        <div>
                            <label class="form-label" for="id_cargo">Cargo</label>
                            <input list="cargoInfraestructuraOptions" bind:value={$form[4].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                            <datalist id="cargoInfraestructuraOptions">
                                <option value="">Seleccione un cargo</option>
                                {#each cargosAgrupados.infra as cargoItem}
                                  <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                {/each}
                            </datalist>
                            {#if $errors[4]?.id_cargo}
                                <small class="mensajeError">{$errors[4].id_cargo}</small>
                            {/if}
                        </div>
                    </div>
                    {/if}
                </div>

            </section>
      
            <section class="col">
            
                <div class="container">
                    <div class="header">
                        <div class="title-container">
                        <h3> Ciberseguridad</h3>
                        <div class="information-container">
                            <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information-text">Protección de sistemas, redes y datos contra accesos no autorizados y amenazas cibernéticas.</span>
                    </div>
                </div>
                        <button class="accordion-button" type="button" on:click={() => toggleAccordion('ciber')}>
                            <svg class={`arrow ${accordions.ciber ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
            
                    {#if accordions.ciber}
                        <div class="content">
                            <div>
                                <label class="form-label" for="nombre">Nombre</label>
                                <input list="nombreCiberseguridadOptions" bind:value={$form[5].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                                <datalist id="nombreCiberseguridadOptions">
                                    <option value="">Seleccione un nombre</option>
                                    <option value="Miller">Miller</option>
                                    <option value="Jorge">Jorge</option>
                                    <option value="Chrystian">Chrystian</option>
                                </datalist>
                                {#if $errors[5]?.nombre}
                                    <small class="mensajeError">{$errors[5].nombre}</small>
                                {/if}
                            </div>
                            <div>
                                <label class="form-label" for="id_cargo">Cargo</label>
                                <input list="cargoCiberseguridadOptions" bind:value={$form[5].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                                <datalist id="cargoCiberseguridadOptions">
                                    <option value="">Seleccione un cargo</option>
                                    {#each cargosAgrupados.ciber as cargoItem}
                                      <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                    {/each}
                                </datalist>
                                {#if $errors[5]?.id_cargo}
                                    <small class="mensajeError">{$errors[5].id_cargo}</small>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            
                <div class="container">
                    <div class="header">
                        <div class="title2-container">
                        <h3>Desarrollo (DEV-NC/LC)</h3>
                        <div class="information2-container">
                            <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information2-text">Creación de aplicaciones con plataformas de desarrollo visual, minimizando o eliminando la necesidad de codificación tradicional.</span>
                    </div>
                </div>
                        <button class="accordion-button" type="button" on:click={() => toggleAccordion('DesarrolloNC')}>
                            <svg class={`arrow ${accordions.DesarrolloNC ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {#if accordions.DesarrolloNC}
                        <div class="fields-container">
                            <div>
                                <label class="form-label" for="nombre">Nombre</label>
                                <input list="nombreDesarrolloNCOptions" bind:value={$form[6].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" />
                                <datalist id="nombreDesarrolloNCOptions">
                                    <option value="">Seleccione un nombre</option>
                                    <option value="Miller">Miller</option>
                                    <option value="Jorge">Jorge</option>
                                    <option value="Chrystian">Chrystian</option>
                                </datalist>
                                {#if $errors[6]?.nombre}
                                    <small class="mensajeError">{$errors[6].nombre}</small>
                                {/if}
                            </div>
                            <div>
                                <label class="form-label" for="id_cargo">Cargo</label>
                                <input list="cargoDesarrolloNCOptions" bind:value={$form[6].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo" />
                                <datalist id="cargoDesarrolloNCOptions">
                                    <option value="">Seleccione un cargo</option>
                                    {#each cargosAgrupados.desarrolloNC as cargoItem}
                                        <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                    {/each}
                                </datalist>
                                {#if $errors[6]?.id_cargo}
                                    <small class="mensajeError">{$errors[6].id_cargo}</small>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>

            </section>

            <section class="col">

                <div class="container">
                    <div class="header">
                        <div class="title-container">
                        <h3><em>*</em> Desarrollo (DEV)</h3>
                        <div class="information-container">
                            <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information-text">Proceso de diseño, creación y mantenimiento de software, aplicaciones y sistemas mediante programación.</span>
                    </div>
                </div>
                        <button class="accordion-button" type="button" on:click={() => toggleAccordion('DesarrolloDEV')}>
                            <svg class={`arrow ${accordions.DesarrolloDEV ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {#if accordions.DesarrolloDEV}
                        <div class="fields-container">
                            <div>
                                <label class="form-label" for="nombre">Nombre</label>
                                <input list="nombreDesarrolloOptions" bind:value={$form[7].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" required />
                                <datalist id="nombreDesarrolloOptions">
                                    <option value="">Seleccione un nombre</option>
                                    <option value="Miller">Miller</option>
                                    <option value="Jorgre">Ingeniero front</option>
                                    <option value="Líder de proyecto">Líder de proyecto</option>
                                </datalist>
                                {#if $errors[7]?.nombre}
                                    <small class="mensajeError">{$errors[7].nombre}</small>
                                {/if}
                            </div>
                            <div>
                                <label class="form-label" for="id_cargo">Cargo</label>
                                <input list="cargoDesarrolloOptions" bind:value={$form[7].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo" required />
                                <datalist id="cargoDesarrolloOptions">
                                    <option value="">Seleccione un cargo</option>
                                    {#each cargosAgrupados.desarrolloDEV as cargoItem}
                                       <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                    {/each}
                                </datalist>
                                {#if $errors[7]?.id_cargo}
                                    <small class="mensajeError">{$errors[7].id_cargo}</small>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            
                <div class="container">
                    <div class="header">
                        <div class="title2-container">
                        <h3>Datos (DBA)</h3>
                        <div class="information2-container">
                            <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information2-text">Gestión y administración de bases de datos, asegurando su integridad, seguridad y disponibilidad para los usuarios y sistemas.</span>
                    </div>
                </div>
                        <button class="accordion-button" type="button" on:click={() => toggleAccordion('Datos')}>
                            <svg class={`arrow ${accordions.Datos ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {#if accordions.Datos}
                        <div class="fields-container">
                            <div>
                                <label class="form-label" for="nombre">Nombre</label>
                                <input list="nombreDatosOptions" bind:value={$form[8].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                                <datalist id="nombreDatosOptions">
                                    <option value="">Seleccione un nombre</option>
                                    <option value="Formación 1">Formación 1</option>
                                    <option value="Formación 2">Formación 2</option>
                                    <option value="Formación 3">Formación 3</option>
                                </datalist>
                                {#if $errors[8]?.nombre}
                                    <small class="mensajeError">{$errors[8].nombre}</small>
                                {/if}
                            </div>
                            <div>
                                <label class="form-label" for="id_cargo">Cargo</label>
                                <input list="cargoDatosOptions" bind:value={$form[8].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                                <datalist id="cargoDatosOptions">
                                    <option value="">Seleccione un cargo</option>
                                    {#each cargosAgrupados.datos as cargoItem}
                                    <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                                {/each}
                                </datalist>
                                {#if $errors[8]?.id_cargo}
                                    <small class="mensajeError">{$errors[8].id_cargo}</small>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            </section>
            



        <!--desde aca los otros ocho -->

        <section class="col">
            
            <div class="container">
                <div class="header">
                    <div class="title-container">
                    <h3>Automatizaciones (AUT) </h3>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">Implementación de procesos automáticos para optimizar tareas repetitivas y mejorar la eficiencia operativa.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Automa')}>
                        <svg class={`arrow ${accordions.Automa ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {#if accordions.Automa}
           
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreAUTOptions" bind:value={$form[9].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreAUTOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Miller">Miller</option>
                            <option value="Jorge">Jorge</option>
                            <option value="Chrystian">Chrystian</option>
                        </datalist>
                        {#if $errors[9]?.nombre}
                            <small class="mensajeError">{$errors[9].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoAUTOptions" bind:value={$form[9].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo" />
                        <datalist id="cargoAUTOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.automa as cargoItem}
                               <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[9]?.id_cargo}
                            <small class="mensajeError">{$errors[9].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

            <div class="container">
                <div class="header">
                    <div class="title2-container">
                    <h3>Aseguramiento de calidad (QA)</h3>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Proceso de validación y verificación para garantizar que el software cumpla con los estándares y requisitos establecidos.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Calidad')}>
                        <svg class={`arrow ${accordions.Calidad ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {#if accordions.Calidad}
            
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreQAOptions" bind:value={$form[10].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreQAOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Miller">Miller</option>
                            <option value="Jorge">Jorge</option>
                            <option value="Chrystian">Chrystian</option>
                        </datalist>
                        {#if $errors[10]?.nombre}
                            <small class="mensajeError">{$errors[10].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoQAOptions" bind:value={$form[10].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                        <datalist id="cargoQAOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.calidad as cargoItem}
                               <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[10]?.id_cargo}
                            <small class="mensajeError">{$errors[10].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

        </section>

        <section class="col">

            <div class="container">
                <div class="header">
                    <div class="title-container">
                    <h3><em>*</em> Metodologias Agiles/CMMI (M.A/C)</h3>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">Enfoques de gestión que promueven el desarrollo iterativo y la mejora continua, optimizando procesos y entregas de valor.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Metodologias')}>
                        <svg class={`arrow ${accordions.Metodologias ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {#if accordions.Metodologias}
            
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreMetodologiasOptions" bind:value={$form[11].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre" required />
                        <datalist id="nombreMetodologiasOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Miller">Miller</option>
                                <option value="Jorge">Jorge</option>
                                <option value="Chrystian">Chrystian</option>
                        </datalist>
                        {#if $errors[11]?.nombre}
                            <small class="mensajeError">{$errors[11].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoMetodologiasOptions" bind:value={$form[11].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo" required />
                        <datalist id="cargoMetodologiasOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.metodologias as cargoItem}
                               <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[11]?.id_cargo}
                            <small class="mensajeError">{$errors[11].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

            <div class="container">
                <div class="header">
                    <div class="title2-container">
                    <h3>Copy</h3>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Proporcione un resumen breve de los mensajes clave para los interesados.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Copy')}>
                        <svg class={`arrow ${accordions.Copy ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {#if accordions.Copy}
           
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreCopyOptions" bind:value={$form[12].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreCopyOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Interés 1">Interés 1</option>
                            <option value="Interés 2">Interés 2</option>
                            <option value="Interés 3">Interés 3</option>
                        </datalist>
                        {#if $errors[12]?.nombre}
                            <small class="mensajeError">{$errors[12].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoCopyOptions" bind:value={$form[12].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                        <datalist id="cargoCopyOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.copy as cargoItem}
                              <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[12]?.id_cargo}
                            <small class="mensajeError">{$errors[12].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

            </section>
            
            <section class="col">

            <div class="container">
                <div class="header">
                    <div class="title-container">
                    <h3>Diseño Grafico</h3>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">Creación visual de elementos que comunican ideas, fortalecen la marca y mejoran la experiencia del usuario</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Diseno')}>
                        <svg class={`arrow ${accordions.Diseno ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                         </svg>
                     </button>
            </div>
    
                {#if accordions.Diseno}
            
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreDisenoGraficoOptions" bind:value={$form[13].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreDisenoGraficoOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Interés 1">Interés 1</option>
                            <option value="Interés 2">Interés 2</option>
                            <option value="Interés 3">Interés 3</option>
                        </datalist>
                        {#if $errors[13]?.nombre}
                            <small class="mensajeError">{$errors[13].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoDisenoGraficoOptions" bind:value={$form[13].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                        <datalist id="cargoDisenoGraficoOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.disenografico as cargoItem}
                               <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[13]?.id_cargo}
                            <small class="mensajeError">{$errors[13].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

            <div class="container">
                <div class="header">
                    <div class="title2-container">
                    <h3>Estrategia</h3>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">El enfoque general o plan de acción que se seguirá para alcanzar los objetivos del proyecto. Puede incluir aspectos técnicos, operativos o comerciales que guiarán la ejecución.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Estra')}>
                        <svg class={`arrow ${accordions.Estra ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                         </svg>
                     </button>
            </div>
    
                {#if accordions.Estra}
           
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreEstrategiaOptions" bind:value={$form[14].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreEstrategiaOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Método 1">Método 1</option>
                            <option value="Método 2">Método 2</option>
                            <option value="Método 3">Método 3</option>
                        </datalist>
                        {#if $errors[14]?.nombre}
                            <small class="mensajeError">{$errors[14].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoEstrategiaOptions" bind:value={$form[14].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                        <datalist id="cargoEstrategiaOptions">
                            <option value="">Seleccione un método</option>
                            {#each cargosAgrupados.estrategia as cargoItem}
                               <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[14]?.id_cargo}
                            <small class="mensajeError">{$errors[14].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

        </section>

        <section class="col">

            <div class="container">
                <div class="header">
                    <div class="title-container">
                    <h3>Formación</h3>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">Se refiere a la capacitación o entrenamientos necesarios para el equipo o los usuarios finales del proyecto. Esto puede incluir aprender nuevas herramientas o procesos necesarios para la implementación o uso de la solución.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Forma')}>
                        <svg class={`arrow ${accordions.Forma ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                         </svg>
                     </button>
            </div>
    
                {#if accordions.Forma}
           
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreFormacionOptions" bind:value={$form[15].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreFormacionOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Estrategia 1">Estrategia 1</option>
                            <option value="Estrategia 2">Estrategia 2</option>
                            <option value="Estrategia 3">Estrategia 3</option>
                        </datalist>
                        {#if $errors[15]?.nombre}
                            <small class="mensajeError">{$errors[15].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoFormacionOptions" bind:value={$form[15].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                        <datalist id="cargoFormacionOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.formacion as cargoItem}
                               <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[15]?.id_cargo}
                            <small class="mensajeError">{$errors[15].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

           
            <div class="container">
                <div class="header">
                    <div class="title2-container">
                    <h3>Audiovisual</h3>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Producción de contenido que combina audio y video para comunicar ideas de manera efectiva.</span>
                </div>
            </div>
                    <button class="accordion-button" type="button" on:click={() => toggleAccordion('Audio')}>
                        <svg class={`arrow ${accordions.Audio ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                         </svg>
                     </button>
            </div>
    
                {#if accordions.Audio}
           
                <div class="fields-container">
                    <div>
                        <label class="form-label" for="nombre">Nombre</label>
                        <input list="nombreAudiovisualOptions" bind:value={$form[16].nombre} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un nombre"/>
                        <datalist id="nombreAudiovisualOptions">
                            <option value="">Seleccione un nombre</option>
                            <option value="Formación 1">Formación 1</option>
                            <option value="Formación 2">Formación 2</option>
                            <option value="Formación 3">Formación 3</option>
                        </datalist>
                        {#if $errors[16]?.nombre}
                            <small class="mensajeError">{$errors[16].nombre}</small>
                        {/if}
                    </div>
                    <div>
                        <label class="form-label" for="id_cargo">Cargo</label>
                        <input list="cargoAudiovisualOptions" bind:value={$form[16].id_cargo} on:input={handleChange} class="input-field" placeholder="Seleccione o escriba un cargo"/>
                        <datalist id="cargoAudiovisualOptions">
                            <option value="">Seleccione un cargo</option>
                            {#each cargosAgrupados.audiovisual as cargoItem}
                              <option value="{cargoItem.Cargo}">{cargoItem.Cargo}</option>
                            {/each}
                        </datalist>
                        {#if $errors[16]?.id_cargo}
                            <small class="mensajeError">{$errors[16].id_cargo}</small>
                        {/if}
                    </div>
                </div>
                {/if}
            </div>

        </section>
        

        <button class="envio" on:click={handleSubmit}>Enviar</button>
      
        </form>
    </div>
</div>

