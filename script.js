

/*-------------scroll aos -----------------*/
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('[data-aos="fade-up"], [data-aos="flip-right"], [data-aos="fade-right"], [data-aos="zoom-in"]');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // solo animar una vez
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
// ---------------------- temporizador -------------------------
function updateTimer() {
  const targetDate = new Date("August 6, 2025 18:00:00").getTime();
  const currentDate = new Date().getTime();
  const timeRemaining = targetDate - currentDate;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// --------------------------------gift---------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('mostrarBoton');
  const textoDesplegable = document.getElementById('textoDesplegable');

  boton.addEventListener('click', function () {
    textoDesplegable.classList.toggle('mostrar');
  });
});


function copyText() {
  var aliasText = document.getElementById('alias').innerText; // Obtener el texto del alias
  var tempInput = document.createElement('input');
  tempInput.value = aliasText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Mostrar el mensaje de "¡Copiado!"
  var copyMessage = document.getElementById('copyMessage');
  copyMessage.style.display = 'block';
  setTimeout(function () {
    copyMessage.style.display = 'none';
  }, 1500); // Ocultar el mensaje después de 1.5 segundos
}



function copyCbuText() {
  const aliasText = document.getElementById('cbuAlias').textContent;
  const copyMessage = document.getElementById('copyCbuMessage');

  const textarea = document.createElement('textarea');
  textarea.value = aliasText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  copyMessage.style.display = 'block';
  setTimeout(() => {
    copyMessage.style.display = 'none';
  }, 2000);
}

// --------------- confirmacion --------------------------------------


document.addEventListener('DOMContentLoaded', function () {
  const recipientNumber1 = '543885072965'; 
 

  function sendMessage(phoneNumber, event) {
    if (event) event.preventDefault();

    const firstName = document.getElementById('userFirstName').value.trim();
    const lastName = document.getElementById('userLastName').value.trim();
    const userMessage = document.getElementById('customMessage').value.trim();

    if (firstName === '' || lastName === '') {
      alert('Por favor, completa tu nombre y apellido antes de enviar.');
      return;
    }

    const finalMessage = 
      `Hola Alejandro, estaré encantado de asistir!!\n` +
      `Mis datos:\n` +
      `Nombre: ${firstName}\n` +
      `Apellido: ${lastName}\n` +
      `Mensaje: ${userMessage || '-'}`;

    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');

    alert('Mensaje enviado');

    // Limpiar campos
    document.getElementById('userFirstName').value = '';
    document.getElementById('userLastName').value = '';
    document.getElementById('customMessage').value = '';
    document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);

    document.getElementById('correo').scrollIntoView({ behavior: 'smooth' });
  }

  document.getElementById('botoncito1').addEventListener('click', function (event) {
    sendMessage(recipientNumber1, event);
  });

});




const audio = document.getElementById('audioFondo');
const audioControl = document.getElementById('audioControl');
const audioIcon = document.getElementById('audioIcon');

function cerrarPreloader(reproducirMusica) {
  document.getElementById('preloader').style.display = 'none';
  /*document.body.classList.remove('loader-active');*/
  audioControl.style.display = 'flex'; // Mostrar el botón al ocultar el preloader

  if (reproducirMusica) {
    audio.play().catch(err => console.log("Autoplay bloqueado:", err));
  }
}

document.getElementById('conMusica').addEventListener('click', function () {
  cerrarPreloader(true);
});



audioControl.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    audioIcon.innerHTML = '<path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>';
  } else {
    audio.pause();
    audioIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
  }
});


// Asitencia Excel
async function enviarDatos(asistencia) {
    const nombre = document.getElementById('userFirstName');
    const apellido = document.getElementById('userLastName');
    const mensaje = document.getElementById('customMessage');

    const nombreValor = nombre.value.trim();
    const apellidoValor = apellido.value.trim();
    const mensajeValor = mensaje.value.trim();

    if (!nombreValor || !apellidoValor) {
        alert("Por favor, completa el nombre y apellido");
        return;
    }

    const data = { 
        nombre: nombreValor, 
        apellido: apellidoValor, 
        asistencia, 
        mensaje: mensajeValor 
    };
    const url = "https://script.google.com/macros/s/AKfycbxhgCyhsbaFTxnQDJBMGjMzmZq7Bm8S0efpmJCy9Jmsu_zjebg83pWVBoyxoDNQJNkJ6A/exec";

    try {
        await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // Limpiar campos
        nombre.value = "";
        apellido.value = "";
        mensaje.value = "";

        // Mostrar mensaje personalizado
        if (asistencia === "Si") {
            alert("¡Gracias por confirmar asistencia!");
        } else {
            alert("¡Lamento que no puedas asistir!");
        }

    } catch (error) {
        console.error(error);
        alert("Error al enviar los datos");
    }
}

document.getElementById("botonSi").addEventListener("click", (e) => {
    e.preventDefault();
    enviarDatos("Si");
});
document.getElementById("botonNo").addEventListener("click", (e) => {
    e.preventDefault();
    enviarDatos("No");
});

