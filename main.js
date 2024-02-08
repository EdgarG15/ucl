//?Cargar Service Worker

if ('serviceWorker' in navigator) {
    console.log("Puedes usar el Service Worker");
    navigator.serviceWorker.register('./sw.js')
                            .then(res=>console.log('SW cargado correctamente' , res))
                            .catch(err => console.log('service Worker no se a podido registrar', err));
}
else{
    console.log('No se puede encontrar el service worker');
}