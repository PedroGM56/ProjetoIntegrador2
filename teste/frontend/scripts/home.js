const API = "http://localhost:3000/dashboard/home";


Chart.defaults.color = "white";

Chart.defaults.scale.grid.color =
'rgba(255,255,255,0.07)';




async function carregarHome(){


try{


const resposta = await fetch(API);


const dados = await resposta.json();


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







// ============================
// STATUS EQUIPAMENTOS
// ============================


function graficoStatus(dados){


new Chart(

document.getElementById("graficoStatus"),

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









// ============================
// ALERTAS POR SENSOR
// ============================


function graficoAlertas(dados){



new Chart(

document.getElementById("graficoAlertas"),

{


type:"bar",


data:{


labels:

dados.map(item=>item.nome_tipo),



datasets:[{


label:"Quantidade de alertas",


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









// ============================
// TABELA
// ============================


function carregarTabela(dados){


const tabela =
document.querySelector("#tabelaEventos tbody");



dados.forEach(item=>{


let linha = `


<tr>

<td>${item.nome_equipamento}</td>

<td>${item.nome_tipo}</td>

<td>${item.nivel_alerta}</td>

<td>${item.data_hora_inicio}</td>


</tr>


`;



tabela.innerHTML += linha;



});



}






carregarHome();