import { makeStyles } from '@material-ui/core';
import { Budget } from '../../entities/budget';

interface Props {
  budgets: Budget[];
}

const useStyles = makeStyles({
  heading: {
    marginLeft: '20px',
    textAlign: 'center',
  },
  budgetLinks: {
    marginLeft: '20px'
  },
  budgetName: {
    display: 'inline-block',
    marginRight: '20px',
    fontWeight: 'bold'
  },
  budgetLink: {
      display: 'inline-block',
      marginRight: '20px',
      marginBottom: '10px',
      color: 'black'
  }
});

export default function BudgetListComponent(props: Props) {
  const classes = useStyles({});

  let listContent: JSX.Element[] = [];

  for(const budget of props.budgets) {
      const budgetId = budget.id;
      const linkView = "/budgets/" + budgetId + "/view";
      const linkEdit = "/budgets/" + budgetId + "/edit";
      listContent.push(
          <div className={classes.budgetLinks}>
            <p className={classes.budgetName}>{budget.name}</p> 
            <a href={linkView} className={classes.budgetLink}>View</a> 
            <a href={linkEdit} className={classes.budgetLink}>Edit</a>
          </div>
      )
  }

  return (
  <div>
    <h1 className={classes.heading}>Budget list</h1>
    {listContent}
  </div>
  );
}
