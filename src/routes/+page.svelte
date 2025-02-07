<script>
  import { goto } from '$app/navigation';
  import BinaryTreeDisplay from '$lib/components/BinaryTreeDisplay.svelte';


  
  function crearSolicitud() {
    goto('/solicitud');
  }
</script>

<style>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: calc(100vh - 70px);
    padding: 20px;
    gap: 15px;
    padding-top: 50px;
  }

  .info-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    margin-top: 20px;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .info-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #000000;
    
  }

  .info-text {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }

  .create-button {
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #086ac0, #1263a5, #1d5688, #5f8cae); 
    border: none;
    border-radius: 0px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 40px;
  }

  .create-button:hover {
    background: linear-gradient(135deg, #4e7699, #42505b, #2868a0, #086ac0); 
    box-shadow: 0px 0px 15px rgba(92, 139, 255, 0.5);
    
  }

  main{
      background-size: cover;
      width: 100%;
      font-family: 'Arial', sans-serif; 
      line-height: 1.6; 
      font-size: 16px;
      text-align: center;
  }
</style>


<div class="home-container">
  <div class="info-box">
    <div class="info-title">Información General</div>
    <div class="info-text">
        Se debe diligenciar las generalidades del proyecto de manera informativa. SOLO MODIFIQUE LAS CELDAS EN COLOR AMARILLO
    </div>
  </div>

  <button class="create-button" on:click={crearSolicitud}>
    Crear una solicitud
  </button>
  <main>
    <BinaryTreeDisplay />
</main>
</div>



