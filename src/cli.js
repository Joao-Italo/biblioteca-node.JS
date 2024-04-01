import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from "chalk";
import listaValidada from "./htttp-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado,identificador = ''){
    if(valida){
        console.log(chalk.yellow("Lista Validada"), 
        chalk.black(identificador),
        await listaValidada(resultado)); 
    } else {
        console.log(chalk.yellow("Lista de links"), 
        chalk.black(identificador),
        resultado);  
    }
    
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try{
        fs.statSync(caminho);
    }catch (erro) {
       if (erro.code === 'ENOENT'){
            console.log("Arquivo ou diretorio não existe.");
            return;
       } 
    }
    
    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida,resultado); 
    }else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida,lista,nomeDeArquivo);
        });
    }
}

processaTexto(caminho);