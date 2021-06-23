import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width:"100%",
    height:"100%",
    marginLeft:"10px",
    marginRight:"10px",
    backgroundColor:"red"
  },  
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Overview() {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="home">
    <Card className={classes.root}>
      <CardContent>
          Word of the Day
      </CardContent>
    </Card>
    </div>
  );
}
