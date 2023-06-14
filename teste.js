var btnCalcular = document.getElementById("calcular");
btnCalcular.addEventListener("click", calcular);

function calcular() {
    var salario = document.getElementById("salario").value;

    var inss = calcularINSS(salario);
    var irrf = calcularIRRF(salario, inss)
    var vt = calcularVT(salario)


    exibir(salario, inss, irrf, vt)

}

function calcularINSS(valSalario) {

    var salFaixa = 0;
    var valorInss = 0;

    switch (true) {

        case valSalario >= 7507.49: // Acima da Faixa
            valSalario >= 7507.49;

        case valSalario >= 3856.94: //Faixa 4
            salFaixa = valSalario - 3856.94;
            valorInss += salFaixa * 0.14;
            valSalario = 3856.94;

        case valSalario >= 2571.29: //Faixa 3
            salFaixa = valSalario - 2571.29;
            valorInss += salFaixa * 0.12;
            valSalario = 2571.29;

        case valSalario >= 1302: //Faixa 2
            salFaixa = valSalario - 1302;
            valorInss += salFaixa * 0.09;
            valSalario = 1302;

        default:                // Faixa 1
            salFaixa = valSalario;
            valorInss += salFaixa * 0.075;

    }

    return Math.round(valorInss * 100) / 100;


}

function calcularIRRF(valSalario, valINSS) { 
    var qtdDependentes = document.getElementById("dependentes").value
    var salarioBase = valSalario - valINSS - 189.59 * qtdDependentes
    var valIRRF = 0 ; 
    if (salarioBase <= 1903.98){
        valIRRF = 0;
    }else if(salarioBase <= 2826.65) {
        valIRRF = salarioBase * 0.075 - 142.80;
    }else if (salarioBase <= 3751.05){
        valIRRF = salarioBase * 0.15 - 354.80;
    }else if (salarioBase <= 4664.68) {
        valIRRF = salarioBase * 0.225 - 636.13;
    }else{
        valIRRF = salarioBase * 0.275 - 869.36;
    }
    return Math.round(valIRRF * 100) / 100;
 }



function calcularVT(valSalario) {
    var valor;
    var optVT = document.getElementById("valetransporte").checked

    if (optVT) {
        valor = Math.round(valSalario * 6) / 100
    } else {
        valor = 0;
    }

    return valor;
}




function exibir(valSalario, valINSS, valIRRf, valVT) {
    var valSalarioLiquido =Math.round((valSalario - valINSS - valIRRf - valVT)*100) / 100;

var tabela = "<table border = '1'>";

    tabela += "<tr>";
    tabela += "<td>Salário Bruto</td>";
    tabela += "<td> R$ "+ valSalario + "</td>";
    tabela += "</tr>";

    tabela += "<tr>";
    tabela += "<td>INSS</td>";
    tabela += "<td> R$ "+ valINSS + "</td>";
    tabela += "</tr>";

    tabela += "<tr>";
    tabela += "<td>IRRF</td>";
    tabela += "<td> R$ "+ valIRRf + "</td>";
    tabela += "</tr>";

if (valVT > 0) {
    tabela += "<tr>";
    tabela += "<td>Vale Transporte</td>";
    tabela += "<td> R$ "+ valVT + "</td>";
    tabela += "</tr>";
}
    tabela += "<tr>";
    tabela += "<td>Salário Líquido</td>";
    tabela += "<td> R$ "+ valSalarioLiquido + "</td>";
    tabela += "</tr>";

    tabela += "</table>";

document.getElementById("resultado").innerHTML = tabela;
}