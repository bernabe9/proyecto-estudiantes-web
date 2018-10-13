import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 20,
    width: '900px'
  }),
  divider: {
    margin: '12px auto'
  },
  chip: {
    fontSize: '16px',
    margin: theme.spacing.unit,
  },
  title: {
    margin: '15px 0'
  },
  p: {
    fontSize: '16px',
    margin: '15px 0',
    textTransform: 'capitalize',
    lineHeight: '38px'
  },
  input: {
    verticalAlign: 'baseline'
  }
});

class NounExercise extends PureComponent {
  static propTypes = {
    exercise: object.isRequired,
    classes: object.isRequired,
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
      const { classes } = this.props;
      const { inputs, submitted } = this.state;
      const { value, solucion } = inputs[defIndex];

      if (chunks.length === 1) {
        return (
          <Fragment key={index}>
            <span>{chunk}</span>
            <span>
              <TextField
                value={value}
                variant="outlined"
                className={classes.input}
                error={submitted && value.toLowerCase() !== solucion.toLowerCase()}
                onChange={({ target }) => this.onChangeInput(defIndex, target.value)}
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
              <TextField
                value={value}
                variant="outlined"
                className={classes.input}
                error={submitted && value.toLowerCase() !== solucion.toLowerCase()}
                onChange={({ target }) => this.onChangeInput(defIndex, target.value)}
              />
            </span>
          }
        </Fragment>
      );
    })

  renderDefinition = ({ definicionOculta }, index) => {
    const { classes } = this.props;
    const definitionChunks = definicionOculta.toLowerCase().split('____');

    return (
      <Typography key={index} className={classes.p} component="div">
        {`${index}) `}
        {this.renderChunk(definitionChunks, index)}
      </Typography>
    );
  }

  render() {
    const { exercise, classes } = this.props;

    return (
      <div className="noun-exercise">
        <Paper className={classes.root} elevation={4}>
          <div style={{ display: 'flex' }}>
            <div className="words-list">
              <Typography variant="title" className={classes.title} component="h5">
                Palabras
              </Typography>
              {exercise.palabras.map((definicion, index) =>
                <Chip key={index} className={classes.chip} label={definicion} />)
              }
            </div>
            <div>
              <Typography variant="title" className={classes.title} component="h5">
                Definiciones
              </Typography>
              {exercise.soluciones.map((solucion, index) =>
                this.renderDefinition(solucion, index))
              }
            </div>
          </div>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{
            margin: '2rem auto',
            display: 'block'
          }}
          onClick={this.onSubmit}
        >
          Corregir
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(NounExercise);
