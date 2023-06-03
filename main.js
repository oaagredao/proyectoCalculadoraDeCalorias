
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Calculadora de calorias diarias gastadas

// Declaro TDEE y variables globales
var TDEE, nombre, edad, estatura, peso, sexo, ejercicio,IndiceMasaCorporal;

// declaro variable que lleva el conteo de calorias del desayuno
let caloriasDesayuno=0;

//Defino las funciones

// funcion que calcula TDEE en reposo
function TdeeReposo(peso, estatura, edad, sexo) {
    if (sexo == "H") {
        TDEE = ((10 * peso) + (6.25 * estatura) - (5 * edad) + 5);
    } else if (sexo == "M") {
        TDEE = ((10 * peso) + (6.25 * estatura) - (5 * edad) - 161);
    }
}

// funcion que calcula TDEE con ejercicio
function TdeeEjercicio(ejercicio) {
    if (ejercicio == "sedentario") {
        TDEE = TDEE * 1.2;
    }
    else if (ejercicio == "ligero") {
        TDEE = TDEE * 1.375;
    }
    else if (ejercicio == "moderado") {
        TDEE = TDEE * 1.55;
    }
    else if (ejercicio == "intenso") {
        TDEE = TDEE * 1.725;
    }
    else if (ejercicio == "muyintenso") {
        TDEE = TDEE * 1.9;
    }
}

// funcion que calcula el IMC
function IMC(peso,estatura){
    IndiceMasaCorporal=(peso)/(estatura*estatura)
}

// agregaré la funcionalidad para la pagina de recoleccionDatos
if (document.title === "Recolección de Datos") {
    // Código específico para la página 1

    // lo primero es importar el formulario en una constante
    // se almacena en una constante con el metodo getElementById Y EL ID del formulario
    const formulario = document.getElementById('formulariodatos');

    // el boton submit hace que la pagina se recargue cuando se oprime
    // entonces cancelamos esa caracteristica con:
    // al cancelar la caracteristica, todo lo que se coloque dentro se va a ejecutar
    formulario.addEventListener('submit', function (event) {
        // esto evita que el submit haga lo que hace default que es recargar
        event.preventDefault();

        // debo llamar los valores del formulario y colocarlos en variables
        // uso el metodo querySelector() para llamar el valor del elemento con un id especifico
        nombre = formulario.querySelector('#pregunta1').value;
        edad = parseInt(formulario.querySelector('#pregunta2').value);
        estatura = parseInt(formulario.querySelector('#pregunta3').value);
        peso = parseInt(formulario.querySelector('#pregunta4').value);
        sexo = formulario.querySelector('#pregunta5').value;
        ejercicio = formulario.querySelector('#pregunta6').value;

        // calculo del TDEE en reposo
        TdeeReposo(peso, estatura, edad, sexo);

        // calculo del TDEE con el ejercicio
        TdeeEjercicio(ejercicio);


        // mostrar el TDEE calculado en el html
        // en resultado guardo el elemento del id gastocalorico, en este caso es un p
        const resultado = document.getElementById('gastocalorico');
        // con text.Content puedo modificar el valor de ese texto a en este caso el valor de TDEE
        resultado.textContent = TDEE

        // mandar el valor de TDEE al local storage
        localStorage.setItem("TDEE",TDEE)
    });

    // tengo un boton con la propiedad disabled debajo del calculo de calorias
    // activo el id de activarboton, que muestra el boton oculto debajo del calculo de calorias
    const activarBoton = document.getElementById('activarBoton');
    activarBoton.addEventListener('click', function () {
        // llamas al boton oculto dentro de esta funcion para cambiar disabled en false y asi poder verlo
        const botonOculto = document.getElementById('botonOculto');
        botonOculto.disabled = false;
        botonOculto.style.display = `inline`;
    });
}


// agregaré la funcionalidad para la pagina de diseñoDieta
else if (document.title === "Diseño de dieta") {
    // Código específico para la página 1
    // importo el boton del html que tiene las opciones de elegir si subir, bajar o mantener peso
    const botonOpcionDieta = document.getElementById(`submitButton`);

    // debo crear un evento relacionado al oprimir el boton del formulario
    // como en este caso el boton no es un submit si no un boton, el evento será un click

    botonOpcionDieta.addEventListener(`click`, function (event) {
        const opcionSeleccionadaDieta = document.querySelector(`input[name="objetivo"]:checked`).value
        // se usa la forma general: const opcionSeleccionadaDieta = document.querySelector('selector').value;
        // el selector es un input de name objetivo y que esté checked para elegir el que se eligió


        // aqui abrimos diferentes paginas de acuerdo a cual opcion se eligió
        if (opcionSeleccionadaDieta === "subir") {
            window.open("paginasDieta/subirPeso.html", "_self");

        }
        else if (opcionSeleccionadaDieta === "bajar") {
            window.open("paginasDieta/bajarPeso.html", "_self")

        }

        else if (opcionSeleccionadaDieta == "mantener") {
            window.open("paginasDieta/mantenerPeso.html", "_self")

        }
    });
}


// Agregaré la funcionalidad para la página de bajar peso de la dieta
else if (document.title === "bajarPeso") {

    //obtenfo el p para mostrar las calorias que se quitarán de la dieta (el deficit calorico)
    const parrafoDeficitCalorico=document.getElementById("deficitCalorico");
    // obtengo el p para mostrar las calorias que se consumirán
    const parrafoCaloriasDietaBajarPeso = document.getElementById("caloriasConsumirDieta");

    // calculo el indice de masa corporal llamando a la funcion que lo calcula
    const indiceMasaCorporal = IMC(peso, estatura);

    let deficitCalorico;

    // llamamos el valor del TDEE del local storage
    TDEE=localStorage.getItem("TDEE");
    // tomo una accion u otra dependiendo de que resultado de indice de masa corporal se obtiene
    if (indiceMasaCorporal < 22) {
        deficitCalorico=0;
        parrafoCaloriasDietaBajarPeso.textContent = "No es recomendable que bajes de peso";
    } else {
        deficitCalorico = 350;
        parrafoCaloriasDietaBajarPeso.textContent = `${TDEE-deficitCalorico} calorías`;
    }
    // le asigno el valor del deficit calorico al parrafo que muestra el deficit calorico
    parrafoDeficitCalorico.textContent=`El déficit calórico que vamos a manejar será de: ${deficitCalorico} calorias`;

    // DESAYUNOS
    // debo crear un array de objetos que tenga la lista de alimentos en el desayuno y use el metodo find para comparar cual es el nombre del alimento ingresdao en el html y sacar el valor de las calorias del objeto

    // crear el array de objetos alimentos desayuno
    const listaAlimentosDesayuno=[{ nombre: "1 Pan Integral (Harina)", tipoalimento: "Harina", calorias: "100" },
    { nombre: "1 Tortilla de harina (Harina)", tipoalimento: "Harina", calorias: "80" },
    { nombre: "Arepas de maiz (Harina)", tipoalimento: "Harina", calorias: "150" },
    { nombre: "Huevos (Proteinas)", tipoalimento: "Proteinas", calorias: "70" },
    { nombre: "Yogurt griego (Proteinas)", tipoalimento: "Proteinas", calorias: "120" },
    { nombre: "tofu (Proteinas)", tipoalimento: "Proteinas", calorias: "90" },
    { nombre: "Frutos secos (Proteinas)", tipoalimento: "Proteinas", calorias: "160" },
    { nombre: "Leche de vaca (Proteinas)", tipoalimento: "Proteinas", calorias: "90" },
    { nombre: "Leche de soya (Proteinas)", tipoalimento: "Proteinas", calorias: "100" },
    { nombre: "aceite de oliva (Grasa)", tipoalimento: "Grasa", calorias: "120" },
    { nombre: "aguacate (Grasa)", tipoalimento: "Grasa", calorias: "160" }
  ];


  // debo agregar un evento al boton de enviar de los alimentos del desayuno
  // obtener el boton de enviar alimentos desayuno
  const botonDeListaAlimentosDesayuno=document.getElementById("botonAlimentosDesayuno");

  // agrego el evento al boton
  botonDeListaAlimentosDesayuno.addEventListener("click",function(event){
    event.preventDefault();

    // al hacer click quiero que traiga el alimento que está en el select, la opcion de desayuno
    let alimentoDesayunoSeleccionado=document.getElementById("preguntaOpcionesDesayuno").value;

    


    let objetoAlimentoDesayuno=[];
    // comparo en el array cual objeto tiene ese alimento
    listaAlimentosDesayuno.forEach(item=>{
        if(item.nombre==alimentoDesayunoSeleccionado){
            // mi idea es que aqui se recupere el objeto y se busque del objeto las calorias 
            // le envio el objeto que cumple con las caracteristicas al array objetoAlimentoDesayuno
            objetoAlimentoDesayuno.push(item);
        }
    });
        // debo sacar las calorias almacenadas en el objeto y sumarlas a una variable de suma de calorias de desayuno, esta variable debe tener un if para asegurarse que no se pase de cierto valor

        // hago el if que me deja sumar las calorias del alimento que ingrese, si no se ha alcanzado la cantidad de calorias establecida para el desayuno
        // esto indica que el desayuno no puede ser mayor del 20% del TDEE
        let caloriasMaximasDesayuno=TDEE*0.20;

        if(caloriasDesayuno<caloriasMaximasDesayuno){
            // traigo al objeto alimento desayuno que está en el array y le asigno el valor de las calorias a una variable
            let caloriasEspecificasAlimentoDesayuno=parseInt(objetoAlimentoDesayuno[0].calorias);
            

            console.log("Las calorias especificas del alimento son:");
            console.log(caloriasEspecificasAlimentoDesayuno);
            console.log("Las calorias desayuno son");
            console.log(caloriasDesayuno);



            // le sumo el valor de las calorias del alimento al contador de calorias de desayuno
            caloriasDesayuno=caloriasDesayuno+caloriasEspecificasAlimentoDesayuno;

            // reseteo el objetoAlimentoDesayuno para que no contenga nada otravez y pueda acumular un nuevo alimento
            objetoAlimentoDesayuno=[];
        }
        else if(caloriasDesayuno>=caloriasMaximasDesayuno){
            // en el caso que se haya alcanzado las calorias maximas del desayuno
            // reseteo el objetoAlimentoDesayuno para que no contenga nada otravez y pueda acumular un nuevo
            objetoAlimentoDesayuno=[];

            // aparece una alert para indicar que ya se tiene las calorias del desayuno
            alert(`Ya has alcanzado la cantidad de calorias recomendada para esta comida`)
            alert(`Las calorias de tu desayuno son: ${caloriasDesayuno}`)

            console.log("Las calorias finales  de desayuno son");
            console.log(caloriasDesayuno);





        }
    
  })
}
