import React, {useState} from 'react';
import './App.css';

import exampleData from './data/sample.json';
import {Header} from "./components/header/header";
import {Content} from "./components/content/content";
import {
    ExampleData,
    ExampleData_questions_stream_latestByTag_questions,
} from "./react-app-env";

/**
 * Type alias for generated question type.
 */
type Question = ExampleData_questions_stream_latestByTag_questions;
/**
 * List of 100 example questions including answers and comments.
 */
const questions: Question[] = ((exampleData as unknown) as ExampleData).questions.stream.latestByTag.questions;
const allTags = new Map();
for (const question of questions) {

    for (const tag of question.questionTags) {
        if (allTags.get(tag.tag?.name) > 0)
            allTags.set(tag.tag?.name, allTags.get(tag.tag?.name) + 1);
        else {
            allTags.set(tag.tag?.name, 1);
        }
    }
}

const sortedQuestionsTime = [...questions].sort((a, b) => {
    const nameA = new Date(a.createdAt);
    const nameB = new Date(b.createdAt);
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
});
const sortedQuestionsAnswers = [...questions].sort((a, b) => {
    if (a.answers.length > b.answers.length) {
        return -1;
    }
    if (a.answers.length < b.answers.length) {
        return 1;
    }
    return 0;
});
const sortedQuestionsLength = [...questions].sort((a, b) => a.htmlBody.length - b.htmlBody.length)

/**
 * Component showing a list of questions
 */
export const Listing: React.FunctionComponent = () => {
    const [question, setQuestion] = useState<Question | undefined>(undefined);
    const [currentQuestions, setCurrentQuestions] = useState<Question[]>(questions);
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const filterByTag = (q: Question): boolean => {

        return !filter || q.questionTags.some(tag => tag.tag?.name == filter);
    }

    const tags = Array.from(allTags.entries())
    const sortedTags = tags.sort((a, b) => -a[1] + b[1]).splice(1, 11)
    return <div className="App">
        <Header/>

        <Content>

            {question && <div>
                <button className="zurückButton" onClick={() => setQuestion(undefined)}> Zurück</button>
                <div className="qdp flex">
                    {question.questionTags.map((x1) =>
                        <button className="zurückButton"
                                onClick={() =>{setFilter(x1.tag?.name);setQuestion(undefined)}}>
                            {x1.tag?.name}
                        </button>
                    )}
                </div>
                <div className="card  box-padding items-start flex qdp">
                    <div className="card-body shadow-lg">
                        <div className="Time">{new Date(question.createdAt).toLocaleString('de-DE', {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric"
                        })} </div>
                        <h3 className="card-title">{question.title}</h3>
                        <div className="user-container">
                            <img src={question.author?.avatar?.urls.nmmslarge} className="author-pb" alt=""
                                 width="60"/>
                            {question.author &&
                                <h4 className="card-subtitle mb-2 text-muted username">  {question.author.displayedName}</h4>}
                            {!question.author && <h5 className="card-subtitle mb-2 text‚ds-muted username"> Anonym</h5>}
                        </div>
                        <div id="Frage" dangerouslySetInnerHTML={{__html: question.htmlBody}}/>
                    </div>
                </div>
                {question.answerCount != 1 && <p className="grauGroß">{question.answerCount} Antworten </p>}
                {question.answerCount == 1 && <p className="grauGroß">Eine Antwort </p>}
                {question.answers.sort((a, b) => -a.userSatisfaction.counts.positive + b.userSatisfaction.counts.positive).length}
                {question.answers.map((answer) => <>
                    <div className="card  box-padding items-start flex qdp">
                        <div className="card-body shadow-lg">
                            <div className="user-container">
                                <img src={answer.author?.avatar?.urls.nmmslarge} className="comment-pb" alt=""
                                     width="60"/>
                                {answer.author &&
                                    <h4 className="card-subtitle mb-2 text-muted username"> {answer.author.displayedName}</h4>}
                                {!answer.author &&
                                    <h5 className="card-subtitle mb-2 text‚ds-muted username">Anonym</h5>}
                            </div>
                            <div id="Frage" dangerouslySetInnerHTML={{__html: answer.htmlBody}}/>
                            <button
                                className="hilfreich-button">Hilfreich: {answer.userSatisfaction.counts.positive}</button>
                            {answer.comments.map((comment) => <>
                                <div className="card items-start flex">
                                    <div className="card-body shadow-lg">
                                        {comment.author &&
                                            <h4 className="card-subtitle mb-2 text-muted username"> {comment.author.displayedName}</h4>}
                                        {!comment.author &&
                                            <h5 className="card-subtitle mb-2 text‚ds-muted username">Anonym</h5>}
                                        <div id="Frage" dangerouslySetInnerHTML={{__html: comment.htmlBody}}/>
                                        <button className="hilfreich-button">&#x1F44D; {comment.voteCount}</button>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>
                </>)}

                <br/>
            </div>}

            {!question && <div>
                <div>

                </div>
                <p className="grauGroß">Sortiere nach:</p>

                <button className="zurückButton" onClick={() => setCurrentQuestions(sortedQuestionsTime)}>Zeit</button>
                <button className="zurückButton" onClick={() => setCurrentQuestions(sortedQuestionsAnswers)}>Antworten
                </button>
                <button className="zurückButton" onClick={() => setCurrentQuestions(sortedQuestionsLength)}>Länge
                </button>
                <p className="grauGroß">Filter nach:</p>
                {sortedTags.map(tag =>
                    <button className={filter == tag[0] ? "topTags zurückButton ausgewählt" : "topTags zurückButton"}
                            onClick={() => setFilter(filter == tag[0] ? undefined : tag[0])}>
                        {tag[0]}: {tag[1]}
                    </button>)}
                <button className="zurückButton" onClick={() => setFilter(undefined)}>Filter entfernen
                </button>
            </div>
            }

            {!question && currentQuestions.filter(filterByTag).map((x) => <>

                <div className="card  box-padding items-start flex question" onClick={() => setQuestion(x)}
                     style={{width: "36rem"}}>
                    <div className="card-body shadow-lg">
                        <div className="Time">{new Date(x.createdAt).toLocaleString('de-DE', {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric"
                        })} </div>
                        <h3 className="card-title">{x.title}</h3>
                        {x.questionTags.map((x1, index) =>
                            <>{x1.tag && x1.tag.name}
                                {index != x.questionTags.length - 1 && <>, </>}
                                {index == x.questionTags.length - 1 && <>.</>}
                            </>
                        )}
                        <div className="user-container">
                            <img src={x.author?.avatar?.urls.nmmslarge} className="author-pb" alt="" width="60"/>
                            {x.author &&
                                <h4 className="card-subtitle mb-2 text-muted username">{x.author.displayedName}</h4>}
                            {!x.author && <h5 className="card-subtitle mb-2 text‚ds-muted username">Anonym</h5>}
                        </div>
                        <div id="Frage" dangerouslySetInnerHTML={{__html: x.htmlBody}}/>
                        <div style={{fontSize: "small", color: "gray"}}> Antworten: {x.answerCount}</div>
                    </div>
                </div>
                <br/> </>)}
        </Content>
    </div>;
}