
function canvasSand() {

   // Get the canvas element
   var canvas = document.getElementById('canvas')

   // If canvas element exists:
   if (canvas.getContext) { 

      // Specify 2d canvas type
      ctx = getContext('2d');

      // Draw the cup
      cup();

      // Draw the sand particles
      sand();

   }
}

function cup() {

   // Draw the cup
   

}