import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import Paper from 'components/Paper';
import Chip from 'components/Chip';
import Button from '@material-ui/core/Button';
import { capitalizeFirstLetter, getEditDistance } from 'utils/helpers';

import Input from '../Input';
import Title from './Title';
import Text from './Text';

class NounExercise extends PureComponent {
  static propTypes = {
    exercise: object.isRequired,
  }

  constructor(props) {
    super(props);

    const { soluciones } = props.exercise;
    const inputs = {};
    soluciones.forEach((solucion, index) => {
      inputs[index] = {
        solucion: solucion.palabra,
        value: '',
        index
      };
    });
    this.state = { inputs, submitted: false };
  }

  onChangeInput = (defIndex, value) => {
    const { inputs } = this.state;
    const newInputs = {
      ...inputs,
      [defIndex]: {
        ...inputs[defIndex],
        value,
      }
    };
    this.setState({ inputs: newInputs });
  }

  onSubmit = () => {
    this.setState({ submitted: true });
  }

  renderChunk = (chunks, defIndex) =>
    chunks.map((chunk, index) => {
      const { inputs, submitted } = this.state;
      const { value, solucion } = inputs[defIndex];
      const editDistance = getEditDistance(
        value.toLowerCase(),
        solucion.toLowerCase()
      );
      const hasWarning = editDistance > 0 && editDistance < 2;
      const hasError = !hasWarning && value.toLowerCase() !== solucion.toLowerCase();

      if (chunks.length === 1) {
        return (
          <Fragment key={index}>
            <span>{chunk}</span>
            <span>
              <Input
                value={value}
                error={submitted && hasError}
                warning={submitted && hasWarning}
                success={submitted && !hasError && !hasWarning}
                onChange={value => this.onChangeInput(defIndex, value)}
              />
            </span>
          </Fragment>
        );
      }

      return (
        <Fragment key={index}>
          <span>{chunk}</span>
          {index < chunks.length - 1 &&
            <span>
              <Input
                value={value}
                error={submitted && hasError}
                warning={submitted && hasWarning}
                success={submitted && !hasError && !hasWarning}
                onChange={value => this.onChangeInput(defIndex, value)}
              />
            </span>
          }
        </Fragment>
      );
    })

  renderDefinition = ({ definicionOculta }, index) => {
    let definitionChunks = definicionOculta.split('____');
    definitionChunks = definitionChunks.map((chunk, index) =>
      (index === 0 ? capitalizeFirstLetter(chunk) : chunk));

    return (
      <Text key={index}>
        {`${index + 1}) `}
        {this.renderChunk(definitionChunks, index)}
      </Text>
    );
  }

  render() {
    const { exercise } = this.props;

    return (
      <Fragment>
        <Paper>
          <div>
            <Title>Palabras</Title>
            {exercise.palabras.map((definicion, index) =>
              <Chip key={index}>{definicion.toLowerCase()}</Chip>)
            }
          </div>
          <div>
            <Title>Definiciones</Title>
            {exercise.soluciones.map((solucion, index) =>
              this.renderDefinition(solucion, index))
            }
          </div>
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
      </Fragment>
    );
  }
}

export default NounExercise;
