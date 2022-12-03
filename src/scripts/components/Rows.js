import { ListRow } from './ListRow';

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

	return filterRows.map((row, index) => <ListRow key={index} {...row} />);
};
