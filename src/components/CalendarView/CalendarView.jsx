import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CalendarView() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const currentTime= new Date();
  const [nextDays, setNextDays] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(()=>{
    createWeek();
  },[])

  const createWeek = () => {
    const dayArray = [];
    const dateArray = [];
    for (let i=0; i<8; i++){
      const dateOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()+i);
      // console.log(dateOfDay.getDate());
      // console.log(dateOfDay.getDay());
      dayArray.push(dateOfDay.getDay());
      dateArray.push(dateOfDay.getDate());
    }
    setNextDays(dayArray);
    setNextDates(dateArray);
    console.log(nextDays, nextDates);
  }

  const handleAddClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div>
      {nextDates && nextDates.map((date, i) => {     
        return(
          <Accordion key={i} expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Typography>{date} {weekDays[nextDays[i]]}</Typography>
              <Button
                aria-label="Add"
                onClick={handleAddClick}
                onFocus={(event) => event.stopPropagation()}
              > Add Recipe </Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">
                The click event of the nested action will propagate up and expand the accordion unless
                you explicitly stop it.
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  );
}

export default CalendarView;
