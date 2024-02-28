const circle = document.getElementById('circle');
const observer = new IntersectionObserver((item) => {
    const trackingInfo = item[0];

    if(trackingInfo.isIntersecting){
        console.log("Circle is visible");
        // Disconnect observing the item
        observer.disconnect()
    }else{
        console.log("Circle is not visible");
    }
})

// Observing the item
observer.observe(circle);