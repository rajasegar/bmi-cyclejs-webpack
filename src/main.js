import xs from 'xstream';
import { makeDOMDriver } from '@cycle/dom'; 
import { run } from '@cycle/run';
import Snabbdom from 'snabbdom-pragma';

function renderWeightSlider(weight) {
  return (
    <div>
      Weight {weight}kg
      <input className="weight" type="range" min="40" max="140" value={weight}/>
        </div>
  );
}

function renderHeightSlider(height) {
  return (
    <div>
      Height {height}cm
      <input className="height" type="range" min="140" max="210" value={height}/>
        </div>
  );
}

function bmi(weight, height) {
  const heightMeters = height * 0.01;
  const bmi =  Math.round(weight / (heightMeters * heightMeters));
}

function view(state$) {
  return state$.map(({weight, height, bmi})  => {
    return (
      <div>
        {renderWeightSlider(weight)}
        {renderHeightSlider(height)}
        <h2>BMI is {bmi}</h2>
          </div>
    );
  });

}

function model(actions) {

  const weight$ = actions.changeWeight$.startWith(70);
  const height$ = actions.changeHeight$.startWith(170);

  return xs.combine(weight$, height$)
    .map(([weight, height]) => {
      return { weight, height, bmi: bmi(weight, height) };
    });
}

function intent(domSource) {

  const changeWeight$ = domSource.select('.weight')
    .events('input')
    .map(ev => ev.target.value);

  const changeHeight$ = domSource.select('.height')
    .events('input')
    .map(ev => ev.target.value);

  return { changeWeight$, changeHeight$ }
}

function main(sources) {
  return {
    DOM: view(model(intent(sources.DOM)))
  };
}

run(main, {
  DOM: makeDOMDriver('#app')
});
