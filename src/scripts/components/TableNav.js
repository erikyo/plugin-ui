import {
	Button,
	DateTimePicker,
	Dropdown,
	SelectControl,
	TextControl,
	TreeSelect,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const TableNav = ({
	listRows,
	tableData,
	handleFilter,
	currentFilters,
}) => {
	function listAction(action) {
		console.log(action);
	}

	return (
		<>
			<ul className="subsubsub">
				<li className="all">
					<a href="edit.php?post_type=page">
						{__('All')}
						<span className="count">({listRows.length})</span>
					</a>
					|
				</li>
				<li className="publish">
					<a href="edit.php?post_status=publish&amp;post_type=page">
						{__('Published')}
						<span className="count">
							(
							{
								listRows.filter(
									(row) => row.post_status === 'publish'
								).length
							}
							)
						</span>
					</a>
				</li>
			</ul>

			<div className="search-box">
				<label
					className="screen-reader-text"
					htmlFor="post-search-input"
				>
					{__('Search Posts:')}
				</label>
				<TextControl
					type={'search'}
					id={'post-search-input'}
					name={'s'}
					value={currentFilters.search || ''}
					onChange={(newSearchTerm) => {
						handleFilter(() => {
							return newSearchTerm !== ''
								? {
										...currentFilters,
										search: newSearchTerm,
								  }
								: delete currentFilters.search;
						});
					}}
				/>
				<Button
					id="search-submit"
					text={__('Search Posts')}
					variant={'secondary'}
				/>
			</div>

			<div className="tablenav top">
				<div className="alignleft actions bulkactions flex">
					<label
						htmlFor={'bulk-action-selector-top'}
						className={'screen-reader-text'}
					>
						{__('Bulk actions')}
					</label>
					<SelectControl
						id={'bulk-action-selector-top'}
						value={''}
						options={[
							{ label: __('Bulk actions'), value: '' },
							{
								label: __('Edit'),
								value: 'edit',
							},
							{ label: __('Move to Trash'), value: 'trash' },
						]}
						onChange={(action) => listAction(action)}
					/>
					<Button variant={'secondary'} text={__('Apply')} />
				</div>

				<div className="alignleft actions">
					<label
						htmlFor="filter-by-date"
						className="screen-reader-text"
					>
						{__('Filter by date')}
					</label>
					<Dropdown
						className="filter-by-date-container"
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								variant="link"
								onClick={onToggle}
								aria-expanded={isOpen}
								text={currentFilters.datetime || 'no date set'}
							/>
						)}
						renderContent={() => (
							<DateTimePicker
								name={'m'}
								id={'filter-by-date'}
								currentDate={
									currentFilters.datetime ||
									new Date().toString()
								}
								onChange={(newDateTime) => {
									handleFilter(() => {
										return newDateTime
											? {
													...currentFilters,
													datetime: newDateTime,
											  }
											: delete currentFilters.datetime;
									});
								}}
							/>
						)}
					/>

					<label className="screen-reader-text" htmlFor="cat">
						{__('Filter by category')}
					</label>
					<TreeSelect
						name="cat"
						id="cat"
						onChange={(newCat) => {
							handleFilter(() => {
								return newCat
									? {
											...currentFilters,
											category: newCat,
									  }
									: delete currentFilters.category;
							});
						}}
						className="postform"
						noOptionLabel="filter by category"
						value={currentFilters.category || ''}
						tree={tableData.categories}
					/>
				</div>
			</div>
		</>
	);
};
