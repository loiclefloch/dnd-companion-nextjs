import Tag from './Tag'

function Card({ isLoading, name, meta, data, description, tags }) {
  return (
    <div className="max-w-lg p-4">
      <h4 className="text-lg">{name}</h4>
      <p className="text-sm italic">{meta}</p>
      {data && (
        <div className="">
          {data
            .filter(Boolean)
            .filter(
              (data) =>
                data.value !== null &&
                data.value !== undefined
            )
            .map((data) => (
              <div>
                <span className="font-semibold">{data.label}:</span>
                &nbsp;
                <span>{data.value}</span>
              </div>
            ))}
        </div>
      )}
      <p>{description}</p>
      {tags && (
        <div className="flex flex-row">
          {tags.filter(Boolean).map((tag, index) => (
            <Tag key={index} color={tag.color}>{tag.label}</Tag>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
