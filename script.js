document.getElementById("cep").addEventListener("blur",(evento)=>{
    const elemento = evento.target;
    const InformandoCep = elemento.value


//validar cep
if(!(InformandoCep.length === 8)){
    return;
}

//buscaViaCEP
//Usando o Fetch
fetch(`https://viacep.com.br/ws/${InformandoCep}/json/`)
    .then(resposta => resposta.json())
    .then (data =>{
        //processamento da página
        if(!data.erro){
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('localidade').value = data.localidade;
            document.getElementById('estado').value = data.estado;

            localStorage.setItem('logradouro',data.logradouro);
            localStorage.setItem('bairro', data.bairro);
            localStorage.setItem('localidade', data.localidade);
            localStorage.setItem('estado', data.estado);
            localStorage.setItem('cep', InformandoCep);

        }else{
            alert("CEP não encontrado.")
        }

    })
    //se der falha
    .catch(error => console.error("Erro ao buscar o CEP:", error))
});
 //verificar se o dados foi salvo
 //DomConrentLoaded (quando a tela estiver carregada)
document.addEventListener('DOMContentLoaded', () => {
    const dadosSalvo = localStorage.getItem('logradouro');

    if(dadosSalvo != ""){
        document.getElementById('logradouro').value = localStorage.getItem('logradouro');
        document.getElementById('bairro').value = localStorage.getItem('bairro');
        document.getElementById('localidade').value = localStorage.getItem('localidade');
        document.getElementById('estado').value = localStorage.getItem('estado');
        document.getElementById('cep').value = localStorage.getItem('cep');
    }

}
);
