export default class Question {
    public title: string;
    public options: Option[];

    constructor(title: string, options: Option[]) {
        this.title = title;
        this.options = options;
    }
}

export interface Option {
    text: string;
    isCorrect: boolean;
}