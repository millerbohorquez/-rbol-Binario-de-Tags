<script>
    import BinaryTree from '../BinaryTree';
    import { goto } from '$app/navigation'; 

    const tree = new BinaryTree();
   
    tree.insert('Tag1', ['Subtag1.1', 'Subtag1.2']); 
    tree.insert('Tag2', ['Subtag2.1']);
    tree.insert('Tag3', ['Subtag3.1', 'Subtag3.2']);
    tree.insert('Tag4', ['Subtag4.1']);
    tree.insert('Tag5', ['Subtag5.1']);

    
    let nodes = tree.getNodes();
</script>

<style>
    .tag {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer; 
        border-radius: 90px;
    }
    .subtag {
        display: inline-block;
        background-color: #28a745;
        color: white;
        padding: 3px 8px;
        border-radius: 3px;
        margin: 3px;
        border-radius: 90px;
    }
</style>

<div>
    <h2>Árbol Binario de Tags</h2>
    <div>
        {#each nodes as node}
            {#if node.value === 'Tag1'}
                <span class="tag" on:click={() => goto('/solicitud')}>{node.value}</span>
            {:else}
                <span class="tag">{node.value}</span>
            {/if}
            {#each node.subtags as subtag}
                <span class="subtag">{subtag}</span>
            {/each}
        {/each}
    </div>
</div> 