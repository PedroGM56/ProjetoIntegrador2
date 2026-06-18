const API_BASE = "http://localhost:3000/dashboard/Pressao";
const API_MAQUINAS = "http://localhost:3000/dashboard/maquinas";


let maquinaSelecionada = "";


Chart.register(ChartDataLabels);

Chart.defaults.color = "white";

Chart.defaults.scale.grid.color =
'rgba(255,255,255,0.07)';





// ============================
// CARREGAR MÁQUINAS
// ============================


async function carregarMaquinas(){


    try{


        const resposta =
        await fetch(API_MAQUINAS);


        const maquinas =
        await resposta.json();



        const select =
        document.getElementById("filtroMaquina");



        maquinas.forEach(maquina=>{


            let option =
            document.createElement("option");


            option.value =
            maquina.id_equipamento;


            option.textContent =
            maquina.nome_equipamento;


            select.appendChild(option);


        });



    }
    catch(erro){

        console.log(
            "Erro ao carregar máquinas:",
            erro
        );

    }


}







// ============================
// FILTRO
// ============================


document
.getElementById("filtroMaquina")
.addEventListener(
"change",
function(){


    maquinaSelecionada =
    this.value;



    carregarDados();


});








// ============================
// CARREGAR DADOS
// ============================


async function carregarDados(){


    try{


        let url =
        API_BASE;



        if(maquinaSelecionada){

            url += 
            `?id=${maquinaSelecionada}`;

        }



        const resposta =
        await fetch(url);



        const dados =
        await resposta.json();



        console.log(dados);




        // CARDS


        document.getElementById("totalEquipamentos").innerHTML =
        dados.cards[0].equipamentos ?? 0;



        document.getElementById("totalSensores").innerHTML =
        dados.cards[0].sensores ?? 0;



        document.getElementById("totalAlertas").innerHTML =
        dados.cards[0].alertas ?? 0;



        document.getElementById("totalCriticos").innerHTML =
        dados.cards[0].criticos ?? 0;




        // GRÁFICOS


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








// ============================
// GRÁFICO LINHA
// ============================


function graficoPressao(dados){


    new Chart(

        document.getElementById(
            "graficoTemperatura"
        ),

        {


        type:"line",


        data:{


            labels:

            dados.map(
                item=>formatarData(item.data)
            ),



            datasets:[{


                label:"Vibração",



                data:

                dados.map(
                    item=>
                    Number(
                        Number(item.valor)
                        .toFixed(2)
                    )
                ),



                borderWidth:2,


                tension:0.3,


                pointRadius:3,



                borderColor:"#9b59ff",



                backgroundColor:
                "rgba(155,89,255,0.2)"


            }]


        },



        options:{


            responsive:false,


            plugins:{


                legend:{


                    display:true


                }


            },



            scales:{


                x:{


                    ticks:{


                        maxTicksLimit:8


                    }


                }


            }


        }



        }

    );


}









// ============================
// GRÁFICO ALERTAS
// ============================


function graficoAlertas(dados){


    dados =
    dados.filter(item=>

        item.nivel_alerta !== null &&
        item.nivel_alerta !== ""

    );



    new Chart(


        document.getElementById(
            "graficoAlertas"
        ),



        {


        type:"pie",



        data:{


            labels:

            dados.map(
                item=>item.nivel_alerta
            ),



            datasets:[{


                data:

                dados.map(
                    item=>item.quantidade
                ),



                borderWidth:1,



                backgroundColor:[

                    "#22c55e",
                    "#f59e0b",
                    "#ef4444"

                ]


            }]


        },



        options:{


            responsive:false,



            plugins:{


                legend:{


                    display:true


                },



                datalabels:{


                    color:"white",



                    font:{


                        size:16,


                        weight:"bold"


                    },



                    formatter(valor){


                        return valor;


                    }


                }


            }


        }



        }


    );


}









// ============================
// MÉDIA EQUIPAMENTO
// ============================


function graficoMedia(dados){


    new Chart(


        document.getElementById(
            "graficoMedia"
        ),


        {


        type:"bar",



        data:{


            labels:

            dados.map(
                item=>item.nome_equipamento
            ),



            datasets:[{


                label:"Média Vibração",



                data:

                dados.map(

                    item=>

                    Number(
                        Number(item.media)
                        .toFixed(2)
                    )

                ),



                backgroundColor:"rgba(249,115,22,0.8)",



                borderWidth:1


            }]


        },



        options:{


            responsive:false


        }



        }


    );


}









// ============================
// STATUS EQUIPAMENTOS
// ============================


function graficoEquipamentos(dados){


    new Chart(


        document.getElementById(
            "graficoEquipamentos"
        ),


        {


        type:"doughnut",



        data:{


            labels:

            dados.map(
                item=>item.status_equipamento
            ),



            datasets:[{


                data:

                dados.map(
                    item=>item.quantidade
                ),



                backgroundColor:[

                    "#22c55e",
                    "#64748b",
                    "#f97316"

                ],



                borderWidth:1


            }]


        },



        options:{


            responsive:false


        }



        }


    );


}







// ============================
// FORMATAR DATA
// ============================


function formatarData(data){


    const d =
    new Date(data);



    return d.toLocaleDateString(
        "pt-BR",
        {

            day:"2-digit",

            month:"short"

        }

    );


}







// ============================
// INICIALIZAÇÃO
// ============================


carregarMaquinas();

carregarDados();