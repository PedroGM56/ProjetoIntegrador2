import { connection } from "../database/db.js";

// Executa consultas sem parâmetros
function executarConsultas(consultas, res) {

    let resultado = {};
    let finalizadas = 0;


    consultas.forEach(item => {

        connection.query(item.sql, (erro, dados) => {

            if (erro) {

                return res.status(500).json({
                    erro: erro.message
                });

            }


            resultado[item.nome] = dados;

            finalizadas++;


            if(finalizadas === consultas.length){

                res.json(resultado);

            }

        });

    });

}


// Executa consultas com parâmetros
function executarConsultasParametros(consultas,res){

    let resultado = {};
    let finalizadas = 0;


    consultas.forEach(item=>{


        connection.query(
            item.sql,
            item.valores,
            (erro,dados)=>{


                if(erro){

                    return res.status(500).json({
                        erro:erro.message
                    });

                }


                resultado[item.nome]=dados;


                finalizadas++;


                if(finalizadas === consultas.length){

                    res.json(resultado);

                }

            }

        );


    });


}



// ==========================
// HOME
// ==========================

export function dashboardHome(req,res){


const consultas=[


{

nome:"cards",

sql:`

SELECT


COUNT(DISTINCT e.id_equipamento) equipamentos,


COUNT(DISTINCT s.id_sensor) sensores,


COUNT(DISTINCT a.id_alerta) alertas,


COUNT(
DISTINCT CASE
WHEN a.nivel_alerta='Crítico'
THEN a.id_alerta
END
) criticos


FROM equipamento e


INNER JOIN sensor s

ON e.id_equipamento=s.fk_equipamento


LEFT JOIN leitura l

ON s.id_sensor=l.fk_sensor


LEFT JOIN alerta a

ON l.id_leitura=a.fk_leitura;


`

},



{

nome:"statusEquipamentos",

sql:`

SELECT


e.status_equipamento,


COUNT(DISTINCT e.id_equipamento) quantidade


FROM equipamento e


GROUP BY e.status_equipamento;


`

},



{

nome:"alertasSensor",

sql:`

SELECT


ts.nome_tipo,


COUNT(a.id_alerta) quantidade


FROM alerta a


INNER JOIN leitura l

ON a.fk_leitura=l.id_leitura


INNER JOIN sensor s

ON l.fk_sensor=s.id_sensor


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor


GROUP BY ts.nome_tipo;


`

},



{

nome:"ultimosEventos",

sql:`

SELECT


e.nome_equipamento,


ts.nome_tipo,


a.nivel_alerta,


a.data_hora_inicio


FROM alerta a


INNER JOIN leitura l

ON a.fk_leitura=l.id_leitura


INNER JOIN sensor s

ON l.fk_sensor=s.id_sensor


INNER JOIN equipamento e

ON s.fk_equipamento=e.id_equipamento


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor


ORDER BY a.data_hora_inicio DESC


LIMIT 10;


`

}


];


executarConsultas(consultas,res);


}




// ==========================
// DASHBOARD POR SENSOR
// ==========================


export function dashboardSensor(req,res){


let tipo=req.params.tipo;



// Corrige acentos da URL

if(tipo==="Pressao"){
    tipo="Pressão";
}

if(tipo==="Vazao"){
    tipo="Vazão";
}

if(tipo==="Vibracao"){
    tipo="Vibração";
}



const consultas=[



{

nome:"cards",

sql:`

SELECT


COUNT(DISTINCT e.id_equipamento) equipamentos,


COUNT(DISTINCT s.id_sensor) sensores,


COUNT(DISTINCT a.id_alerta) alertas,


COUNT(
DISTINCT CASE
WHEN a.nivel_alerta='Crítico'
THEN a.id_alerta
END
) criticos


FROM equipamento e


INNER JOIN sensor s

ON e.id_equipamento=s.fk_equipamento


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor


LEFT JOIN leitura l

ON s.id_sensor=l.fk_sensor


LEFT JOIN alerta a

ON l.id_leitura=a.fk_leitura



WHERE ts.nome_tipo=?;


`,

valores:[tipo]


},



{

nome:"sensor",

sql:`

SELECT


DATE(l.data_hora_leitura) data,


AVG(l.valor_leitura) valor


FROM leitura l


INNER JOIN sensor s

ON l.fk_sensor=s.id_sensor


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor


WHERE ts.nome_tipo=?


GROUP BY DATE(l.data_hora_leitura)


ORDER BY data;


`,

valores:[tipo]


},




{

nome:"media",

sql:`

SELECT


e.nome_equipamento,


AVG(l.valor_leitura) media


FROM leitura l


INNER JOIN sensor s

ON l.fk_sensor=s.id_sensor


INNER JOIN equipamento e

ON s.fk_equipamento=e.id_equipamento


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor


WHERE ts.nome_tipo=?


GROUP BY e.nome_equipamento;


`,

valores:[tipo]


},




{

nome:"alertas",

sql:`

SELECT


a.nivel_alerta,


COUNT(a.id_alerta) quantidade


FROM alerta a


INNER JOIN leitura l

ON a.fk_leitura=l.id_leitura


INNER JOIN sensor s

ON l.fk_sensor=s.id_sensor


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor



WHERE ts.nome_tipo=?


GROUP BY a.nivel_alerta;


`,

valores:[tipo]


},




{

nome:"equipamentos",

sql:`

SELECT


e.status_equipamento,


COUNT(DISTINCT e.id_equipamento) quantidade


FROM equipamento e


INNER JOIN sensor s

ON e.id_equipamento=s.fk_equipamento


INNER JOIN tipo_sensor ts

ON s.fk_tipo=ts.id_tipo_sensor


WHERE ts.nome_tipo=?


GROUP BY e.status_equipamento;


`,

valores:[tipo]


}


];



executarConsultasParametros(consultas,res);


}