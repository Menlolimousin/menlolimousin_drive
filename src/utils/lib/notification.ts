const notification = async () => {
  window.addEventListener("load", async () => {
    // Register Service Worker
    const sW = await navigator.serviceWorker.register("/sw.js");
    console.log("Serivce Worker", sW);
    const serviceWorker = await navigator.serviceWorker.ready;
    const clientId = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BK_F_G6-TzcKPKuCIpvT05ETgBmXSfvvm-FXfPluDO5ZUL6_-9_P86RBTfwDrwvk_E4x8KAn30cmrNkikKYIHWc",
    });
    console.log(clientId);
    console.log(JSON.stringify(clientId));
  });
};

export default notification;
