<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <span class="icon">
        <i class="fas fa-home"></i>
      </span>
      <h6>Wordle</h6>
      <a role="button" class="navbar-burger" data-target="navbarBasicExample">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/game" class="navbar-item">Start Game</router-link>

        <router-link to="/" class="navbar-item"
          ><span class="icon"> <ion-icon name="home-outline" /></span
          >Home</router-link
        >
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
