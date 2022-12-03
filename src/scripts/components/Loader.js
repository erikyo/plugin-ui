/**
 * It returns a loading animation if the `isloading` prop is true, otherwise it returns a message saying there are no more entries
 *
 * @param {Object}  props           The loader color
 * @param {boolean} props.isLoading if is loading
 * @param {number}  props.size      The loader size
 * @param {string}  props.color     The loader color
 * @return {JSX} A function that returns a component
 */
export const Loader = ({
	isLoading,
	size = 50,
	color = 'var(--my-plugin_color-primary)',
}) => {
	return isLoading ? (
		<>
			<p>Loading</p>
			<svg
				style={{
					width: size + 'px',
					height: size + 'px',
					fill: color,
				}}
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				viewBox="0 0 100 100"
			>
				<path d="M73 50a23 23 0 0 0-46 0m3.9 0a19.1 19.1 0 1 1 38.2 0">
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						dur="1s"
						from="0 50 50"
						repeatCount="indefinite"
						to="360 50 50"
						type="rotate"
					/>
				</path>
			</svg>
		</>
	) : null;
};
