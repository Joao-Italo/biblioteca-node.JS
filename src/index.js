//const chalck = require("chalk"); é um metodo que está sendo abandonado. O novo é o "IMPORT".
import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

    const capituras =[...texto.matchAll(regex)];

    const resultado = capituras.map(capituras => ({[capituras[1]]: capituras[2]}));
    
    return resultado.length !== 0 ? resultado : "Não há links no arquivo" ;
}

function trataErro(erro){
    console.log(erro);
   throw new Error(chalk.blue(erro.code, 'Não há arquivo no diretorio')); 
}
  
async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo,encoding)
        return extraiLinks(texto);
    } catch (erro){
        trataErro(erro);
    }
}

export default pegaArquivo;

