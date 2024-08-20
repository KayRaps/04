<template>
  <div class="theme-toggle">
    <label class="switch">
      <input type="checkbox" v-model="isDarkMode" @change="toggleTheme" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDarkMode = ref(false);

const setTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  setTheme(isDarkMode.value ? "dark" : "light");
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDarkMode.value = savedTheme === "dark";
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    isDarkMode.value = prefersDark;
    setTheme(prefersDark ? "dark" : "light");
  }
});
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
