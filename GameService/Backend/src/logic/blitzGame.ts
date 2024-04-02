import Queue from "./helper/queue";
import Player from "./models/player";
import Question from "./models/question";
import {WSContext} from "../common/wsConfig";

export class BlitzGame {
    public players: Player[];
    public questions: Queue<Question>;

    private currentPlayer: number;
    private currentQuestion: Question;
    private currentQuestionCount: number;

    private readonly QUESTIONS_PER_PLAYER: number;

    constructor(players: Player[], questions: Question[], max_q: number) {
        this.players = players;
        this.questions = new Queue<Question>(questions);
        this.QUESTIONS_PER_PLAYER = max_q;

        this.currentPlayer = 0;
        this.currentQuestionCount = -1;
        this.currentQuestion = this.questions.dequeue()!;

        console.log(this)

    }

    markCorrect() : void {
        this.players[this.currentPlayer].points++;
    }

    nextQuestion() : void {
        this.currentQuestion = this.questions.dequeue()!;
    }

    nextPlayer() : void {
        this.currentPlayer++;
    }

    next() : void {
        try {
            this.nextQuestion();
            this.currentQuestionCount++;
        } catch {
            throw Error("Not enough questions in pack!");
        }
        if (this.currentQuestionCount == this.QUESTIONS_PER_PLAYER) {
            this.nextPlayer();
        }

        console.log(`Trying to send to: ${this.currentPlayer} which is ${this.players[this.currentPlayer]}`)
        this.players[this.currentPlayer].connection.send(JSON.stringify({
            topic: 'newQuestion',
            content: this.currentQuestion
        }))

        console.log(this.currentQuestion)
    }
}

export const MockBlitzGame = (playerConnections: {connection: WSContext, userId: number}[], max_q: number) => {
    return new BlitzGame(
        playerConnections.map(connection=>
            new Player(connection.userId, connection.connection)),
        [
            new Question("Choose a letter?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ]),
            new Question("Good Question?", [
                {text: 'Yea', isCorrect: true},
                {text: 'Not Sure', isCorrect: false},
                {text: 'Definitely not', isCorrect: false},
                {text: 'Whatever', isCorrect: false},
            ]),
            new Question("Where is Russia?", [
                {text: 'Africa', isCorrect: true},
                {text: 'Eurasia', isCorrect: false},
                {text: 'Antarctica', isCorrect: false},
                {text: 'America', isCorrect: false},
            ]),
            new Question("Choose a letter3?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ]),
            new Question("Choose a letter4?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ]),
            new Question("Choose a letter5?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ]),
            new Question("Choose a letter6?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ]),
            new Question("Choose a letter7?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ]),
            new Question("Choose a letter8?", [
                {text: 'A', isCorrect: true},
                {text: 'B', isCorrect: false},
                {text: 'C', isCorrect: false},
                {text: 'D', isCorrect: false},
            ])
        ],
        max_q
    )
}