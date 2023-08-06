
function typeWriter(text) {
  let i = 0;
  const speed = 50; /* The speed/duration of the effect in milliseconds */

  if (i < text.length) {
      document.getElementById('demo').innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
  }
}