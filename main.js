
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Calculadora de calorias diarias gastadas

// Declaro TDEE y variables globales
var TDEE, nombre, edad, estatura, peso, sexo, ejercicio, IndiceMasaCorporal;

// declaro variable que lleva el conteo de calorias del desayuno
let caloriasDesayuno = 0;

// declaro variable que lleva el conteo de calorias media mañana;
let caloriasMediaMañana = 0;

// declaro variable que lleva el conteo de calorias Almuerzo;
let caloriasAlmuerzo = 0;

// declaro variable que lleva el conteo de calorias media Tarde;
let caloriasMediaTarde = 0;

// declaro variable que lleva el conteo de calorias media Tarde;
let caloriasCena = 0;

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
function IMC(peso, estatura) {
    IndiceMasaCorporal = (peso) / (estatura * estatura)
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
        localStorage.setItem("TDEE", TDEE)
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
    const parrafoDeficitCalorico = document.getElementById("deficitCalorico");
    // obtengo el p para mostrar las calorias que se consumirán
    const parrafoCaloriasDietaBajarPeso = document.getElementById("caloriasConsumirDieta");

    // calculo el indice de masa corporal llamando a la funcion que lo calcula
    const indiceMasaCorporal = IMC(peso, estatura);

    let deficitCalorico;

    // llamamos el valor del TDEE del local storage
    TDEE = localStorage.getItem("TDEE");
    // tomo una accion u otra dependiendo de que resultado de indice de masa corporal se obtiene
    if (indiceMasaCorporal < 22) {
        deficitCalorico = 0;
        parrafoCaloriasDietaBajarPeso.textContent = "No es recomendable que bajes de peso";
    } else {
        deficitCalorico = 350;
        parrafoCaloriasDietaBajarPeso.textContent = `${TDEE - deficitCalorico} calorías`;
    }
    // le asigno el valor del deficit calorico al parrafo que muestra el deficit calorico
    parrafoDeficitCalorico.textContent = `El déficit calórico que vamos a manejar será de: ${deficitCalorico} calorias`;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // DESAYUNOS

    // debo crear un array de objetos que tenga la lista de alimentos en el desayuno y use el metodo find para comparar cual es el nombre del alimento ingresdao en el html y sacar el valor de las calorias del objeto

    // crear el array de objetos alimentos desayuno
    const listaAlimentosDesayuno = [{ nombre: "1 Pan Integral (Harina)", tipoalimento: "Harina", calorias: "100" },
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

    // creo el array que irá almacenando los objetos seleccionados por el usuario para imprimirlos al final como la dieta
    let listaAlimentosDesayunoAgregadosUsuario = [];

    // debo agregar un evento al boton de enviar de los alimentos del desayuno
    // obtener el boton de enviar alimentos desayuno
    const botonDeListaAlimentosDesayuno = document.getElementById("botonAlimentosDesayuno");

    // agrego el evento al boton
    botonDeListaAlimentosDesayuno.addEventListener("click", function (event) {
        event.preventDefault();

        // al hacer click quiero que traiga el alimento que está en el select, la opcion de desayuno
        let alimentoDesayunoSeleccionado = document.getElementById("preguntaOpcionesDesayuno").value;




        let objetoAlimentoDesayuno = [];
        // comparo en el array cual objeto tiene ese alimento
        listaAlimentosDesayuno.forEach(item => {
            if (item.nombre == alimentoDesayunoSeleccionado) {
                // mi idea es que aqui se recupere el objeto y se busque del objeto las calorias 
                // le envio el objeto que cumple con las caracteristicas al array objetoAlimentoDesayuno
                objetoAlimentoDesayuno.push(item);

                // le envio el objeto que cumple con los datos del nombre del alimento ingresado en el html al array de objetos que servirá como lista final de la dieta desayuno
                listaAlimentosDesayunoAgregadosUsuario.push(item);
            }
        });
        // debo sacar las calorias almacenadas en el objeto y sumarlas a una variable de suma de calorias de desayuno, esta variable debe tener un if para asegurarse que no se pase de cierto valor

        // hago el if que me deja sumar las calorias del alimento que ingrese, si no se ha alcanzado la cantidad de calorias establecida para el desayuno
        // esto indica que el desayuno no puede ser mayor del 20% del TDEE
        let caloriasMaximasDesayuno = TDEE * 0.20;

        if (caloriasDesayuno < caloriasMaximasDesayuno) {
            // traigo al objeto alimento desayuno que está en el array y le asigno el valor de las calorias a una variable
            let caloriasEspecificasAlimentoDesayuno = parseInt(objetoAlimentoDesayuno[0].calorias);

            // le sumo el valor de las calorias del alimento al contador de calorias de desayuno
            caloriasDesayuno = caloriasDesayuno + caloriasEspecificasAlimentoDesayuno;

            // Muestro una alerta que me diga cuanto llevo de calorias acumuladas
            alert(`¡Llevas ${caloriasDesayuno} calorias de desayuno!`)

            // reseteo el objetoAlimentoDesayuno para que no contenga nada otravez y pueda acumular un nuevo alimento
            objetoAlimentoDesayuno = [];
        }
        else if (caloriasDesayuno >= caloriasMaximasDesayuno) {
            // en el caso que se haya alcanzado las calorias maximas del desayuno
            // reseteo el objetoAlimentoDesayuno para que no contenga nada otravez y pueda acumular un nuevo
            objetoAlimentoDesayuno = [];

            // aparece una alert para indicar que ya se tiene las calorias del desayuno
            alert(`Ya has alcanzado la cantidad de calorias recomendada para esta comida`)
            alert(`Las calorias de tu desayuno son: ${caloriasDesayuno}`)
        }

    })


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // MEDIA MAÑANA

    // creo el vector de objetos que contiene los datos de los alimentos a elegir en la media mañana
    const listaAlimentosMediaMañana = [{
        nombre: "1 Pan Integral (Harina)",
        tipoalimento: "Harina",
        calorias: 100
    },
    {
        nombre: "Porción de Fruta",
        tipoalimento: "Fruta",
        calorias: 50
    },
    {
        nombre: "Yogurt Griego",
        tipoalimento: "Proteina",
        calorias: 120
    },
    {
        nombre: "Frutos Secos",
        tipoalimento: "Proteina",
        calorias: 150
    },
    {
        nombre: "3 Galletas Integrales",
        tipoalimento: "Harina",
        calorias: 80
    }]


    // creo el array que irá almacenando los objetos seleccionados por el usuario para imprimirlos al final como la dieta
    let listaAlimentosMediaMañanaAgregadosUsuario = [];

    // debo agregar un evento al boton de enviar de los alimentos del desayuno
    // obtener el boton de enviar alimentos desayuno
    const botonDeListaAlimentosMediaMañana = document.getElementById("botonAlimentosMediaMañana");


    // agrego el evento al boton
    botonDeListaAlimentosMediaMañana.addEventListener("click", function (event) {
        // previene que el formulario recargue la pagina
        event.preventDefault();

        // al hacer click quiero que traiga el alimento que está en el select, la opcion de media Mañana
        let alimentoMediaMañanaSeleccionado = document.getElementById("preguntaOpcionesMediaMañana").value;

        let objetoAlimentoMediaMañana = [];
        // comparo en el array cual objeto tiene ese alimento
        listaAlimentosMediaMañana.forEach(item => {
            if (item.nombre == alimentoMediaMañanaSeleccionado) {
                // mi idea es que aqui se recupere el objeto y se busque del objeto las calorias 
                // le envio el objeto que cumple con las caracteristicas al array objetoAlimentoMediaMañana
                objetoAlimentoMediaMañana.push(item);

                // le envio el objeto que cumple con los datos del nombre del alimento ingresado en el html al array de objetos que servirá como lista final de la dieta media mañana
                listaAlimentosMediaMañanaAgregadosUsuario.push(item);
            }
        });

        // debo sacar las calorias almacenadas en el objeto y sumarlas a una variable de suma de calorias de media mañana, esta variable debe tener un if para asegurarse que no se pase de cierto valor

        // hago el if que me deja sumar las calorias del alimento que ingrese, si no se ha alcanzado la cantidad de calorias establecida para la media mañana
        // esto indica que la media mañana no puede ser mayor del 15% del TDEE
        let caloriasMaximasMediaMañana = TDEE * 0.15;

        if (caloriasMediaMañana < caloriasMaximasMediaMañana) {
            // traigo al objeto alimento media mañana que está en el array y le asigno el valor de las calorias a una variable
            let caloriasEspecificasAlimentoMediaMañana = parseInt(objetoAlimentoMediaMañana[0].calorias);

            // le sumo el valor de las calorias del alimento al contador de calorias de media mañana
            caloriasMediaMañana = caloriasMediaMañana + caloriasEspecificasAlimentoMediaMañana;

            // Muestro una alerta que me diga cuanto llevo de calorias acumuladas
            alert(`¡Llevas ${caloriasMediaMañana} calorias de media mañana!`)

            // reseteo el objetoAlimentoDesayuno para que no contenga nada otravez y pueda acumular un nuevo alimento
            objetoAlimentoMediaMañana = [];
        }
        else if (caloriasMediaMañana >= caloriasMaximasMediaMañana) {
            // en el caso que se haya alcanzado las calorias maximas de la media mañana
            // reseteo el objetoAlimentoMediaMañana para que no contenga nada otravez y pueda acumular un nuevo
            objetoAlimentoMediaMañana = [];

            // aparece una alert para indicar que ya se tiene las calorias del desayuno
            alert(`Ya has alcanzado la cantidad de calorias recomendada para esta comida`)
            alert(`Las calorias de tu media mañana son: ${caloriasMediaMañana}`)
        }
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // ALMUERZO

    // creo el vector de objetos que contiene los alimentos a alegir de almuerzo
    const listaAlimentosAlmuerzo = [
        {
            nombre: "Porción de Pollo",
            tipoalimento: "Proteína",
            calorias: 200
        },
        {
            nombre: "Porción de Carne de Res",
            tipoalimento: "Proteína",
            calorias: 250
        },
        {
            nombre: "Porción de Carne de Cerdo",
            tipoalimento: "Proteína",
            calorias: 300
        },
        {
            nombre: "Porción de Papa Asada",
            tipoalimento: "Harina",
            calorias: 150
        },
        {
            nombre: "Porción de Arroz",
            tipoalimento: "Harina",
            calorias: 180
        },
        {
            nombre: "Porción de Ensalada de Lechuga con Zanahoria",
            tipoalimento: "Vegetal",
            calorias: 50
        },
        {
            nombre: "Porción de Ensalada de Tomate con Cebolla",
            tipoalimento: "Vegetal",
            calorias: 60
        },
        {
            nombre: "Porción de Lentejas",
            tipoalimento: "Proteina",
            calorias: 120
        },
        {
            nombre: "Porción de Plátanos Fritos",
            tipoalimento: "Harina",
            calorias: 160
        },
        {
            nombre: "Sopa de Frijoles",
            tipoalimento: "Proteina",
            calorias: 100
        },
        {
            nombre: "Sopa de Avena",
            tipoalimento: "Harina",
            calorias: 80
        },
        {
            nombre: "Sopa de Maíz",
            tipoalimento: "Harina",
            calorias: 90
        },
        {
            nombre: "Porción de Pasta",
            tipoalimento: "Harina",
            calorias: 200
        },
        {
            nombre: "Porción de Tofu",
            tipoalimento: "Proteína",
            calorias: 150
        },
        {
            nombre: "Porción de Proteína de Soya",
            tipoalimento: "Proteína",
            calorias: 180
        },
        {
            nombre: "Porción de Salmón",
            tipoalimento: "Proteína",
            calorias: 220
        },
        {
            nombre: "Porción de Ensalada Mixta",
            tipoalimento: "Vegetal",
            calorias: 70
        }
    ];

    // Creo el array que irá almacenando los objetos seleccionados por el usuario para imprimirlos al final como la dieta
    let listaAlimentosAlmuerzoAgregadosUsuario = [];

    // Debo agregar un evento al botón de enviar de los alimentos del almuerzo
    // Obtener el botón de enviar alimentos del almuerzo
    const botonDeListaAlimentosAlmuerzo = document.getElementById("botonAlimentosAlmuerzo");

    // Agrego el evento al botón
    botonDeListaAlimentosAlmuerzo.addEventListener("click", function (event) {
        // Previene que el formulario recargue la página
        event.preventDefault();

        // Al hacer clic quiero que traiga el alimento que está en el select, la opción de Almuerzo
        let alimentoAlmuerzoSeleccionado = document.getElementById("preguntaOpcionesAlmuerzo").value;

        let objetoAlimentoAlmuerzo = [];
        // Comparo en el array cuál objeto tiene ese alimento
        listaAlimentosAlmuerzo.forEach((item) => {
            if (item.nombre == alimentoAlmuerzoSeleccionado) {
                // Envío el objeto que cumple con las características al array objetoAlimentoAlmuerzo
                objetoAlimentoAlmuerzo.push(item);

                // Envío el objeto que cumple con los datos del nombre del alimento ingresado en el HTML al array de objetos que servirá como lista final de la dieta de Almuerzo
                listaAlimentosAlmuerzoAgregadosUsuario.push(item);
            }
        });

        // Debo sacar las calorías almacenadas en el objeto y sumarlas a una variable de suma de calorías de Almuerzo, esta variable debe tener un if para asegurarse de que no se pase de cierto valor

        // Hago el if que me permite sumar las calorías del alimento que ingresé, si no se ha alcanzado la cantidad de calorías establecida para el Almuerzo
        // Esto indica que el Almuerzo no puede ser mayor al 40% del TDEE
        let caloriasMaximasAlmuerzo = TDEE * 0.3;

        if (caloriasAlmuerzo < caloriasMaximasAlmuerzo) {
            // Traigo el objeto de Alimento del Almuerzo que está en el array y le asigno el valor de las calorías a una variable
            let caloriasEspecificasAlimentoAlmuerzo = parseInt(objetoAlimentoAlmuerzo[0].calorias);

            // Sumo el valor de las calorías del alimento al contador de calorías del Almuerzo
            caloriasAlmuerzo = caloriasAlmuerzo + caloriasEspecificasAlimentoAlmuerzo;

            // Muestro una alerta que me indique cuántas calorías se llevan acumuladas
            alert(`¡Llevas ${caloriasAlmuerzo} calorías de Almuerzo!`);

            // Reseteo el objetoAlimentoAlmuerzo para que no contenga nada y pueda acumular un nuevo alimento
            objetoAlimentoAlmuerzo = [];
        } else if (caloriasAlmuerzo >= caloriasMaximasAlmuerzo) {
            // En caso de que se haya alcanzado el límite máximo de calorías para el Almuerzo
            // Reseteo el objetoAlimentoAlmuerzo para que no contenga nada y pueda acumular un nuevo alimento
            objetoAlimentoAlmuerzo = [];

            // Muestro una alerta indicando que ya se ha alcanzado la cantidad recomendada de calorías para esta comida
            alert(`Ya has alcanzado la cantidad de calorías recomendada para esta comida.`);
            alert(`Las calorías de tu Almuerzo son: ${caloriasAlmuerzo}`);
        }
    });


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MEDIA TARDE
    // creo el vector de objetos que tiene la lista de objetos de alimentos a legir de media tarde

    const listaAlimentosMediaTarde = [{
        nombre: "Yogurt Griego",
        tipoalimento: "Proteina",
        calorias: 150
    },
    {
        nombre: "Pan Integral",
        tipoalimento: "Harina",
        calorias: 100
    },
    {
        nombre: "Leche de Soya",
        tipoalimento: "Proteina",
        calorias: 90
    },
    {
        nombre: "Cuajada",
        tipoalimento: "Proteina",
        calorias: 80
    },
    {
        nombre: "Porción de Fruta",
        tipoalimento: "Fruta",
        calorias: 50
    },
    {
        nombre: "Galletas Integrales",
        tipoalimento: "Harina",
        calorias: 70
    },
    {
        nombre: "Frutos Secos",
        tipoalimento: "Proteina",
        calorias: 200
    }];

    // Creo el array que irá almacenando los objetos seleccionados por el usuario para imprimirlos al final como la dieta
    let listaAlimentosMediaTardeAgregadosUsuario = [];

    // Debo agregar un evento al botón de enviar de los alimentos de la media tarde
    // Obtener el botón de enviar alimentos de la media tarde
    const botonDeListaAlimentosMediaTarde = document.getElementById("botonAlimentosMediaTarde");

    // Agrego el evento al botón
    botonDeListaAlimentosMediaTarde.addEventListener("click", function (event) {
        // Previene que el formulario recargue la página
        event.preventDefault();

        // Al hacer clic quiero que traiga el alimento que está en el select, la opción de MediaTarde
        let alimentoMediaTardeSeleccionado = document.getElementById("preguntaOpcionesMediaTarde").value;

        let objetoAlimentoMediaTarde = [];
        // Comparo en el array cuál objeto tiene ese alimento
        listaAlimentosMediaTarde.forEach((item) => {
            if (item.nombre == alimentoMediaTardeSeleccionado) {
                // Envío el objeto que cumple con las características al array objetoAlimentoMediaTarde
                objetoAlimentoMediaTarde.push(item);

                // Envío el objeto que cumple con los datos del nombre del alimento ingresado en el HTML al array de objetos que servirá como lista final de la dieta de MediaTarde
                listaAlimentosMediaTardeAgregadosUsuario.push(item);
            }
        });

        // Debo sacar las calorías almacenadas en el objeto y sumarlas a una variable de suma de calorías de MediaTarde, esta variable debe tener un if para asegurarse de que no se pase de cierto valor

        // Hago el if que me permite sumar las calorías del alimento que ingresé, si no se ha alcanzado la cantidad de calorías establecida para la MediaTarde
        // Esto indica que la MediaTarde no puede ser mayor al 40% del TDEE
        let caloriasMaximasMediaTarde = TDEE * 0.15;

        if (caloriasMediaTarde < caloriasMaximasMediaTarde) {
            // Traigo el objeto de Alimento de MediaTarde que está en el array y le asigno el valor de las calorías a una variable
            let caloriasEspecificasAlimentoMediaTarde = parseInt(objetoAlimentoMediaTarde[0].calorias);

            // Sumo el valor de las calorías del alimento al contador de calorías de MediaTarde
            caloriasMediaTarde = caloriasMediaTarde + caloriasEspecificasAlimentoMediaTarde;

            // Muestro una alerta que me indique cuántas calorías se llevan acumuladas
            alert(`¡Llevas ${caloriasMediaTarde} calorías de MediaTarde!`);

            // Reseteo el objetoAlimentoMediaTarde para que no contenga nada y pueda acumular un nuevo alimento
            objetoAlimentoMediaTarde = [];
        } else if (caloriasMediaTarde >= caloriasMaximasMediaTarde) {
            // En caso de que se haya alcanzado el límite máximo de calorías para la MediaTarde
            // Reseteo el objetoAlimentoMediaTarde para que no contenga nada y pueda acumular un nuevo alimento
            objetoAlimentoMediaTarde = [];

            // Muestro una alerta indicando que ya se ha alcanzado la cantidad recomendada de calorías para esta comida
            alert(`Ya has alcanzado la cantidad de calorías recomendada para esta comida.`);
            alert(`Las calorías de tu MediaTarde son: ${caloriasMediaTarde}`);
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CENA
    const listaAlimentosCena = [
        {
            nombre: "Porción de Pollo",
            tipoalimento: "Proteína",
            calorias: 200
        },
        {
            nombre: "Porción de Carne de Res",
            tipoalimento: "Proteína",
            calorias: 250
        },
        {
            nombre: "Porción de Carne de Cerdo",
            tipoalimento: "Proteína",
            calorias: 300
        },
        {
            nombre: "Porción de Papa Asada",
            tipoalimento: "Harina",
            calorias: 150
        },
        {
            nombre: "Porción de Arroz",
            tipoalimento: "Harina",
            calorias: 180
        },
        {
            nombre: "Porción de Ensalada de Lechuga con Zanahoria",
            tipoalimento: "Vegetal",
            calorias: 50
        },
        {
            nombre: "Porción de Ensalada de Tomate con Cebolla",
            tipoalimento: "Vegetal",
            calorias: 60
        },
        {
            nombre: "Porción de Lentejas",
            tipoalimento: "Proteina",
            calorias: 120
        },
        {
            nombre: "Porción de Plátanos Fritos",
            tipoalimento: "Harina",
            calorias: 160
        },
        {
            nombre: "Sopa de Frijoles",
            tipoalimento: "Proteina",
            calorias: 100
        },
        {
            nombre: "Sopa de Avena",
            tipoalimento: "Harina",
            calorias: 80
        },
        {
            nombre: "Sopa de Maíz",
            tipoalimento: "Harina",
            calorias: 90
        },
        {
            nombre: "Porción de Pasta",
            tipoalimento: "Harina",
            calorias: 200
        },
        {
            nombre: "Porción de Tofu",
            tipoalimento: "Proteína",
            calorias: 150
        },
        {
            nombre: "Porción de Proteína de Soya",
            tipoalimento: "Proteína",
            calorias: 180
        },
        {
            nombre: "Porción de Salmón",
            tipoalimento: "Proteína",
            calorias: 220
        },
        {
            nombre: "Porción de Ensalada Mixta",
            tipoalimento: "Vegetal",
            calorias: 70
        }
    ];

    // Creo el array que irá almacenando los objetos seleccionados por el usuario para imprimirlos al final como la dieta
    let listaAlimentosCenaAgregadosUsuario = [];

    // Debo agregar un evento al botón de enviar de los alimentos de la cena
    // Obtener el botón de enviar alimentos de la cena
    const botonDeListaAlimentosCena = document.getElementById("botonAlimentosCena");

    // Agrego el evento al botón
    botonDeListaAlimentosCena.addEventListener("click", function (event) {
        // Previene que el formulario recargue la página
        event.preventDefault();

        // Al hacer clic quiero que traiga el alimento que está en el select, la opción de Cena
        let alimentoCenaSeleccionado = document.getElementById("preguntaOpcionesCena").value;

        let objetoAlimentoCena = [];
        // Comparo en el array cuál objeto tiene ese alimento
        listaAlimentosCena.forEach((item) => {
            if (item.nombre == alimentoCenaSeleccionado) {
                // Envío el objeto que cumple con las características al array objetoAlimentoCena
                objetoAlimentoCena.push(item);

                // Envío el objeto que cumple con los datos del nombre del alimento ingresado en el HTML al array de objetos que servirá como lista final de la dieta de Cena
                listaAlimentosCenaAgregadosUsuario.push(item);
            }
        });

        // Debo sacar las calorías almacenadas en el objeto y sumarlas a una variable de suma de calorías de Cena, esta variable debe tener un if para asegurarse de que no se pase de cierto valor

        // Hago el if que me permite sumar las calorías del alimento que ingresé, si no se ha alcanzado la cantidad de calorías establecida para la Cena
        // Esto indica que la Cena no puede ser mayor al 40% del TDEE
        let caloriasMaximasCena = TDEE * 0.3;

        if (caloriasCena < caloriasMaximasCena) {
            // Traigo el objeto de Alimento de Cena que está en el array y le asigno el valor de las calorías a una variable
            let caloriasEspecificasAlimentoCena = parseInt(objetoAlimentoCena[0].calorias);

            // Sumo el valor de las calorías del alimento al contador de calorías de Cena
            caloriasCena = caloriasCena + caloriasEspecificasAlimentoCena;

            // Muestro una alerta que me indique cuántas calorías se llevan acumuladas
            alert(`¡Llevas ${caloriasCena} calorías de Cena!`);

            // Reseteo el objetoAlimentoCena para que no contenga nada y pueda acumular un nuevo alimento
            objetoAlimentoCena = [];
        } else if (caloriasCena >= caloriasMaximasCena) {
            // En caso de que se haya alcanzado el límite máximo de calorías para la Cena
            // Reseteo el objetoAlimentoCena para que no contenga nada y pueda acumular un nuevo alimento
            objetoAlimentoCena = [];

            // Muestro una alerta indicando que ya se ha alcanzado la cantidad recomendada de calorías para esta comida
            alert(`Ya has alcanzado la cantidad de calorías recomendada para esta comida.`);
            alert(`Las calorías de tu Cena son: ${caloriasCena}`);
        }
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // DEBO MOSTRAR LA DIETA HECHA POR EL USUARIO
    // hay 5 vectores de objetos con los alimentos agregados por el usuario, debo mostrarlos por pantalla

    // obtengo el boton de mostrar dieta del html
    const btnMostrarDieta = document.getElementById("botonMostrarDieta");
    // agrego un evento para que se empiecen a mostrar los alimentos 
    btnMostrarDieta.addEventListener("click", function (event) {
        // crear un div con una clase oculta que se revele cuando oprima el boton, luego mostrar los datos en ese div
        // obtengo el div con la clase oculta
        const divMostrarDieta = document.getElementById("divMostrarDieta");
        // remover la clase "oculta"
        divMostrarDieta.classList.remove("oculto");

        // ahora traigo las etiquetas p del html para ahi colocar los nombres de los alimentos seleccionados por el usuario
        const pAlimentosDesayuno=document.getElementById("pAlimentosDesayuno");
        

        pAlimentosDesayuno.textContent=(`Tus alimentos de desayuno son: `)

      

    })







    // este es el if de pagina bajar peso
}
