const API = "http://localhost:3000/dashboard/temperatura";

Chart.defaults.color = 'white';
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.07)';

async function carregarDados(){


    try {


        const resposta = await fetch(API);


        const dados = await resposta.json();


        console.log(dados);



        // ===========================
        // CARDS
        // ===========================


        document.getElementById("totalEquipamentos").innerHTML =
        dados.cards[0].equipamentos ?? 0;


        document.getElementById("totalSensores").innerHTML =
        dados.cards[0].sensores ?? 0;


        document.getElementById("totalAlertas").innerHTML =
        dados.cards[0].alertas ?? 0;


        document.getElementById("totalCriticos").innerHTML =
        dados.cards[0].criticos ?? 0;




        // ===========================
        // GRÁFICOS
        // ===========================


        graficoTemperatura(
            dados.temperatura
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







// =================================
// GRÁFICO LINHA TEMPERATURA
// =================================


function graficoTemperatura(dados){


    new Chart(

        document.getElementById("graficoTemperatura"),

        {

        type:"line",


        data:{


            labels:

            dados.map(item=>item.data),



            datasets:[{

                label:"Temperatura °C",


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








// =================================
// GRÁFICO PIZZA ALERTAS
// =================================


function graficoAlertas(dados){



    // remove valores nulos

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









// =================================
// GRÁFICO MÉDIA POR EQUIPAMENTO
// =================================


function graficoMedia(dados){



    new Chart(

        document.getElementById("graficoMedia"),

        {


        type:"bar",



        data:{


            labels:

            dados.map(item=>item.nome_equipamento),




            datasets:[{


                label:"Média Temperatura",



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









// =================================
// GRÁFICO STATUS EQUIPAMENTOS
// =================================


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