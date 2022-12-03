import { ListTable } from '../components/ListTable';

const listTable = document.getElementById('plugin-manager') ?? {};
wp.element.render(<ListTable dataType={'products'} />, listTable);
