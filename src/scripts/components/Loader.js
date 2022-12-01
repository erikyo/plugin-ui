/**
 * It returns a loading animation if the `isloading` prop is true, otherwise it returns a message saying there are no more entries
 *
 * @param {string} id the loader id
 * @param {boolean} isLoading if is loading
 *
 * @return A function that returns a component
 */
export const Loader = ({ id, isLoading }) => {
	return isLoading ? (
		<>
			<p>Loading</p>
			<svg
				id={id}
				style={{
					width: '50px',
					height: '50px',
					textAlign: 'center',
					fill: 'var(--my-plugin_color-primary)',
				}}
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				viewBox="0 0 100 100"
			>
				<path
					fill="#fff"
					d="M73 50a23 23 0 0 0-46 0m3.9 0a19.1 19.1 0 1 1 38.2 0"
				>
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
