const API = "http://localhost:3000/dashboard/home";
const API_MAQUINAS = "http://localhost:3000/dashboard/maquinas";
let maquinaSelecionada="";

Chart.register(ChartDataLabels);

Chart.defaults.color = "white";

Chart.defaults.scale.grid.color =
'rgba(255,255,255,0.07)';

async function carregarHome(){

    try{

        const resposta = await fetch(API);

        const dados = await resposta.json();

        console.log(dados);

        document.getElementById("totalEquipamentos").innerHTML =
        dados.cards[0].equipamentos ?? 0;

        document.getElementById("totalSensores").innerHTML =
        dados.cards[0].sensores ?? 0;

        document.getElementById("totalAlertas").innerHTML =
        dados.cards[0].alertas ?? 0;

        document.getElementById("totalCriticos").innerHTML =
        dados.cards[0].criticos ?? 0;

        graficoStatus(
            dados.statusEquipamentos
        );


        graficoAlertas(
            dados.alertasSensor
        );


        carregarTabela(
            dados.ultimosEventos
        );

    }

    catch(erro){

        console.log(
            "Erro:",
            erro
        );

    }

}

function graficoStatus(dados){

    new Chart(

        document.getElementById("graficoStatus"),

        {
        type:"doughnut",

        data:{

            labels:
            dados.map(item =>
                item.status_equipamento
            ),

            datasets:[{

                data:

                dados.map(item =>
                    item.quantidade
                ),
                backgroundColor:[

                    "#22c55e",
                    "#ef4444",
                    "#f59e0b"

                ],
                borderWidth:1
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
                        weight:"bold",
                        size:16

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

function graficoAlertas(dados){

    new Chart(

        document.getElementById("graficoAlertas"),
        {
        type:"bar",

        data:{

            labels:

            dados.map(item=>
                item.nome_tipo
            ),

            datasets:[{

                label:"Quantidade de alertas",

                data:

                dados.map(item=>
                    item.quantidade
                ),

                backgroundColor:"rgba(249,115,22,0.8)",
                borderWidth:1

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
                    anchor:"end",
                    align:"top",

                    font:{
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


function carregarTabela(dados){


    const tabela =
    document.querySelector("#tabelaEventos tbody");

    tabela.innerHTML="";

    dados.forEach(item=>{


        let data = new Date(
            item.data_hora_inicio
        );


        let dataFormatada =
        data.toLocaleString("pt-BR");

        tabela.innerHTML += `


        <tr>


            <td>
                ${item.nome_equipamento}
            </td>


            <td>
                ${item.nome_tipo}
            </td>


            <td>
                ${item.nivel_alerta}
            </td>


            <td>
                ${dataFormatada}
            </td>


        </tr>


        `;

    });


}

async function carregarMaquinas(){


    const resposta =
    await fetch(API_MAQUINAS);
    
    
    const maquinas =
    await resposta.json();
    
    
    
    const select =
    document.getElementById(
    "filtroMaquina"
    );
    
    
    
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

carregarHome();