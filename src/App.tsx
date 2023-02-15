import React, {useState} from 'react';
import './App.css';

import exampleData from './data/sample.json';
import {Header} from "./components/header/header";
import {Content} from "./components/content/content";
import {ExampleData, ExampleData_questions_stream_latestByTag_questions} from "./react-app-env";

/**
 * Type alias for generated question type.
 */
type Question = ExampleData_questions_stream_latestByTag_questions;

/**
 * List of 100 example questions including answers and comments.
 */
const questions: Question[] = ((exampleData as unknown) as ExampleData).questions.stream.latestByTag.questions;

/**
 * Component showing a list of questions
 */
export const Listing: React.FunctionComponent = () => {
    const [question, setQuestion] = useState<Question | undefined>(undefined);
    return <div className="App">
        <Header/>

        <Content>
            {question && <div>
                <button onClick={() => setQuestion(undefined)}>Zurück</button>

                {question.questionTags.map((x1, index) =>
                    <>{x1.tag && x1.tag.name}
                        {index != question.questionTags.length - 1 && <>, </>}
                        {index == question.questionTags.length - 1 && <>.</>}
                    </>
                )}

                <div className="card  box-padding items-start flex qdp">
                    <div className="card-body shadow-lg">
                        <div className="Time">{question.createdAt.substring(0, 10)} </div>
                        <h3 className="card-title">{question.title}</h3>
                        {question.author && <h4 className="card-subtitle mb-2 text-muted username"> Frage gestellt
                            von {question.author.displayedName}</h4>}
                        {!question.author && <h5 className="card-subtitle mb-2 text‚ds-muted username">Anonym</h5>}
                        <div id="Frage" dangerouslySetInnerHTML={{__html: question.htmlBody}}/>
                    </div>
                </div>
                {question.answerCount != 1 && <p className="antwortenAnzahl">{question.answerCount} Antworten </p>}
                {question.answerCount == 1 && <p className="antwortenAnzahl">Eine Antwort </p>}
                {question.answers.map((answer) => <>
                    <div className="card  box-padding items-start flex qdp">
                        <div className="card-body shadow-lg">
                            {answer.author &&
                                <h4 className="card-subtitle mb-2 text-muted username"> {answer.author.displayedName}</h4>}
                            {!answer.author && <h5 className="card-subtitle mb-2 text‚ds-muted username">Anonym</h5>}
                            <div id="Frage" dangerouslySetInnerHTML={{__html: answer.htmlBody}}/>
                            {answer.comments.map((comment) => <>
                                <div className="card items-start flex">
                                    <div className="card-body shadow-lg">
                                        {comment.author &&
                                            <h4 className="card-subtitle mb-2 text-muted username"> {comment.author.displayedName}</h4>}
                                        {!comment.author &&
                                            <h5 className="card-subtitle mb-2 text‚ds-muted username">Anonym</h5>}
                                        <div id="Frage" dangerouslySetInnerHTML={{__html: comment.htmlBody}}/>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>
                </>)}

                <br/>
            </div>}
            {!question && questions.map((x) => <>
                <div className="card  box-padding items-start flex" onClick={() => setQuestion(x)}
                     style={{width: "36rem"}}>
                    <div className="card-body shadow-lg">
                        <div className="Time">{x.createdAt.substring(0, 10)} </div>
                        <h3 className="card-title">{x.title}</h3>
                        {x.questionTags.map((x1, index) =>
                            <>{x1.tag && x1.tag.name}
                                {index != x.questionTags.length - 1 && <>, </>}
                                {index == x.questionTags.length - 1 && <>.</>}
                            </>
                        )}
                        {x.author && <h4 className="card-subtitle mb-2 text-muted"> Frage gestellt
                            von {x.author.displayedName}</h4>}
                        {!x.author && <h5 className="card-subtitle mb-2 text‚ds-muted">Anonym</h5>}
                        <div id="Frage" dangerouslySetInnerHTML={{__html: x.htmlBody}}/>
                        <div style={{fontSize: "small", color: "gray"}}> Antworten: {x.answerCount}</div>
                    </div>
                </div>
                <br/> </>)}
        </Content>
    </div>;
}