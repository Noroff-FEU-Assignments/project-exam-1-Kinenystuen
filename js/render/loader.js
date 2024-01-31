// Loader div
const loaderBackground = document.createElement("div");
const loaderArea = document.createElement("div");
const loader = document.createElement("div");
loaderBackground.className = "overlay";
loaderArea.className = "loaderArea";
loader.className = "loader";

loaderArea.appendChild(loader);
loaderBackground.appendChild(loaderArea);

export { loaderArea, loaderBackground, loader};