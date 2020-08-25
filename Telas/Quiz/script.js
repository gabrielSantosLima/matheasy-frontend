let selectedOptionIndex;
let currentQuestion = 0; // Pergunta atual
let questions;
let pointByQuestion = 2; //Pontos por cada resposta certa
let numberQuestions; //Numero de perguntas
let points = 0; //Total de pontos

function Quiz(){

    const corretAnswer = event => {
        if (!selectedOptionIndex) return;

        clear();

        const correctIndex = getCorrectIndex()
        const result = $('.answer-indicator div')[currentQuestion];

        console.log('> Questão de número: ', currentQuestion);
        console.log('> Questão correta: ', correctIndex)
        console.log('> Questão selecionada: ', selectedOptionIndex)


        if (currentQuestion === numberQuestions - 1) {
            console.log('> Fim do quiz')
            end();
            return;
        }

        if (correctIndex === selectedOptionIndex) {
            $(result).addClass('correct');

            //Adiciona pontos ao aluno
            addPoint(pointByQuestion)
        } else {
            $(result).addClass('failed');
        }

        console.log('> Pontos: ', points);

        currentQuestion++;
        selectedOptionIndex = null;
        changeQuestion();
    }

    const addPoint = value => {
        points += value;
    }

    const select = event => {
        selectedOptionIndex = $(event.target).data('index')

        $('.option').removeClass('select')
        $(event.target).toggleClass('select');
    }

    const start = event => {
        $('.answer-indicator div').removeClass('correct');
        $('.answer-indicator div').removeClass('failed');
        $('.result-box').addClass('hide');
        $('.home-box').addClass('hide');
        $('.quiz-box').removeClass('hide');

        currentQuestion = 0;

        changeQuestion();
    }

    const changeQuestion = () => {
        const question = questions[currentQuestion];
        const numberOptions = question.options.length;

        $('.question-text').html(question.answer);
        $('.question-number').html(`Questão ${currentQuestion + 1} de ${numberQuestions}`);

        //Carrega as opções da questão atual
        for (let count = 0; count < numberOptions; count++) {
            const option = question.options[count]
            $($('.option')[count]).html(option)
        }

        setCorrectIndex(question.correct);
    }

    const getCorrectIndex = () => {
        const correctIndex = $('#option-container').data('correct-index')
        return correctIndex;
    }

    const setCorrectIndex = index => {
        $('#option-container').data('correct-index', index)
    }

    const end = async () => {
        console.clear();
        //Esconder questões e mostrar resultados
        $('.quiz-box').addClass('hide');
        $('.result-box').removeClass('hide');

        //Calcular pontos (acertos, erros, porcentagem de acertos)
        const rights = points / pointByQuestion; // acertos = pontos feitos / pontos por questão
        const errors = numberQuestions - rights; // erros = numeros de questoes * pontos - acertos  
        const percent = `${Math.floor(rights / numberQuestions * 100)}%`;
        const totalPoints = points;

        //Mostrar resultados
        $('.numero-questoes').html(numberQuestions);
        $('.acerto').html(rights);
        $('.erro').html(errors);
        $('.percentual').html(percent);
        $('.ponto').html(totalPoints);
        
        try{
            const resp = await fetch(`http://localhost:8080/pontuacao?point=${totalPoints}`)
            
            console.log("> Usuário atualizado com sucesso!");
        }catch(error){
            console.error('> Erro ao atualizar pontuação: '+error)
        }
    }
    return{
        corretAnswer,
        addPoint,
        select,
        start,
        end,
        changeQuestion,
        getCorrectIndex,
        setCorrectIndex
    }
}

/* Objeto questão
    answer: "Quanto é 1 + 1?",
    options: [
        "2",
        "3",
        "4",
        "5",
        "5"
    ],
    correct: 1
*/
async function loadQuestion() {
    try {
        const idModulo = $(document.body).data('idModulo')
        
        console.log('> O id do módulo acessado é: ', idModulo)
        
        const resp = await fetch(`http://localhost:8080/atividades/${idModulo}`)
        const data = await resp.json();
        
        const array = data.map(e => {
            return {
                answer: e.answer,
                options: [e.questao1, e.questao2, e.questao3, e.questao4, e.questao5],
                correct: e.correctIndex
            }
        });

        console.log(array);

        return array;
    } catch (err) {
        console.error(err)
    }
}

function clear() {
    $('.option').removeClass('select')
    console.clear();
}

async function addEvents() {
    const quiz = Quiz()
    questions = await loadQuestion()
    numberQuestions = await questions.length;

    $('#start').on('click', quiz.start);
    $('.option').on('click', quiz.select);
    $('#next').on('click', quiz.corretAnswer);
    $('#again').on('click', quiz.start);
}

//Carrega os componentes na tela
function prepareQuiz() {
    $('.total-question').html(numberQuestions);
    $('.question-number').html(`Questão 1 de ${numberQuestions}`);

    for (let count = 0; count < numberQuestions; count++) {
        $('.answer-indicator').append('<div></div>')
    }
}

//inicia aplicação
async function init() {
    await addEvents();
    prepareQuiz();
}

init();