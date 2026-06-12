import { connection } from "../database/db.js";



function executarConsultas(consultas, res) {


    let resultado = {};

    let total = consultas.length;

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



            if(finalizadas === total){

                res.json(resultado);

            }


        });


    });


}






// ======================================
// TEMPERATURA
// ======================================


export function temperatura(req,res){


const consultas = [


{
nome:"cards",

sql:`

SELECT

COUNT(DISTINCT e.id_equipamento) AS equipamentos,

COUNT(DISTINCT s.id_sensor) AS sensores,

SUM(
CASE 
WHEN l.alerta_gerado='Sim'
THEN 1
ELSE 0
END
) AS alertas,

SUM(
CASE 
WHEN a.nivel_alerta='Crítico'
THEN 1
ELSE 0
END
) AS criticos


FROM leitura l


INNER JOIN sensor s
ON l.fk_sensor=s.id_sensor


INNER JOIN equipamento e
ON s.fk_equipamento=e.id_equipamento


INNER JOIN tipo_sensor ts
ON s.fk_tipo=ts.id_tipo_sensor


LEFT JOIN alerta a
ON l.id_leitura=a.fk_leitura


WHERE ts.nome_tipo='Temperatura'


`

},




{
nome:"temperatura",

sql:`

SELECT


DATE(l.data_hora_leitura) AS data,


AVG(l.valor_leitura) AS valor


FROM leitura l


INNER JOIN sensor s
ON l.fk_sensor=s.id_sensor


INNER JOIN tipo_sensor ts
ON s.fk_tipo=ts.id_tipo_sensor



WHERE ts.nome_tipo='Temperatura'


GROUP BY DATE(l.data_hora_leitura)


ORDER BY data


`

},





{
nome:"media",

sql:`

SELECT


e.nome_equipamento,


AVG(l.valor_leitura) AS media


FROM leitura l


INNER JOIN sensor s
ON l.fk_sensor=s.id_sensor


INNER JOIN equipamento e
ON s.fk_equipamento=e.id_equipamento


INNER JOIN tipo_sensor ts
ON s.fk_tipo=ts.id_tipo_sensor



WHERE ts.nome_tipo='Temperatura'


GROUP BY e.nome_equipamento


`

},





{
nome:"alertas",

sql:`

SELECT


a.nivel_alerta,


COUNT(*) AS quantidade


FROM leitura l


INNER JOIN sensor s
ON l.fk_sensor=s.id_sensor


INNER JOIN tipo_sensor ts
ON s.fk_tipo=ts.id_tipo_sensor


LEFT JOIN alerta a
ON l.id_leitura=a.fk_leitura



WHERE ts.nome_tipo='Temperatura'


GROUP BY a.nivel_alerta


`

},





{
nome:"equipamentos",

sql:`

SELECT


e.status_equipamento,


COUNT(*) quantidade


FROM equipamento e


INNER JOIN sensor s
ON e.id_equipamento=s.fk_equipamento


INNER JOIN tipo_sensor ts
ON s.fk_tipo=ts.id_tipo_sensor


WHERE ts.nome_tipo='Temperatura'


GROUP BY e.status_equipamento


`

}


];


executarConsultas(consultas,res);


}
