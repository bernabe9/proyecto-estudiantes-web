import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from 'components/Paper';
import FreezeHeight from 'components/FreezeHeight';

import Category from './Category';
import Palabra from './Palabra';
import Description from './Description';
import FlexContainer from './FlexContainer';
import BoxesContainer from './BoxesContainer';
import PalabraSlot from './PalabraSlot';

class HyponymExercise extends PureComponent {
  static propTypes = {
    exercise: object.isRequired,
  }

  constructor(props) {
    super(props);

    const solution = props.exercise.opciones
      .reduce((result, item) => {
        result[item] = null;
        return result;
      }, {});

    this.state = {
      solution,
      result: {},
      submitted: false,
    };
  }

  onSubmit = () => {
    const { solution } = this.state;
    const { opciones } = this.props.exercise;
    let result = {};
    opciones.forEach(({ categoria, palabra }) => {
      result = {
        ...result,
        [palabra]: solution[palabra] === categoria
      };
    });
    this.setState({ result, submitted: true });
  }

  getCategoryWords = (category) => {
    const { solution } = this.state;
    const filtered = Object.keys(solution)
      .filter(key => solution[key] === category);
    return filtered;
  }

  getUnusedWords = () => {
    const { exercise } = this.props;
    const { solution } = this.state;
    const words = exercise.opciones.map(({ palabra }) => palabra);
    return words.filter(word => !Object.keys(solution).includes(word));
  }

  handleDrop = (category, { palabra }) => {
    const { solution } = this.state;
    const newSolution = {
      ...solution,
      [palabra]: category
    };
    this.setState({ solution: newSolution });
  }

  render() {
    const { exercise } = this.props;
    const { result, submitted } = this.state;
    const palabras = exercise.opciones.map(({ palabra }) => palabra);
    const success = Object.keys(result).reduce(
      (ac, key) => ac && result[key],
      true
    );

    return (
      <div>
        <Paper>
          <Description>Arrastre las palabras hacia las categorías</Description>
          <FreezeHeight>
            <FlexContainer>
              {this.getUnusedWords().map(palabra =>
                <PalabraSlot key={palabra}>
                  <Palabra
                    palabra={palabra}
                    hasError={!result[palabra]}
                    hasSuccess={result[palabra]}
                    submitted={submitted}
                  />
                </PalabraSlot>)}
            </FlexContainer>
          </FreezeHeight>
          <BoxesContainer>
            {exercise.categorias.map(category =>
              <Category
                key={category}
                category={category}
                palabras={palabras}
                result={result}
                submitted={submitted}
                palabrasCategoria={this.getCategoryWords(category)}
                onDrop={item => this.handleDrop(category, item)}
              />)}
          </BoxesContainer>
          {submitted && success &&
            <Description>Perfecto!</Description>
          }
          {submitted && !success &&
            <Description>Se encontraron errores, revisa las palabras.</Description>
          }
        </Paper>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ margin: '2rem auto', display: 'block' }}
          onClick={this.onSubmit}
        >
          Corregir
        </Button>
      </div>
    );
  }
}

export default HyponymExercise;
