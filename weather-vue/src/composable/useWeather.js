import { ref, computed } from "vue";
import axios from "axios";

export default function useWeather() {

    const weather = ref({});
    const charging = ref(false);
    const error = ref('');

    const getWeather = async ( {ciudad, pais }) => {

        const apiKey = import.meta.env.VITE_API_KEY
        
        charging.value = true;
        weather.value = {};
        error.value = '';

        try {
            
            // Obtener Latitud y Longitud
            const urlLatLong = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${apiKey}`;
            const { data } = await axios(urlLatLong);
            const { lat, lon } = data[0];

            // Obtener Clima
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const { data: response } = await axios(urlWeather);
            weather.value = response;
        } catch {
            error.value = 'Ciudad no encontrada';
        } finally {
            charging.value = false;
        }
    }

    const showWeather = computed(() => {
        return Object.values(weather.value).length > 0;
    });

    const formatTemperature = temp => parseInt(temp - 273.15) 
        

    return {
        getWeather,
        weather, 
        showWeather,
        formatTemperature,
        charging,
        error
    }
}