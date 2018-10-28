import React, { Component } from 'react';
import { object } from 'prop-types';
import Paper from 'components/Paper';
import Button from '@material-ui/core/Button';
import Highlighter from 'react-highlight-words';

import SelectBox from 'components/SelectBox';
import Text from './Text';

class FillInBlanksExercise extends Component {
  static propTypes = {
    exercise: object.isRequired,
  }

  state = {
    chunks: [],
    options: {}
  };

  componentDidMount() {
    this.splitText();
    this.setOptions();
  }

  onChangeAnswer = (answer, reference) => {
    const { options } = this.state;
    const option = options[reference];
    const { submitted, solution } = option;
    const error = submitted && answer !== solution;
    this.setState({
      options: {
        ...options,
        [reference]: {
          ...option,
          answer,
          error
        }
      }
    });
  }

  onSubmit = () => {
    const { options } = this.state;
    const newOptions = { ...options };
    Object.keys(options).forEach((ref) => {
      const option = options[ref];
      const { answer, solution } = option;
      const error = answer !== solution;
      newOptions[ref] = { ...option, error, submitted: true };
    });
    this.setState({
      options: newOptions
    });
  }

  getOptionVariants = (chunk) => {
    const { options } = this.state;
    const reference = this.getReference(chunk);
    const { variants } = options[reference];
    return variants;
  }

  getReference = (chunk) => {
    const match = chunk.match(/\(\d+\)/);
    return match ? match[0] : undefined;
  }

  setOptions = () => {
    const { opciones } = this.props.exercise;
    const parsedOptions = {};
    opciones.forEach((option) => {
      const { referencia, solucion, variantes } = option;
      parsedOptions[referencia] = {
        solution: solucion,
        variants: variantes,
        answer: ''
      };
    });
    this.setState({ options: parsedOptions });
  }

  splitText = () => {
    const { texto } = this.props.exercise;
    const chunks = texto.split(/\s____/);
    this.setState({ chunks });
  }

  renderSelect = (chunk) => {
    const { options } = this.state;
    const ref = this.getReference(chunk);
    const { answer, error, submitted } = options[ref];
    return (
      <SelectBox
        value={answer}
        onChange={value => this.onChangeAnswer(value, ref)}
        options={this.getOptionVariants(chunk)}
        error={error}
        success={submitted && !error}
      />
    );
  }

  render() {
    const { chunks } = this.state;

    return (
      <div>
        <Paper>
          <Text>
            {chunks.map((chunk, index) =>
              <span key={index}>
                <Highlighter
                  highlightStyle={{ color: '#a9a6a6', backgroundColor: 'white' }}
                  searchWords={['(present)', '(past)']}
                  textToHighlight={chunk}
                  autoEscape
                />
                {index < chunks.length - 1 && this.renderSelect(chunk)}
              </span>)
            }
          </Text>
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

export default FillInBlanksExercise;
