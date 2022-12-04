import { ListTable } from '../components/ListTable';

const listTable = document.getElementById('plugin-manager') ?? {};
if (listTable)
	wp.element.render(<ListTable dataType={'products'} />, listTable);
