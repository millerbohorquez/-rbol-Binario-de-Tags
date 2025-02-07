<script lang="ts">
    const menuItems = [
      {
        title: 'Wiki',
        items: [
          { title: 'Que es', subItems: ['Quien soy'] },
          { title: 'Tallas' }
        ]
      }
    ];
  </script>
  
  <style>
   
    .wiki-layout {
      display: flex;
      min-height: calc(100vh - 70px);
      background-color: white;
      margin-left: 10%;
      margin-right: 5%;
      margin-top: 5%;
      margin-bottom: 5%;
    }
  
    .sidebar {
      width: 200px;
      background-color: #f0f0f0;
      padding: 1rem;
    }
  
    .main-content {
      flex: 1;
      padding: 2rem;
      margin-left: 10%;
      margin-right: 5%;
      margin-top: -4%;
      margin-bottom: 5%;
      
    }
  
    .menu-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 1rem;
    }
  
    .menu-link {
      display: block;
      padding: 0.25rem 0;
      text-decoration: none;
      color: black;
      font-size: 14px;
    }
  
    .menu-link::before {
      content: "•";
      margin-right: 0.5rem;
    }
  
    .menu-sublink {
      display: block;
      padding: 0.25rem 0;
      padding-left: 1rem;
      text-decoration: none;
      color: black;
      font-size: 14px;
    }
  
    .menu-sublink::before {
      content: "—";
      margin-right: 0.5rem;
    }
  
    .content-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
  
    .content-subtitle {
      font-size: 16px;
      color: #000000;
      font-weight: bold;
      margin-bottom: 1.5rem;
      margin-left: 2rem;
    }
  
    .content-body {
      background-color: #e0e0e0;
      min-height: 400px;
      width: 100%;
    }
  </style>
  
  <div class="wiki-layout">
    <aside class="sidebar">
      {#each menuItems as section}
        <div class="menu-title">{section.title}</div> 
        {#each section.items as item}
          <a href="#{item.title}" class="menu-link">{item.title}</a>
          {#if item.subItems}
            {#each item.subItems as subItem}
              <a href="#{subItem}" class="menu-sublink">{subItem}</a>
            {/each}
          {/if}
        {/each}
      {/each}
    </aside>
  
    <main class="main-content">
      <h1 class="content-title">Titulo</h1>
      <p class="content-subtitle">Subtitulo</p>
      <div class="content-body">
      </div>
    </main>
  </div>