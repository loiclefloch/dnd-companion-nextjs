import Tag from "./Tag"

function ItemTagIsEquipped({ item, hideNotEquipped = false, ...otherProps }) {
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
		{!item.isEquipped && !hideNotEquipped && (
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