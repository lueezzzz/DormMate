export const applyStoredTheme = () => {
  const isDark = localStorage.getItem("theme") === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  document.documentElement.classList.toggle("dark", isDark);
};

export const setStoredTheme = (isDark) => {
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyStoredTheme();
};
