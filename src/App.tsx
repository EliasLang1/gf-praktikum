import React from 'react';
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
    return <div className="App">
        <Header/>
        <Content>
            {questions.map((x) => <>
                <div className="card  box-padding items-start flex" style={{width: "36rem"}}>
                    <div className="card-body shadow-lg">
                        <h3 className="card-title">{x.title}</h3>
                        {x.questionTags.map((x1) =>
                            <>{x1.tag && x1.tag.name}, </>
                        )}
                        {x.author && <h4 className="card-subtitle mb-2 text-muted"> Frage gestellt
                            von {x.author.displayedName}</h4>}
                        {!x.author && <h5 className="card-subtitle mb-2 text‚ds-muted">Anonym</h5>}
                        <div id="Frage" dangerouslySetInnerHTML={{__html: x.htmlBody}}/>
                        <div className="Antworten"> Antworten: {x.answerCount}</div>
                    </div>
                </div>
                <br/> </>)}‚
        </Content>
    </div>;
}
