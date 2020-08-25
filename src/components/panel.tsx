import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Word, Definition } from '../models/word';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Panel: React.FC<{ word: Word }> = props => {
  const classes = useStyles();
  return (
    <div className="wordPanel">
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.word.word}</Typography>
        </ExpansionPanelSummary>
        {Object.entries(props.word.meaning).map(
          ([key, value]: [string, Definition[]]) =>
            value.map((val, index) => (
              <ExpansionPanelDetails>
                {index === 0 ? (
                  <div>
                    <span className="definitionType">{key}</span>
                    <Typography key={index}>・{val.definition}</Typography>
                  </div>
                ) : (
                    <Typography key={index}>・{val.definition}</Typography>
                  )}
              </ExpansionPanelDetails>
            ))
        )}
        {props.children}
      </ExpansionPanel>
    </div>
  );
};

export default Panel;
