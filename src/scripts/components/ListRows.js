import { Button, CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export const ListRows = (props) => {
	const [isChecked, setChecked] = useState(false);

	function postAction(action, id) {
		console.log(action, id);
		return true;
	}

	return (
		<tr>
			<th scope="row" className="check-column">
				<label
					className="screen-reader-text"
					htmlFor={'checkbox_' + props.ID}
				>
					Select SearchWP Live Ajax Search
				</label>
				<CheckboxControl
					id={'checkbox_' + props.ID}
					checked={isChecked}
					onChange={setChecked}
				/>
			</th>
			<td>
				<strong>
					<Button
						variant={'link'}
						className="row-title"
						href={props.guid}
						aria-label={props.post_title + ' (Edit)'}
					>
						{props.post_title}
					</Button>
				</strong>
				<div className="row-actions">
					<span className="edit">
						<Button
							variant={'link'}
							onClick={() => postAction('edit', props.ID)}
							aria-label={'Edit ' + props.post_title}
						>
							Edit
						</Button>
						|
					</span>
					<span className="inline">
						<Button
							variant="link"
							className="button-link editinline"
							aria-label={`Quick edit (${props.post_title}) inline`}
							aria-expanded="false"
						>
							Quick&nbsp;Edit
						</Button>
						|
					</span>
					<span className="trash">
						<Button
							variant="link"
							onClick={() => postAction('delete', props.ID)}
							className="submitdelete"
							aria-label={`Move (${props.post_title}) to the Trash`}
						>
							Trash
						</Button>
						|
					</span>
					<span className="view">
						<Button
							variant="link"
							onClick={() => postAction('view', props.ID)}
							rel="bookmark"
							aria-label={`View (${props.post_title})`}
						>
							View
						</Button>
					</span>
				</div>
			</td>
			<td>{props.post_author}</td>
			<td>{props.post_status}</td>
			<td>{props.ping_status}</td>
			<td>{props.comment_count}</td>
			<td className={'date column-date'}>
				{props.post_status} <br />
				{props.post_date_gmt}
			</td>
		</tr>
	);
};

/**
 * It takes in a list of rows and a filter list, and returns a list of rows that match the filter list
 *
 * @param {Object} props            - the table props
 * @param {Object} props.rowList    - the table rows
 * @param {Object} props.filterList - filters available
 *
 * @return {JSX} The Rows component is being returned.
 */
export const Rows = ({ rowList, filterList }) => {
	const filterRows = filterList.search
		? rowList.filter((listRow) =>
				listRow.post_title.includes(filterList.search)
		  )
		: rowList;

	return filterRows.map((row, index) => <ListRows key={index} {...row} />);
};
