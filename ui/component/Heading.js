import { process_params } from 'express/lib/router';
import classes from './Heading.module.css';

const Heading = (props) => {
	return (
		<h1 className={classes.Heading}>{props.children}</h1>
	)
}

export default Heading;