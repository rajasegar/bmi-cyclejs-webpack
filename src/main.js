import xs from 'xstream';
import { makeDOMDriver } from '@cycle/dom'; 
import { run } from '@cycle/run';
import Snabbdom from 'snabbdom-pragma';

function main(sources) {
  const changeWeight$ = sources.DOM.select('.weight')
    .events('input')
    .map(ev => ev.target.value);

  const changeHeight$ = sources.DOM.select('.height')
    .events('input')
    .map(ev => ev.target.value);

  const weight$ = changeWeight$.startWith(70);
  const height$ = changeHeight$.startWith(170);

  const state$ = xs.combine(weight$, height$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi =  Math.round(weight / (heightMeters * heightMeters));
      return { weight, height, bmi };
    });

  const vdom$ = state$.map(({weight, height, bmi})  => {
    return (
    <div>
      <div>
        Weight {weight}kg
        <input className="weight" type="range" min="40" max="140"/>
      </div>
      <div>
        Height {height}cm
        <input className="height" type="range" min="140" max="210"/>
      </div>
      <h2>BMI is {bmi}</h2>
    </div>
    );
  });

  const sinks = {
    DOM: vdom$
  };
  return sinks;
}

run(main, {
  DOM: makeDOMDriver('#app')
});
