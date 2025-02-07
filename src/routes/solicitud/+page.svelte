<script>
    // @ts-nocheck
    import { createForm } from "svelte-forms-lib";
    import { postData } from '../../api.js'; 
    import { goto } from '$app/navigation';
  
    let showMessage = false;
    
  
    const { form, errors, handleChange, handleSubmit } = createForm({
      initialValues: {
        orden_trabajo_servicio: '',
        alcance_proyecto: '',
        documento_requisitos: '',
        entregables: '',
        arquitectura_solucion: '',
        infraestructura: '',
        entrega_soporte: '',
        metodo_metodologia: '',
        fecha_solicitud: '',
        fecha_entrega: ''
      },
      validate: values => {
        let errs = {};
        
      
        for (const key in values) {
          if (values[key] === "") {
            errs[key] = "Este campo es requerido";
          }
        }
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(values.orden_trabajo_servicio)) {
          errs.orden_trabajo_servicio = "El campo debe ser alfanumérico";
        }
  
        const textOnlyRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ.,;:()]+$/;
        const textFields = ['alcance_proyecto', 'documento_requisitos', 'entregables', 'arquitectura_solucion', 'entrega_soporte','metodo_metodologia'];
  
        textFields.forEach(field => {
          if (!textOnlyRegex.test(values[field])) {
            errs[field] = "Este campo solo debe contener texto y números";
          }
        });
  
        
        if (values.fecha_solicitud && values.fecha_entrega) {
          const fecha_solicitud = new Date(values.fecha_solicitud);
          const fecha_entrega = new Date(values.fecha_entrega);
  
          if (fecha_entrega <= fecha_solicitud) {
            errs.fecha_entrega = "La fecha de entrega debe ser posterior a la fecha de solicitud";
          }
        }
  
        return errs;
      },
      onSubmit: async () => {
        showMessage = true;
  
        try {
          
          const response = await postData('/solicitudes', {
            orden_trabajo_servicio: $form.orden_trabajo_servicio,
            alcance_proyecto: $form.alcance_proyecto,
            documento_requisitos: $form.documento_requisitos,
            entregables: $form.entregables,
            arquitectura_solucion: $form.arquitectura_solucion,
            infraestructura: $form.infraestructura,
            entrega_soporte: $form.entrega_soporte,
            metodo_metodologia: $form.metodo_metodologia,
            fecha_solicitud: $form.fecha_solicitud,
            fecha_entrega: $form.fecha_entrega
          });
  
          console.log("Formulario enviado correctamente:", response);
  
         
     
     if (response) {
          setTimeout(() => {
            goto('/generalidades');
          }, 3000);
        } else {
          console.error("No se pudo obtener respuesta del servidor");
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    }
  });
  </script>
  



<style>

    
    .main-container {
    background-color: #E0E0E0;
    background-size: cover;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 55px; 
    box-sizing: border-box; 
    }
  
    textarea {
    border: none;
    outline: none;
    background: none;
    font-size: 14px;
    color: black;
    padding: 10px;
    border: 2px solid #636363;
    width: 100%;
    height: 41px; 
    border-radius: 10px;
    box-sizing: border-box;
    font-family: "Nunito Sans", sans-serif;
    resize: none; 
    }

    textarea:hover {
    border: 2px solid #5C8BFF;
    cursor: pointer;
    }
    .right {
    width: 40%;
    height: 90%;
    max-width: 1000px;
    background: #f2f8ff;
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center; 

  
    }
    
  
    .title-section {
        margin-bottom: 30px;
    }

    .title {
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        font-family: "Open Sans", sans-serif;
        color: #04132a;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        align-items: center;
      
    }
  
    .form-group {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
  
    input[type="text"], input[type="number"], input[type="date"], textarea {
        border: none;
        outline: none;
        background: none;
        font-size: 14px;
        color: black;
        padding: 10px;
        border: 2px solid #636363;
        width: 100%;
        border-radius: 10px;
        box-sizing: border-box;
        font-family: "Nunito Sans", sans-serif;
    }

    input[type="text"]:hover, input[type="number"]:hover, input[type="date"]:hover, textarea:hover {
        border: 2px solid #5C8BFF;
        cursor: pointer;
    }

    button {
        grid-column: span 2;
        width: 200px;
        height: 45px;
        margin: 20px auto;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        color: #E0E0E0;
        border: none;
        background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
        border-radius: 25px;
    }

    button:hover {
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


    small {
        font-family: "Nunito Sans", sans-serif;
        font-weight: bold;
        font-size: 12px;
    }

     h5{
     margin: 0;
     display: inline-block;
    
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
    border-radius:35px;
    padding: 1rem;
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 1500%;
    transform: translateY(-50%); 
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
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent #4e7699;
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
    border-radius:35px;
    padding: 1rem;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 250%;
    transform: translateY(-50%); 
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
    top: 50%;
    left: -5%;
    transform: translateY(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: transparent #4e7699 transparent transparent;
    }


    .title-container, .title2-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px; 
    }


    h5 {
    margin: 0;
    flex: 1; 
    }


    .information-container, .information2-container {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    }


    .info-icon, .info2-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 50%;
    margin-left: auto; 
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" fill="none" viewBox="0 0 20 21">
                        <path fill="#fff"
                            d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z" />
                    </svg>Mensaje enviado
                </p>
                <p>Gracias por completar el formulario. ¡Nos comunicaremos contigo pronto!</p>
            </div>
        </section>

      
        <section class="title-section">
            <h2 class="title">FORMULARIO DE SOLICITUD</h2>
        </section>

        
            <form on:submit={handleSubmit}>


                <div class="form-group">
                    <div class="title-container">
                   <h5>ORDEN DE TRABAJO/SERVICIO</h5>
                      <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information-text">
                          Es el documento que autoriza formalmente el inicio del proyecto o servicio solicitado. Define qué actividades deben llevarse a cabo y por quién.
                        </span>
                      </div>
                    </div>
                    
                    <input type="text" id="orden_trabajo_servicio" placeholder="Orden de Trabajo/Servicio" bind:value={$form.orden_trabajo_servicio} on:change={handleChange} />
                    {#if $errors.orden_trabajo_servicio}
                      <small class="mensajeError">{$errors.orden_trabajo_servicio}</small>
                    {/if}
                  </div>


                <div class="form-group">
                    <div class="title2-container">
                    <h5>ALCANCE DEL PROYECTO</h5>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Define los límites y objetivos del proyecto, especificando lo que se va a entregar y lo que está fuera del proyecto. Detalla las metas, recursos y plazos.</span>
                </div>
            </div>
                    <textarea id="alcancePalcance_proyectoroyecto" placeholder="Alcance del Proyecto" bind:value={$form.alcance_proyecto} on:change={handleChange}></textarea>
                    {#if $errors.alcance_proyecto}
                        <small class="mensajeError">{$errors.alcance_proyecto}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title-container">
                    <h5>DOCUMENTO DE REQUISITOS</h5>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                        <span class="information-text">Un documento donde se detallan las necesidades y especificaciones funcionales y técnicas que deben cumplirse en el proyecto. Es la base para diseñar la solución.</span>
                </div>
              </div>
                    <input type="text" id="documento_requisitos" placeholder="Documento de Requisitos" bind:value={$form.documento_requisitos} on:change={handleChange} />
                    {#if $errors.documento_requisitos}
                        <small class="mensajeError">{$errors.documento_requisitos}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title2-container">
                    <h5>ENTREGABLES</h5>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Los productos, servicios o resultados tangibles que se generarán durante el proyecto. Estos pueden incluir informes, software, manuales, etc.</span>
                </div>
            </div>
                    <input type="text" id="entregables" placeholder="Entregables" bind:value={$form.entregables} on:change={handleChange} />
                    {#if $errors.entregables}
                        <small class="mensajeError">{$errors.entregables}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title-container">
                    <h5>ARQUITECTURA DE SOLUCION</h5>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">Describe la estructura técnica o conceptual de la solución, como componentes de software, módulos, bases de datos, servidores, y cómo interactúan entre ellos.</span>
                </div>
            </div>
                    <input type="text" id="arquitectura_solucion" placeholder="Arquitectura de Solución" bind:value={$form.arquitectura_solucion} on:change={handleChange} />
                    {#if $errors.arquitectura_solucion}
                        <small class="mensajeError">{$errors.arquitectura_solucion}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title2-container">
                    <h5>INFRAESTRUCTURA</h5>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">Los recursos físicos o virtuales necesarios para soportar el desarrollo y la implementación de la solución, como hardware, redes, servidores y plataformas de nube.</span>
                </div>
            </div>
                    <input type="text" id="infraestructura" placeholder="Infraestructura" bind:value={$form.infraestructura} on:change={handleChange} />
                    {#if $errors.infraestructura}
                        <small class="mensajeError">{$errors.infraestructura}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title-container">
                    <h5>ENTREGA DE SOPORTE</h5>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">El proceso mediante el cual la solución final es transferida al equipo de soporte, asegurando que puedan gestionar y mantener el producto o servicio después de la implementación.</span>
                </div>
            </div>
                    <input type="text" id="entrega_soporte" placeholder="Entrega de Soporte" bind:value={$form.entrega_soporte} on:change={handleChange} />
                    {#if $errors.entrega_soporte}
                        <small class="mensajeError">{$errors.entrega_soporte}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title2-container">
                    <h5>METODO/METODOLOGIA</h5>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">La estrategia o marco de trabajo utilizado para gestionar y ejecutar el proyecto, como metodologías ágiles (Scrum) o tradicionales (Cascada)</span>
                </div>
            </div>
                    <input type="text" id="metodo_metodologia" placeholder="Método/Metodología" bind:value={$form.metodo_metodologia} on:change={handleChange} />
                    {#if $errors.metodo_metodologia}
                        <small class="mensajeError">{$errors.metodo_metodologia}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title-container">
                    <h5>FECHA DE SOLICITUD</h5>
                    <div class="information-container">
                        <span class="info-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information-text">La fecha en la que se solicitó formalmente el proyecto o servicio.</span>
                </div>
            </div>
                    <input type="date" id="fecha_solicitud" placeholder="Fecha de Solicitud" bind:value={$form.fecha_solicitud} on:change={handleChange} />
                    {#if $errors.fecha_solicitud}
                        <small class="mensajeError">{$errors.fecha_solicitud}</small>
                    {/if}
                </div>

                <div class="form-group">
                    <div class="title2-container">
                    <h5>FECHA DE ENTREGA</h5>
                    <div class="information2-container">
                        <span class="info2-icon"><i class="fa-solid fa-exclamation"></i></span>
                    <span class="information2-text">La fecha en la que se espera que los entregables del proyecto estén completados y listos para ser entregados al cliente o usuario final.</span>
                </div>
            </div>
                    <input type="date" id="fecha_entrega" placeholder="Fecha de Entrega" bind:value={$form.fecha_entrega} on:change={handleChange} />
                    {#if $errors.fecha_entrega}
                        <small class="mensajeError">{$errors.fecha_entrega}</small>
                    {/if}
                </div>

                <button type="submit">Enviar</button>
                
            </form>
      
    </div>
</div>