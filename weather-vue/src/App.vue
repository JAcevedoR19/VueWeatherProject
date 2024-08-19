<script setup>
  import Formulario from './components/Formulario.vue';
  import Weather from './components/Weather.vue';
  import Spinner from './components/Spinner.vue';
  import Alerta from './components/Alerta.vue';
  import useWeather from './composable/useWeather';

  const { getWeather, weather, showWeather, charging } = useWeather();

  console.log(weather);
</script>

<template>
  <h1 class="titulo">Buscador de Clima</h1>

  <div class="contenedor buscador-clima">
    <Formulario 
      @obtener-clima="getWeather"
    />

    <Spinner v-if="charging"/>
    <Alerta v-if="error"> {{ error }} </Alerta>
    <Weather v-if="showWeather" :weather="weather"/>
  </div>
</template>

<style scoped>

</style>
