

function updateCircleRadius() {
    const circle = document.querySelector('#planetCenter circle');
    const height = window.innerHeight;
    
    // Calculate radius in viewBox units (0–100), depending on height
    // Let's say full height = 1000px maps to r = 47 (max in your viewBox)
    // You can adjust the scaling factor to your taste
    const maxHeight = 1000;
    const minR = 15;
    const maxR = 54;
    
    const scaledR = Math.max(minR, Math.min(maxR, (height / maxHeight) * maxR));
    circle.setAttribute('r', scaledR.toFixed(2));
}

// Initial call
updateCircleRadius();

// Update on resize
window.addEventListener('resize', updateCircleRadius);