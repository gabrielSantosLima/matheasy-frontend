let selectedOptionIndex;
let currentQuestion = 0;
let questions = [
    {
        answer: "Quanto é 1 + 1?",
        options: [
            "2",
            "3",
            "4",
            "5",
            "5"
        ],
        correct: 1
    },
    {
        answer: "Quanto é 1 + 2?",
        options: [
            "2",
            "3",
            "4",
            "5",
            "5"
        ],
        correct: 2
    },
    {
        answer: "Quanto é 1 + 3?",
        options: [
            "2",
            "3",
            "4",
            "5",
            "5"
        ],
        correct: 3
    },
    {
        answer: "Quanto é 1 + 4?",
        options: [
            "2",
            "3",
            "4",
            "5",
            "5"
        ],
        correct: 4
    },
    {
        answer: "Quanto é 1 + 4?",
        options: [
            "2",
            "3",
            "4",
            "5",
            "5"
        ],
        correct: 4
    }
]
const pointByQuestion = 1;
const numberQuestions = questions.length;
let points = 0;

// Verificar o clique do usuário e marcar option como selecionado
const Quiz = {
    
    corretAnswer: event => {
        if(!selectedOptionIndex) return;
        
        clear();
        
        const correctIndex = Quiz.getCorrectIndex()
        const result = $('.answer-indicator div')[currentQuestion];
        
        console.log('> Questão de número: ', currentQuestion);
        console.log('> Questão correta: ', correctIndex)
        console.log('> Questão selecionada: ', selectedOptionIndex)
        
        
        if(currentQuestion === numberQuestions - 1){
            console.log('> Fim do quiz')
            Quiz.end();
            return;
        } 
        
        if(correctIndex === selectedOptionIndex){
            $(result).addClass('correct');
            
            //Adiciona pontos ao aluno
            Quiz.addPoint(pointByQuestion)
        }else{
            $(result).addClass('failed');
        }
        
        console.log('> Pontos: ',points);
        
        currentQuestion++;
        selectedOptionIndex = null;
        Quiz.changeQuestion();
    },
    
    addPoint: value => {
        points += value;
    },
    
    select: event => {
        selectedOptionIndex = $(event.target).data('index')
        
        $('.option').removeClass('select')
        $(event.target).toggleClass('select');
    },
    
    start: event => {
        $('.answer-indicator div').removeClass('correct');
        $('.answer-indicator div').removeClass('failed');
        $('.result-box').addClass('hide');
        $('.home-box').addClass('hide');
        $('.quiz-box').removeClass('hide');
        
        currentQuestion = 0;
        
        Quiz.changeQuestion();
    },
    
    changeQuestion: () => {
        const question = questions[currentQuestion];
        
        $('.question-text').html(question.answer);
        $('.question-number').html(`Questão ${currentQuestion + 1} de ${numberQuestions}`);
        
        for(let count = 0; count < numberQuestions; count++){
            const option = question.options[count]
            
            $($('.option')[count]).html(option)
        }
        
        Quiz.setCorrectIndex(question.correct);
    },

    getCorrectIndex: () => {
        const correctIndex = $('#option-container').data('correct-index')
        return correctIndex;
    },
    
    setCorrectIndex: index => {
        $('#option-container').data('correct-index', index)
    },
    
    end: () => {
        //Esconder questões e mostrar resultados
        $('.quiz-box').addClass('hide');
        $('.result-box').removeClass('hide');

        //Calcular pontos (acertos, erros, porcentagem de acertos)
        const rights = points / pointByQuestion; // acertos = pontos feitos / pontos por questão
        const errors = numberQuestions * pointByQuestion - rights; // erros = numeros de questoes * pontos - acertos  
        const percent = `${rights / numberQuestions * 100}%`;
        const totalPoints = `${rights}/${numberQuestions}`;

        //Mostrar resultados
        $('.numero-questoes').html(numberQuestions);
        $('.acerto').html(rights);
        $('.erro').html(errors);
        $('.percentual').html(percent);
        $('.ponto').html(totalPoints);
    }
}

function clear(){
    $('.option').removeClass('select')
    console.clear();
}

function addEvents(){
    $(document).ready(() => {
        $('#start').on('click', Quiz.start);
        $('.option').on('click', Quiz.select);
        $('#next').on('click', Quiz.corretAnswer);
        $('#again').on('click', Quiz.start);
    });
}

function prepareQuiz(){
    $('.total-question').html(numberQuestions);
    $('.question-number').html(`Questão 1 de ${numberQuestions}`);

    for(let count = 0; count < numberQuestions; count++){
        $('.answer-indicator').append('<div></div>')
    }
}

function getQuestions(){
    console.log('> Modulo de id: ')
}

function init(){
    prepareQuiz();
    addEvents();
}

init();