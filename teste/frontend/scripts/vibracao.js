const API = "http://localhost:3000/dashboard/Vibracao";

Chart.defaults.color = 'white';
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.07)';

async function carregarDados(){

    try {

        const resposta = await fetch(API);

        const dados = await resposta.json();

        console.log(dados);

//Cards

        document.getElementById("totalEquipamentos").innerHTML =
        dados.cards[0].equipamentos ?? 0;

        document.getElementById("totalSensores").innerHTML =
        dados.cards[0].sensores ?? 0;

        document.getElementById("totalAlertas").innerHTML =
        dados.cards[0].alertas ?? 0;

        document.getElementById("totalCriticos").innerHTML =
        dados.cards[0].criticos ?? 0;

//Gráficos

        graficoPressao(
            dados.sensor
        );

        graficoAlertas(
            dados.alertas
        );

        graficoMedia(
            dados.media
        );

        graficoEquipamentos(
            dados.equipamentos
        );

    }

    catch(erro){

        console.log(
            "Erro ao carregar dados:",
            erro
        );

    }

}

//Gráfico Linha

function graficoPressao(dados){

    new Chart(

        document.getElementById("graficoTemperatura"),

        {

        type:"line",

        data:{

            labels:

            dados.map(item=>item.data),

            datasets:[{

                label:"Pressão",

                data:

                dados.map(item=>item.valor),

                borderWidth:2

            }]

        },

        options:{

            responsive:false

        }

        }

    );

}

//Gráfico Pizza

function graficoAlertas(dados){

    dados = dados.filter(item =>

        item.nivel_alerta !== null &&
        item.nivel_alerta !== ""

    );

    new Chart(

        document.getElementById("graficoAlertas"),

        {

        type:"pie",

        data:{

            labels:

            dados.map(item=>item.nivel_alerta),

            datasets:[{

                data:

                dados.map(item=>item.quantidade),

                borderWidth:1

            }]

        },

        options:{

            responsive:false

        }

        }

    );

}


//Gráfico Média

function graficoMedia(dados){

    new Chart(

        document.getElementById("graficoMedia"),

        {

        type:"bar",

        data:{

            labels:

            dados.map(item=>item.nome_equipamento),

            datasets:[{

                label:"Média Pressão",

                data:

                dados.map(item=>item.media),

                borderWidth:1

            }]

        },

        options:{
            responsive:false

        }

        }

    );

}

//Gráfico Status

function graficoEquipamentos(dados){

    new Chart(

        document.getElementById("graficoEquipamentos"),

        {

        type:"doughnut",

        data:{

            labels:

            dados.map(item=>item.status_equipamento),

            datasets:[{

                data:

                dados.map(item=>item.quantidade),

                borderWidth:1

            }]

        },

        options:{
            responsive:false

        }

        }

    );

}

carregarDados();