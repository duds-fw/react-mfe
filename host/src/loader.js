/**
 * Dynamically load a remoteEntry.js script for Module Federation
 */
export function loadRemoteScript(name, url) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(`remote-${name}`)) {
      // already loaded
      return resolve();
    }

    const element = document.createElement("script");
    element.id = `remote-${name}`;
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      console.log(`Remote ${name} loaded`);
      resolve();
    };

    element.onerror = (err) => {
      console.error(`Error loading remote: ${name} from ${url}`);
      reject(err);
    };

    document.head.appendChild(element);
  });
}
