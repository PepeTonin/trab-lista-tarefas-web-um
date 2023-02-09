const frm = document.querySelector("form")      // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro")

// função para adicionar tarefas
frm.addEventListener("submit", (e) => {
  e.preventDefault()                            // evita envio do form

  const tarefa = frm.inTarefa.value             // obtém o conteúdo digitado

  const h5 = document.createElement("h5")       // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa) // cria um texto
  h5.appendChild(texto)                         // define que texto será filho de h5
  dvQuadro.appendChild(h5)                      // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                       // limpa o campo de edição
  frm.inTarefa.focus()                          // joga o cursor neste campo
})

// função para selecionar tarefas
frm.btSelecionar.addEventListener("click", () => {
  const tarefas = document.querySelectorAll("h5")   // obtém elementos da página -- seleciona todos os h5 e retorna uma Node List

  if (tarefas.length == 0) {                        // verifica se há tarefas para serem selecionadas
    alert("Não há tarefas para selecionar")
    return
  }

  let aux = -1    // cria a variável aux e seta o valor como "-1"

  // estrutura de repetição para descobrir qual tarefa está selecionada -- a tarefa selecionada tem a classe "tarefa selecionada"
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].className == "tarefa-selecionada") {   // verifica se a tarefa (posição i na Node List) está selecionada ou não
      tarefas[i].className = "tarefa-normal"              // se tiver selecionada, troca a classe para classe normal, ou seja, deseleciona a tarefa
      aux = i                                             // a variável "aux" tem seu valor setado para "i", posição da tarefa que estava selecionada
      break                                               // break saindo do for loop
    }
  }

  if (aux == tarefas.length - 1) {    // verifica se o valor setado na variável aux representa a última posição da Node List
    aux = -1                          // caso seja, o valor é setado para "-1"
  }

  // altera a classe do elemento que está na posição "aux + 1" da Node List, para "tarefa-selecionada", ou seja, seleciona a tarefa
  tarefas[aux + 1].className = "tarefa-selecionada"
})

// função para retirar a tarefa selecionada
frm.btRetirar.addEventListener("click", () => {
  const tarefas = document.querySelectorAll("h5")   // obtém elementos da página -- seleciona todos os h5 e retorna uma Node List

  let aux = -1    // cria a variável aux e seta o valor como "-1"

  tarefas.forEach((tarefa, i) => {                      // semelhantemente ao for da função de cima, este looping serve para procurar
    if (tarefa.className == "tarefa-selecionada") {     // em qual posição da Node List está a tarefa selecionada
      aux = i                                             // essa posição é atribuida a variável "aux"
    }
  })

  if (aux == -1) {                                      // se aux se manter como "-1" significa que nenhuma tarefa foi selecionada
    alert("Selecione uma tarefa para removê-la...")     // mensagem de erro
    return
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) {   // se alguma tarefa válida estiver selecionada, uma mensagem que requer confirmação é mostrada se
    dvQuadro.removeChild(tarefas[aux])                                  // for confirmada, remove a tarefa selecionada, ou seja, a que está na posição armazenada em "aux"
  }
})

// função para gravar a lista de tarefas no armazenamento local - local storage
frm.btGravar.addEventListener("click", () => {
  const tarefas = document.querySelectorAll("h5")   // obtém elementos da página -- seleciona todos os h5 e retorna uma Node List

  if (tarefas.length == 0) {                        // verifica se há tarefas para serem salvas
    alert("Não há tarefas para serem salvas")       // caso não haja, da uma mensagem de erro
    return
  }

  let dados = ""                        // cria uma variável "dados" que armazenará as tarefas adicionadas no programa
  tarefas.forEach(tarefa => {           // usando uma estrutura de repetição, roda-se a Node List e concatena todos os "innerText"
    dados += tarefa.innerText + ";"     // na variável "dados", os separando por ";"
  })

  // armazena essa variável "dados" na estrutura "tarefasDia" através do local storage,
  // armazenando esses dados localmente na máquina sendo possível acessá-los mesmo depois de fechar ou reiniciar o navegador
  // usa-se o método "slice" para remover o último ";"
  localStorage.setItem("tarefasDia", dados.slice(0, -1))

  if (localStorage.getItem("tarefasDia")) {   // verifica se o método funcionou e emite uma mensagem positiva caso esteja tudo certo
    alert("Ok! Tarefas Salvas")
  }
})

// função para retornar (load, carregar) os valores salvos localmente ao programa
window.addEventListener("load", () => {

  if (localStorage.getItem("tarefasDia")) {   // verifica se há valores salvos

    // caso haja, ele retorna esses valores, que foram armazenados em forma de string separados por ";"
    // ao retornar usa-se o mpetodo split para separar em lista usando o separador ";"
    const dados = localStorage.getItem("tarefasDia").split(";")

    // percorre os dados armazenados em localStorage
    // para cada dado armazendo em localStorage, é criado um elemento "h5" contendo o texto lá contido
    dados.forEach(dado => {
      const h5 = document.createElement("h5")
      const texto = document.createTextNode(dado)
      h5.appendChild(texto)
      dvQuadro.appendChild(h5)
    })
  }
})

// função para limpar tarefas
frm.btLimpar.addEventListener("click", () => {

  const tarefas = document.querySelectorAll("h5")   // obtém elementos da página -- seleciona todos os h5 e retorna uma Node List

  if (tarefas.length == 0) {                        // verifica se há tarefas
    alert("Não há tarefas listadas")                // caso não haja, da uma mensagem de erro
    return
  }

  if (confirm('Quer mesmo excluir todas as tarefas?')) {    // caso haja tarefas, uma mensagem que requer confirmação aparece, caso positivo
    tarefas.forEach(tarefa => {                             // as tarefas são limpas, removendo todos os elementos de dentro da node list
      tarefa.remove();
    })
  }

  localStorage.clear();   // logo em seguida, essas tarefas também são excluidas do local storage, portanto, tudo completamente excluido
})