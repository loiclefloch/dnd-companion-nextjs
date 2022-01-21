import Tag from "./Tag"

function ItemTagIsEquipped({ item, ...otherProps }) {
	return <>
		{item.isEquipped && (
			<Tag
				size="small"
				className="text-green-600 border border-green-600"
				{...otherProps}
			>
				Équipé
			</Tag>
		)}
		{!item.isEquipped && (
			<Tag
				size="small"
				className="text-blue-600 border border-blue-600"
				{...otherProps}
			>
				Non Équipé
			</Tag>
		)}
	</>
}

export default ItemTagIsEquipped