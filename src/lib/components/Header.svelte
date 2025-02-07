<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { isAuthenticated } from '../../authStore';
  import { goto } from '$app/navigation';
  
  let isMenuOpen = false;

  
  const menuItems = [
    { href: '/', icon: '🏛️', label: 'Inicio' },
    { href: '/solicitud', icon: '🏛️', label: 'Formulario' },
    { href: '/wikii', icon: '🏛️', label: 'Wiki' },
    
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  $: isLoginPage = $page?.url?.pathname === '/login';
  $: showHamburger = $page?.url?.pathname !== '/login';
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
    }
  }

  function logout() {
    isAuthenticated.set(false); 
    isMenuOpen = false; 
    goto('/login'); 
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<style>
  header {
    background-color: #0049ff; 
    color: white; 
    padding: 15px 0; 
    background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae); 
  }
  
  .header-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 20px; 
  }
  
  .header-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 50px;
  }

  .logo-circle {
    background: white;
    border-radius: 50%;
    width: 41px;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header-logo img {
    height: 30px;
    width: auto;
  }

  .company-name {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
  
  .header-links {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 14%;
    height: 100vh;
    background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae);
    flex-direction: column;
    padding: 150px 20px 20px;
    gap: 25px;
    z-index: 998;
  }
  
  .header-link {
    text-decoration: none;
    color: white; 
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }

  .header-link::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .header-link::after {
    content: '';
    position: absolute;
    left: -12px;
    top: 35%;
    height: 15px;
    width: 2px;
    background-color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .header-link:hover::before,
  .header-link:hover::after {
    opacity: 1;
  }

  .header-link:hover {
    text-decoration: underline; 
    background: linear-gradient(135deg, #207cca, #3c6484, #207cca, #5f8cae); 
    box-shadow: 0px 0px 0px #5C8BFF,
                0px 0px 0px #5C8BFF,
                0px 0px 0px #5C8BFF;
  }

  /*menú hamburguesa */
  .menu-button {
    display: block;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px;
    position: relative;
    z-index: 999;
  }

  .hamburger {
    width: 25px;
    height: 3px;
    background-color: white;
    position: relative;
    transition: all 0.3s;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: white;
    transition: all 0.3s;
  }

  .hamburger::before {
    transform: translateY(-8px);
  }

  .hamburger::after {
    transform: translateY(8px);
  }

 
  .menu-open .hamburger {
    background-color: transparent;
  }

  .menu-open .hamburger::before {
    transform: rotate(45deg);
  }

  .menu-open .hamburger::after {
    transform: rotate(-45deg);
  }


  .header-links.show {
    display: flex;
  }

  .link-icon {
    font-size: 18px;
    min-width: 24px;
    margin-left:30px;
  }
  
</style>

<header>
  <div class="header-container">
    {#if showHamburger}
    {#if !isLoginPage}
    <button 
      class="menu-button" 
      class:menu-open={isMenuOpen} 
      on:click={toggleMenu}
      aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isMenuOpen}
      aria-controls="nav-menu"
    >
      <div class="hamburger"></div>
    </button>
    {/if}
    {/if}

    <div class="header-logo">
      {#if !isLoginPage}
      <a href="/" class="logo-circle">
        <img src="https://sdn.signalhire.co/storage/company/9211/1f1e/50cf/12ba/fb07/ca1b/2eff/0a5d.webp" alt="LINKTIC Logo" />
      </a>
      {/if}
      <span class="company-name">LINKTIC</span>
    </div>

    <nav 
      id="nav-menu"
      class="header-links" 
      class:show={isMenuOpen}
      transition:slide={{ duration: 300 }}
    >
      {#each menuItems as {href, icon, label}}
        <a {href} class="header-link">
          <span class="link-icon">{icon}</span>
          {label}
        </a>
      {/each}

      
      {#if $isAuthenticated}
        <a style="margin-top: 150%; " href="/login" on:click|preventDefault={logout} class="header-link">
          <span class="link-icon"><i class="fa-solid fa-right-from-bracket"></i></span> Cerrar sesión
        </a>
      {:else}
        <a style="margin-top: 100%; " href="/login" class="header-link">
          <span class="link-icon">🏛️</span> Login
        </a>
      {/if}
    </nav>
  </div>
</header>

