/* global piSettings */
import apiFetch from '@wordpress/api-fetch';

import { fetchPost, fetchTableData } from '../utils/fetch';
import { useState, useEffect, useRef } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

import { Loader } from './Loader';
import { Rows } from './ListRows';
import { TableNav } from './TableNav';

/**
 * It takes a customArgs object as an argument, sets the wait state to true, increments the page number, and then queries the server for the next page of products
 *
 * @param {Object} props          - the component properties
 * @param {string} props.dataType - the type of showed data (post, products, etc.)
 *
 * @return {JSX} A table with a list of posts.
 */
export const ListTable = ({ dataType }) => {
	const [wait, setWait] = useState(false);
	const [rows, setRows] = useState([]);
	const [checkAll, setCheckAll] = useState(false);
	const [filters, setFilters] = useState({});

	let [page, setPage] = useState(0);
	let [tableData, setTableData] = useState({});

	const loaderRef = useRef();

	apiFetch.use(apiFetch.createNonceMiddleware(piSettings.nonce));

	/**
	 * When the user scrolls to the bottom of the page, fetch more products and add them to the list
	 *
	 * @param {HTMLCollection} entries - An array of IntersectionObserverEntry objects.
	 *
	 * @return {Array} the value of the setRows function.
	 */
	const observerCallback = async (entries) => {
		if (entries[0].isIntersecting) {
			setWait(true);
			setPage(++page);
			await fetchPost(dataType, page).then((newProducts) => {
				if (newProducts) {
					setRows((tableRows) => [...tableRows, ...newProducts]);
					setWait(false);
				}
			});
		}
	};

	const selectAllCheckboxes = (checked) => {
		setCheckAll(!checked);
		rows.map((row) => !row.checked);
	};

	const observer = new window.IntersectionObserver((entries) =>
		observerCallback(entries)
	);

	useEffect(() => {
		/* Fetching the categories from the server and then sorting them into an object with the term_id as the key and the name as the value. */
		fetchTableData('categories').then((res) => {
			const sortedCat = [];
			Object.values(res).forEach((cat) =>
				sortedCat.push({
					name: cat.name,
					id: cat.term_id,
				})
			);
			console.table(sortedCat);
			tableData = { ...tableData, categories: sortedCat };
			setTableData(tableData);
		});

		/* Fetching the authors from the server and then sorting them into an object with the id as the key and the display_name as the value. */
		fetchTableData('authors').then((res) => {
			const sortedUsers = {};
			Object.values(res).forEach(
				(user) => (sortedUsers[user.id] = user.display_name)
			);
			console.table(sortedUsers);
			tableData = { ...tableData, authors: res };
			setTableData(tableData);
		});

		observer.observe(loaderRef.current);
	}, []);

	useEffect(() => {
		if (!wait && Object.keys(filters).length === 0) {
			observer.observe(loaderRef.current);

			return () => {
				observer.unobserve(loaderRef.current);
			};
		}
	}, [wait, filters]);

	return (
		<form id="posts-filter" method="get">
			<TableNav
				listRows={rows}
				tableData={tableData}
				handleFilter={setFilters}
				currentFilters={filters}
			/>

			<table className="wp-list-table widefat fixed striped table-view-list posts">
				<thead>
					<tr>
						<td id="cb" className="manage-column">
							<label
								className="screen-reader-text"
								htmlFor="cb-select-all"
							>
								Select All
							</label>
							<CheckboxControl
								id="cb-select-all"
								value={checkAll}
								onChange={(checked) =>
									selectAllCheckboxes(checked)
								}
							/>
						</td>
						<th
							scope="col"
							id="title"
							className="manage-column column-title column-primary sortable desc"
						>
							<a href="edit.php?orderby=title&amp;order=asc">
								<span>Title</span>
								<span className="sorting-indicator"></span>
							</a>
						</th>
						<th
							scope="col"
							id="author"
							className="manage-column column-author"
						>
							Author
						</th>
						<th
							scope="col"
							id="categories"
							className="manage-column column-categories"
						>
							Categories
						</th>
						<th
							scope="col"
							id="tags"
							className="manage-column column-tags"
						>
							Tags
						</th>
						<th
							scope="col"
							id="comments"
							className="manage-column column-comments num sortable desc"
						>
							<a href="edit.php?orderby=comment_count&amp;order=asc">
								<span>
									<span
										className="vers comment-grey-bubble"
										title="Comments"
										aria-hidden="true"
									></span>
									<span className="screen-reader-text">
										Comments
									</span>
								</span>
								<span className="sorting-indicator"></span>
							</a>
						</th>
						<th
							scope="col"
							id="date"
							className="manage-column column-date sortable asc"
						>
							<a href="edit.php?orderby=date&amp;order=desc">
								<span>Date</span>
								<span className="sorting-indicator"></span>
							</a>
						</th>
					</tr>
				</thead>

				<tbody id="the-list">
					<Rows rowList={rows} filterList={filters} />
				</tbody>
			</table>
			<div className={'loader-wrapper aligncenter'} ref={loaderRef}>
				<Loader isLoading={wait} />
			</div>
		</form>
	);
};
