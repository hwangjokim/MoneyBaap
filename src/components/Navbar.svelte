<!-- component/Navbar.svelte -->
<script>

import {replace } from 'svelte-spa-router'
</script>

<header class="navbar is-fixed-top">
<div class="container">
    <div class="navbar-brand">
    <div class="navbar-item" >
        <button style="border: 0; cursor:pointer; background-color:rgba( 255, 255, 255, 0 );" on:click={() => replace("/")}><img src="/logo.png" alt="Logo"/></button>
        
    </div>
    </div>
    <div class="navbar-menu">
    <div class="navbar-end">
        <span class="navbar-item">
        <!-- svelte-ignore security-anchor-rel-noreferrer -->
        <a
            class="button is-info"
            href="https://github.com/hwangjokim/MoneyBaap"
            target="_blank"
        >
            <span class="icon">
                <i class="fab fa-github"></i>
            </span>
            <span>Github</span>
        </a>
        </span>
    </div>
    </div>
</div>
</header>

