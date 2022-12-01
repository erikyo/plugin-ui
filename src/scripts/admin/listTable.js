/* global piSettings */
import {
	Button,
	CheckboxControl,
	DateTimePicker,
	Dropdown,
	SelectControl,
	TextControl,
	TreeSelect,
} from '@wordpress/components';
import { queryData, queryPost } from '../utils/fetch';
import { useState, useEffect, useRef } from '@wordpress/element';

import { Loader } from '../components/Loader';

export const ListRow = (props) => {
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

export const ListTable = ({ dataType }) => {
	const [wait, setWait] = useState(false);
	const [listRows, setListRows] = useState([]);
	let [filterRows, setFilterRows] = useState([]);
	let [tableData, setTableData] = useState({});

	let [page, setPage] = useState(0);
	const [catFilter, setCatFilter] = useState('');

	const postsPerPage = 10;
	const loadRef = useRef();

	const [filter, setFilter] = useState('');
	const [listAction, setListAction] = useState('');
	const [listDateTime, setListDateTime] = useState(new Date().toString());

	const queryArgs = (currentPage = 0) => ({
		postType: dataType,
		post_status: 'publish',
		posts_per_page: postsPerPage,
		paged: currentPage,
		order: 'DESC',
		orderby: 'post-date',
		tax_query: {
			taxonomy: dataType + '_cat',
		},
	});

	const DateTimeFilter = () => (
		<Dropdown
			className="filter-by-date-container"
			position="bottom right"
			renderToggle={({ isOpen, onToggle }) => (
				<Button
					variant="link"
					onClick={onToggle}
					aria-expanded={isOpen}
				>
					{listDateTime}
				</Button>
			)}
			renderContent={() => (
				<DateTimePicker
					name={'m'}
					id={'filter-by-date'}
					currentDate={listDateTime}
					onChange={(newDateTime) => setListDateTime(newDateTime)}
					is12Hour={true}
				/>
			)}
		/>
	);

	/**
	 * It takes a customArgs object as an argument, sets the wait state to true, increments the page number, and then queries the server for the next page of products
	 *
	 * @param {*|{posts_per_page: number, offset: number, postType: string, post_status: string, tax_query: {taxonomy: string}}} customArgs - This is an object that you can pass to the function to override the default args.
	 */
	const fetchProducts = async (customArgs = false) => {
		setWait(true);
		setPage(++page);
		return queryPost(customArgs || queryArgs(page), piSettings.nonce)
			.then((products) => {
				if (products.error) {
					throw new Error(products.error);
				}
				setWait(false);
				return products;
			})
			.catch((err) => console.log(err));
	};

	const fetchTableData = async (datatype) => {
		setWait(true);
		return queryData(datatype, piSettings.nonce)
			.then((res) => {
				if (res.error) {
					throw new Error(res.error);
				}
				setWait(false);
				return res;
			})
			.catch((err) => console.log(err));
	};

	/**
	 * When the user scrolls to the bottom of the page, fetch more products and add them to the list
	 *
	 * @param {HTMLCollection} entries - An array of IntersectionObserverEntry objects.
	 *
	 * @return {Array} the value of the setRows function.
	 */
	const observerCallback = async (entries) => {
		if (entries[0].isIntersecting) {
			await fetchProducts().then((newProducts) => {
				if (newProducts) {
					setListRows((rows) => [...rows, ...newProducts]);
				}
			});
		}
	};

	const observer = new window.IntersectionObserver((entries) =>
		observerCallback(entries)
	);

	function filtered() {
		filterRows = filter
			? listRows.filter((listRow) => listRow.post_title.includes(filter))
			: listRows;

		return filterRows.map((row, index) => <ListRow key={index} {...row} />);
	}

	useEffect(() => {
		fetchTableData('categories').then((res) => {
			const sortedCat = {};
			Object.values(res).forEach(
				(cat) =>
					(sortedCat[cat.term_id] = {
						id: cat.term_id,
						name: cat.name,
					})
			);
			console.log(sortedCat);
			tableData = { ...tableData, categories: sortedCat };
			setTableData(tableData);
		});

		fetchTableData('authors').then((res) => {
			const sortedUsers = {};
			Object.values(res).forEach(
				(user) => (sortedUsers[user.id] = user.display_name)
			);
			console.log(sortedUsers);
			tableData = { ...tableData, authors: res };
			setTableData(tableData);
		});

		console.log(tableData);

		observer.observe(loadRef.current);
	}, []);

	useEffect(() => {
		if (!wait && !filter) {
			observer.observe(loadRef.current);

			return () => {
				observer.unobserve(loadRef.current);
			};
		}
	}, [wait, filter]);

	return (
		<form id="posts-filter" method="get">
			<ul className="subsubsub">
				<li className="all">
					<a href="edit.php?post_type=page">
						All <span className="count">({listRows.length})</span>
					</a>{' '}
					|
				</li>
				<li className="publish">
					<a href="edit.php?post_status=publish&amp;post_type=page">
						Published
						<span className="count">
							{
								listRows.filter(
									(row) => row.post_status === 'publish'
								).length
							}
						</span>
					</a>
				</li>
			</ul>

			<div className="search-box">
				<label
					className="screen-reader-text"
					htmlFor="post-search-input"
				>
					Search Posts:
				</label>
				<TextControl
					type={'search'}
					id={'post-search-input'}
					name={'s'}
					value={filter}
					onChange={(s) => setFilter(s)}
				/>
				<TextControl
					type={'submit'}
					id="search-submit"
					value="Search Posts"
				/>
			</div>

			<div className="tablenav top">
				<div className="alignleft actions bulkactions flex">
					<label
						htmlFor={'bulk-action-selector-top'}
						className={'screen-reader-text'}
					>
						Bulk actions
					</label>
					<SelectControl
						id={'bulk-action-selector-top'}
						value={listAction}
						options={[
							{ label: 'Bulk actions', value: '-1' },
							{
								label: 'Edit',
								value: 'edit',
							},
							{ label: 'Move to Trash', value: 'trash' },
						]}
						onChange={(newAction) => setListAction(newAction)}
					/>
					<TextControl
						type={'submit'}
						id={'doaction'}
						className={'button action'}
						value={'Apply'}
					/>
				</div>

				<div className="alignleft actions">
					<label
						htmlFor="filter-by-date"
						className="screen-reader-text"
					>
						Filter by date
					</label>
					<DateTimeFilter />

					<label className="screen-reader-text" htmlFor="cat">
						Filter by category
					</label>
					<TreeSelect
						name="cat"
						id="cat"
						noOptionLabel="filter by category"
						onChange={(newCat) => setCatFilter(newCat)}
						className="postform"
						options={tableData.categories}
					/>
				</div>
			</div>

			<table className="wp-list-table widefat fixed striped table-view-list posts">
				<thead>
					<tr>
						<td
							id="cb"
							className="manage-column column-cb check-column"
						>
							<label
								className="screen-reader-text"
								htmlFor="cb-select-all-1"
							>
								Select All
							</label>
							<input id="cb-select-all-1" type="checkbox" />
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
					{filtered()}
					<tr>
						<td colSpan={7} ref={loadRef}>
							<Loader id={'loader'} isloading={wait} />
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	);
};

const listTable = document.getElementById('plugin-manager') ?? {};
wp.element.render(<ListTable dataType={'products'} />, listTable);
