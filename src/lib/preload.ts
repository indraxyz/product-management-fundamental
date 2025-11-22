export function preloadRoute(routePath: string) {
  if (typeof window === "undefined") return;
  
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = routePath;
  document.head.appendChild(link);
}

export function preloadComponent(componentPath: string) {
  if (typeof window === "undefined") return;
  
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = componentPath;
  document.head.appendChild(link);
}

