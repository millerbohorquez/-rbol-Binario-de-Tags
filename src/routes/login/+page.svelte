<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { postData } from '../../api';
    import { isAuthenticated } from '../../authStore';
    
    
    
    let showMessage = false;
    let isSignUpMode = false;
    let isLoading = false;
    let generalError = '';
    
    
    let loginEmail = '';
    let loginPassword = '';
    let showLoginPassword = false;
    
    
    let full_Name= '';
    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let showConfirmPassword = false;
    let showRegisterPassword = false;
    
   
    let errorMail = '';
    let errorPassword = '';
    let errorConfirmPassword = '';

    onMount(() => {
        
        clearErrors();
    });

    function clearErrors() {
        errorMail = '';
        errorPassword = '';
        errorConfirmPassword = '';
        generalError = '';
    }



    function togglePasswordVisibility() {
        showLoginPassword = !showLoginPassword;
    }
    const toggleMode = () => {
        clearErrors();
        isSignUpMode = !isSignUpMode;
    };

   
    function validarEmail(email) {
        try {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!email) {
                errorMail = 'Debes introducir un email';
                return false;
            } else if (!emailPattern.test(email)) {
                errorMail = 'El email debe ser válido';
                return false;
            }
            errorMail = '';
            return true;
        } catch (error) {
            console.error('Error en validación de email:', error);
            errorMail = 'Error al validar el email';
            return false;
        }
    }

    function validarPassword(password) {
        try {
            if (!password) {
                errorPassword = 'Debes introducir una contraseña';
                return false;
            } else if (password.length < 6) {
                errorPassword = 'La contraseña debe tener al menos 6 caracteres';
                return false;
            }
            errorPassword = '';
            return true;
        } catch (error) {
            console.error('Error en validación de contraseña:', error);
            errorPassword = 'Error al validar la contraseña';
            return false;
        }
    }

    async function handleLogin() {
    try {
        console.log('Iniciando inicio de sesión...'); 
        clearErrors();
        isLoading = true;

        
        const payload = {
            username, 
            password 
        };

        console.log('Enviando datos al servidor:', payload); 

        
        const response = await postData('/login', payload);

        console.log('Respuesta del servidor:', response); 

        if (response) {
            isAuthenticated.set(true);
            if (browser) {
                goto('/'); 
            }
        } else {
            throw new Error('No se pudo iniciar sesión.');
        }
    } catch (error) {
        console.error('Error en login:', error);
        generalError = error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
    } finally {
        isLoading = false;
    }
}


    async function handleRegister() {
    try {
        console.log('Iniciando registro...'); 
        clearErrors(); 
        isLoading = true;

        
        if (!validarEmail(email) || !validarPassword(password)) {
            console.log('Validación de email o contraseña fallida');
            return;
        }

        if (password !== confirmPassword) {
            console.log('Las contraseñas no coinciden');
            errorConfirmPassword = 'Las contraseñas no coinciden';
            return;
        }

        
        const payload = {
            full_Name,   
            username,    
            email,       
            password     
        };

        console.log('Enviando datos al servidor:', payload);

        
        const response = await postData('/register', payload);

        console.log('Respuesta del servidor:', response);

        if (response) {
            showMessage = true;
            setTimeout(() => {
                showMessage = false;
                location.reload();
            }, 3000);
        } else {
            throw new Error('No se pudo registrar el usuario.');
        }
    } catch (error) {
        console.error('Error en registro:', error);
        generalError = error.message || 'Error al registrarse. Por favor, intenta nuevamente.';
    } finally {
        isLoading = false; 
    }
}

</script>

<style>
   
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    background: #f2f8ff;
    margin-left: 17%;
    margin-right: 17%;
    margin-top: 5%;
    margin-bottom: 5%;
    border-radius: 5%;
}


.form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 4rem;
    width: 80%;
}


.title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 2rem;
}


.input-field {
    width: 100%;
    height: 50px;
    background-color: #f2f8ff;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #636363;
    position: relative; 
}


.input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 500;
    font-size: 1.1rem;
    color: #333;
    width: 100%;
    padding: 0 1rem; 
}


.btn {
    width: 150px;
    height: 45px;
    border: none;
    outline: none;
    border-radius: 25px;
    cursor: pointer;
    background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 1rem 0;
    transition: .3s;
}

.btn:hover {
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    transition: all .3s;
}


.info-container {
    background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
    border-radius: 5%;
}

.info-container h3 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
}

.info-container p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    border-radius: 10%;
}


.btn.transparent {
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}


input[type="email"],
input[type="password"],
input[type="ConfirmPassword"],
input[type="text"] {
    width: 90%; 
    max-width: 400px; 
    min-width: 300px; 
    padding: 10px; 
    box-sizing: border-box; 
    cursor: pointer;
}


.fa-solid {
    cursor: pointer;
    position: absolute;
    right: 10px; 
    top: 50%; 
    transform: translateY(-50%);
    color: #888; 
}

.fa-solid:hover {
    color: #333; 
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
    margin-top: 2.9%;
    padding: 10px 20px 10px 20px;
}


</style>



<div class="container">
    {#if !isSignUpMode}

    <div class="info-container">
        <h3>¿Eres nuevo aquí?</h3>
        <p>Registrate y unete a la familia linktic</p>
        <button class="btn transparent" on:click={toggleMode}>
            REGISTRARSE
        </button>
    </div>
       
        <div class="form-container">
            <h2 class="title">Iniciar Sesión</h2>
            <div class="input-field">
                <input type="email" placeholder="Username" bind:value={username} />
                <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="input-field">
                {#if showLoginPassword}
        <input type="text" placeholder="Contraseña" bind:value={loginPassword} 
        />
    {:else}
        <input type="password" placeholder="Contraseña" bind:value={loginPassword} 
        />
    {/if}
    <i 
        class="fa-solid {showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}" 
        on:click={() => showLoginPassword = !showLoginPassword}
        
    ></i>
    </div>
            <button class="btn" on:click={() => { handleLogin(); }}>INICIAR SESIÓN</button>
    </div>
    
    {:else}
        


        <div class="form-container">
            <h2 class="title">Registrarse</h2>
            <div class="input-field">
                <input type="text" placeholder="Nombre y Apellido" bind:value={full_Name} />
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-field">
                <input type="text" placeholder="Usuario" bind:value={username} />
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-field">
                <input type="email" placeholder="Email" bind:value={email} />
                <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="input-field">
                {#if showLoginPassword}
        <input type="text" placeholder="Contraseña" bind:value={loginPassword} 
        />
    {:else}
        <input 
            type="password" placeholder="Contraseña" bind:value={loginPassword} 
        />
    {/if}
    <i 
        class="fa-solid {showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}" 
        on:click={() => showLoginPassword = !showLoginPassword}
        
    ></i>
            </div>
            <div class="input-field">
                {#if showConfirmPassword}
                <input 
                    type="text" placeholder="Confirmar Contraseña" bind:value={confirmPassword} 
                />
            {:else}
                <input type="password" placeholder="Confirmar Contraseña" bind:value={confirmPassword} 
                />
            {/if}
            <i 
                class="fa-solid {showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}" 
                on:click={() => showConfirmPassword = !showConfirmPassword}
                
            ></i>
            </div>
            <button class="btn" on:click={() => { handleRegister(); }}>
                REGISTRARSE
            </button>
        </div>
       
        
        <div class="info-container">
            <h3>¿Ya eres uno de nosotros?</h3>
            <p>Inicia sesión y continúa tu experiencia</p>
            <button class="btn transparent" on:click={toggleMode}>
                INICIAR SESIÓN
            </button>
        </div>
    {/if}
</div>

<section>
    <div id="confirmationMessage" style="{showMessage ? 'display: block;' : 'display: none;'}">
        <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" fill="none" viewBox="0 0 20 21">
                <path fill="#fff"
                    d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z" />
            </svg>¡Usuario Registrado!
        </p>
        <p>Gracias por registrarte. ¡Bienvenido!</p>
    </div>
</section>
  